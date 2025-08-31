package com.example.quickeats.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // // Link to User (who owns the cart item)
    // @ManyToOne
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;

    // // Link to Menu (the product)
    // @ManyToOne
    // @JoinColumn(name = "menu_id", nullable = false)
    // private Menu menu;

    private Long userId; // who owns the cart item

    private Long menuItemId; // which menu item

    private String name;

    private int quantity;
    private double price;
}
