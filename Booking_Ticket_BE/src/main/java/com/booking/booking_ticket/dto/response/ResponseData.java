package com.booking.booking_ticket.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ResponseData <T>{
    private final int status;
    private final String message;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private T data;
    //patch, put,  delete
    public ResponseData(int status, String message) {
        this.status = status;
        this.message = message;
    }
    //get , post
    public ResponseData(int status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
