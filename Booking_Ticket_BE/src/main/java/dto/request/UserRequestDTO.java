package dto.request;

import entity.*;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import lombok.*;
import utils.UserRole;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDTO implements Serializable {

    private Integer userId;

    private String username;

    private String password;

    private String email;

    private String phone;

    private String membership;

    private UserRole userRole;

}
