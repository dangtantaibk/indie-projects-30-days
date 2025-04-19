package com.e2e.common.exception;

/**
 * Exception thrown when a requested resource is not found
 */
public class ResourceNotFoundException extends BaseException {
    
    public ResourceNotFoundException(String resourceType, Object identifier) {
        super(resourceType + " with id " + identifier + " not found", 
              ErrorCode.RESOURCE_NOT_FOUND);
    }
}