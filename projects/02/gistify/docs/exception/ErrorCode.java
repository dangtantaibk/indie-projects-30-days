package com.e2e.common.exception;

/**
 * Standardized error codes for the application
 */
public enum ErrorCode {
    // General errors
    UNKNOWN_ERROR(1000),
    INVALID_INPUT(1001),
    RESOURCE_NOT_FOUND(1002),
    DUPLICATE_ENTRY(1003),
    
    // Product related errors
    INVALID_PRODUCT_DATA(2000),
    PRODUCT_NOT_FOUND(2001),
    DUPLICATE_PRODUCT(2002),
    
    // Database errors
    DATABASE_CONNECTION_ERROR(5000),
    DATABASE_QUERY_ERROR(5001),
    
    // Cache errors
    CACHE_ACCESS_ERROR(6000);
    
    private final int code;
    
    ErrorCode(int code) {
        this.code = code;
    }
    
    public int getCode() {
        return code;
    }
}