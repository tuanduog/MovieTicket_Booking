package com.booking.booking_ticket.controller.payment;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.payos.PayOS;
import vn.payos.type.Webhook;
import vn.payos.type.WebhookData;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/payment")
public class PaymentController {

    private final PayOS payOS;

    @PostMapping(path = "/payos_transfer_handler")
    public ObjectNode payosTransferHandler(@RequestBody ObjectNode body)
            throws JsonProcessingException, IllegalArgumentException {

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        Webhook webhookBody = objectMapper.treeToValue(body, Webhook.class);

        try {
            // Init Response
            response.put("error", 0);
            response.put("message", "Webhook delivered");
            response.set("data", null);

            WebhookData data = payOS.verifyPaymentWebhookData(webhookBody);
            System.out.println(data);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", -1);
            response.put("message", e.getMessage());
            response.set("data", null);
            return response;
        }
    }


}
