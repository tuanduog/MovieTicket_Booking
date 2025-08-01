package com.booking.booking_ticket.exception;

import java.util.Date;

public class ErrorResponse {
    private Date timestamp;
    private int status;
    private String path;
    private String error;
    private String message;

    public ErrorResponse() {

    }

    public ErrorResponse(Date timestamp, int status, String path, String error, String message) {
        this.timestamp = timestamp;
        this.status = status;
        this.path = path;
        this.error = error;
        this.message = message;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
