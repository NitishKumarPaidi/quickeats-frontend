package com.example.quickeats.dto;

import lombok.Data;

@Data
public class AddToCartRequest {
    private Long userId;
    private Long menuId;
    private int quantity;
}
