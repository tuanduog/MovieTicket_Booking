package utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum UserRole {
    @JsonProperty("administrator")
    ADMINISTRATOR,
    @JsonProperty("customer")
    CUSTOMER,
    @JsonProperty("manager")
    MANAGER
}
