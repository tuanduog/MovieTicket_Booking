package dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IntrospectiveResponse {

    private Boolean isValid;
}
