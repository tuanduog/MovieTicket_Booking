package dto.request;

import lombok.*;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;



@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RegisterRequestDTO implements Serializable {

    private String firstName;

    private String lastName;

    private String email;

    private Boolean gender;

    private String phone;

    private String username;

    private String password;

    private Instant createdAt;

    private String note;

}
