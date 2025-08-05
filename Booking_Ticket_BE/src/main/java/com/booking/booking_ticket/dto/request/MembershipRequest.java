package com.booking.booking_ticket.dto.request;

public class MembershipRequest {
    private String vip;
    private Integer expire;

    public String getVip() {
        return vip;
    }
    public void setVip(String vip) {
        this.vip = vip;
    }
    public Integer getExpire() {
        return expire;
    }
    public void setExpire(Integer expire) {
        this.expire = expire;
    }
}
