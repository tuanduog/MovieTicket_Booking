package utils;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum TicketStatus {
    @JsonProperty("pending")
    PENDING,
    @JsonProperty("cancelled")
    CANCELLED,
    @JsonProperty("waiting")
    WAITING,
    @JsonProperty("done")
    DONE,
    @JsonProperty("refunded")
    REFUNDED;

}
