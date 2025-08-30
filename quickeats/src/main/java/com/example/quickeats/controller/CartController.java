package com.example.quickeats.controller;

import com.example.quickeats.model.CartItem;
import com.example.quickeats.service.CartService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping
    public CartItem addItem(@RequestBody CartItem item) {
        return cartService.addItem(item);
    }

    @PutMapping("/{id}")
    public CartItem updateItem(@PathVariable Long id, @RequestParam int quantity) {
        return cartService.updateItem(id, quantity);
    }

    @DeleteMapping("/{id}")
    public String removeItem(@PathVariable Long id) {
        cartService.removeItem(id);
        return "Item removed from cart";
    }
}
