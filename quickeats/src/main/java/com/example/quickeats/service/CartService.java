package com.example.quickeats.service;

import com.example.quickeats.model.CartItem;
import com.example.quickeats.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public CartItem addItem(CartItem item) {
        return cartRepository.save(item);
    }

    public CartItem updateItem(Long id, int quantity) {
        CartItem item = cartRepository.findById(id).orElseThrow();
        item.setQuantity(quantity);
        return cartRepository.save(item);
    }

    public void removeItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart(Long userId) {
        cartRepository.findByUserId(userId).forEach(cartRepository::delete);
    }
}
