``` java
public T create(T entity) throws InvalidDataException {
    try {
        validateForCreate(entity);
        T created = getMysqlHandler().create(entity);
        
        if (created != null) {
            ID id = extractId(created);
            getCacheHandler().put(id, created);
            logger.info("{} created with id: {}", getModelName(), id);
        }
        
        return created;
    } catch (SQLException e) {
        logger.error("Database error creating {}: {}", getModelName(), e.getMessage(), e);
        throw new DatabaseException("Error creating " + getModelName(), e, 
                                   ErrorCode.DATABASE_QUERY_ERROR);
    }
}
```


``` java
/**
 * Executes an action that returns an Integer result, with proper exception handling
 * and profiling.
 * 
 * @param action A descriptive name of the action for logging purposes
 * @param supplier The function to execute that returns an Integer
 * @return The result of the supplier function
 * @throws BaseException if an error occurs during execution
 */
private int executeIntAction(String action, Supplier<Integer> supplier) throws BaseException {
    try {
        return executeWithProfiler(action, () -> {
            try {
                Integer result = supplier.get();
                if (result == null) {
                    throw new DatabaseException("Null result returned from " + action, 
                        ErrorCode.DATABASE_QUERY_ERROR);
                }
                return result;
            } catch (BaseException e) {
                // Rethrow our custom exceptions
                throw e;
            } catch (Exception e) {
                // Wrap other exceptions in appropriate custom exception
                logger.error("Error executing {}: {}", action, e.getMessage(), e);
                throw new DatabaseException("Error executing " + action, 
                    ErrorCode.DATABASE_QUERY_ERROR, e);
            }
        });
    } catch (BaseException e) {
        // Log and rethrow
        logger.error("Failed to execute {}: {} (code: {})", 
            action, e.getMessage(), e.getErrorCode().getCode(), e);
        throw e;
    }
}
```



``` java
/**
 * Example method that calls the executeIntAction method and translates exceptions to error codes
 */
public int createSomething(SomeData data) {
    try {
        return executeIntAction("createSomething", () -> doCreateSomething(data));
    } catch (ResourceNotFoundException e) {
        logger.warn("Resource not found: {}", e.getMessage());
        return -ECode.NOT_FOUND.getValue();
    } catch (InvalidDataException e) {
        logger.warn("Invalid data: {}", e.getMessage());
        return -ECode.INVALID_DATA.getValue();
    } catch (BaseException e) {
        logger.error("Error creating something: {} (code: {})", 
            e.getMessage(), e.getErrorCode().getCode(), e);
        return -ECode.EXCEPTION.getValue();
    }
}
```