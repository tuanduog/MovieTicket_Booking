package entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "invalid_token")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvalidToken {

    @Id
    @Column(name = "token_id")
    private String token_id;

    @Column(name = "expired_at")
    private Instant expired_at;

}
