package dto.response;

import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Builder
@Getter
public class PageResponse<T> implements Serializable {

    private int pageNo;
    private int pageSize;
    private int totalPages;
    private T items;
}
