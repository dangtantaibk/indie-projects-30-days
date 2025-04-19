
package com.e2e.common.exception;

/**
 * Base exception class for all application exceptions
 */
public abstract class BaseException extends Exception {
    
    private final ErrorCode errorCode;
    
    public BaseException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public BaseException(String message, ErrorCode errorCode, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }
    
    public ErrorCode getErrorCode() {
        return errorCode;
    }
}