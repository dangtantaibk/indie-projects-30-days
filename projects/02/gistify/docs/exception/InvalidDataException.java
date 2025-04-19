package com.e2e.common.exception;

/**
 * Exception thrown when invalid data is provided
 */
public class InvalidDataException extends BaseException {
    
    public InvalidDataException(String message) {
        super(message, ErrorCode.INVALID_INPUT);
    }
    
    public InvalidDataException(String field, String reason) {
        super("Invalid value for " + field + ": " + reason, ErrorCode.INVALID_INPUT);
    }
}