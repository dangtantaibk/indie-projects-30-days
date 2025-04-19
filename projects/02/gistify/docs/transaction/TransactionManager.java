package com.e2e.common.db;

import com.e2e.common.exception.DatabaseException;
import com.e2e.common.exception.ErrorCode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.function.Function;

/**
 * Manages database transactions
 */
public class TransactionManager {
    private static final Logger logger = LoggerFactory.getLogger(TransactionManager.class);
    
    /**
     * Executes operations within a transaction
     * @param <T> Return type of the transaction
     * @param operation Function that performs database operations
     * @return Result of the transaction
     * @throws DatabaseException if a database error occurs
     */
    public static <T> T executeInTransaction(Function<Connection, T> operation) throws DatabaseException {
        Connection conn = null;
        boolean originalAutoCommit = true;
        
        try {
            // Get connection from your connection pool
            conn = DatabaseManager.getConnection();
            originalAutoCommit = conn.getAutoCommit();
            
            // Start transaction
            conn.setAutoCommit(false);
            
            // Execute operation in transaction
            T result = operation.apply(conn);
            
            // Commit transaction
            conn.commit();
            return result;
            
        } catch (SQLException e) {
            // Rollback on error
            if (conn != null) {
                try {
                    conn.rollback();
                    logger.info("Transaction rolled back due to error");
                } catch (SQLException rollbackEx) {
                    logger.error("Failed to rollback transaction", rollbackEx);
                }
            }
            
            logger.error("Database transaction failed", e);
            throw new DatabaseException("Transaction failed: " + e.getMessage(), 
                    ErrorCode.DATABASE_QUERY_ERROR, e);
            
        } finally {
            // Restore connection state and return to pool
            if (conn != null) {
                try {
                    conn.setAutoCommit(originalAutoCommit);
                    conn.close();
                } catch (SQLException e) {
                    logger.error("Error closing connection", e);
                }
            }
        }
    }
}