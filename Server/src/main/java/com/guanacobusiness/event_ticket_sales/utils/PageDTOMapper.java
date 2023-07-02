package com.guanacobusiness.event_ticket_sales.utils;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import com.guanacobusiness.event_ticket_sales.models.dtos.PageDTO;

@Component
public class PageDTOMapper {
    
    public <T,U> PageDTO<T> map(List<T> customList, Page<U> page) {
        PageDTO<T> pageDTO = new PageDTO<T>(
            customList,
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages()
        );
        return pageDTO;
    }

    public <T> PageDTO<T> map(Page<T> page) {
        PageDTO<T> pageDTO = new PageDTO<T>(
            page.getContent(),
            page.getNumber(),
            page.getSize(),
            page.getTotalElements(),
            page.getTotalPages()
        );
        return pageDTO;
    }

    public <T> PageDTO<T> map(List<T> customList, int page, int size, long totalElements, int totalPages) {
        PageDTO<T> pageDTO = new PageDTO<T>(
            customList,
            page,
            size,
            totalElements,
            totalPages
        );
        return pageDTO;
    }
}
