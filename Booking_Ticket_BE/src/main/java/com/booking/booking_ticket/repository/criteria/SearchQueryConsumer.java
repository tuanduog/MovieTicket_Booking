package com.booking.booking_ticket.repository.criteria;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.function.Consumer;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchQueryConsumer implements Consumer<SearchCriteria> {
    private CriteriaBuilder builder;
    private Predicate predicate;
    private Root root;

    @Override
    public void accept(SearchCriteria searchCriteria) {

        if(searchCriteria.getOperation().equals(">")) {
            predicate = builder.and(predicate,builder.greaterThanOrEqualTo(root.get(searchCriteria.getKey()),searchCriteria.getValue().toString()));
        }else if(searchCriteria.getOperation().equals("<")) {
            predicate = builder.and(predicate,builder.lessThanOrEqualTo(root.get(searchCriteria.getKey()),searchCriteria.getValue().toString()));
        } else  {
            if(root.get(searchCriteria.getKey()).getJavaType() == String.class ) {
                predicate = builder.and(predicate,builder.like(root.get(searchCriteria.getKey()),"%"+searchCriteria.getValue().toString()+"%"));
            }
            else{
                predicate = builder.and(predicate,builder.equal(root.get(searchCriteria.getKey()),searchCriteria.getValue().toString()));

            }

        }
    }
}
