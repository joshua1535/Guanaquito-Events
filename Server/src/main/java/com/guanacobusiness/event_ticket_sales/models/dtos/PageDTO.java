package com.guanacobusiness.event_ticket_sales.models.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDTO<T> {

    private List<T> content;
    private int page;
    private int size;
    private long total_elements;
    private int total_pages;

}
