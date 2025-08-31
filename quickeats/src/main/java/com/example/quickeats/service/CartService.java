package com.example.quickeats.service;

import com.example.quickeats.dto.AddToCartRequest;
import com.example.quickeats.model.CartItem;
import com.example.quickeats.model.Menu;
import com.example.quickeats.repository.CartRepository;
import com.example.quickeats.repository.MenuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final MenuRepository menuRepository;

    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public CartItem addItem(AddToCartRequest request) {
        var menu = menuRepository.findById(request.getMenuId())
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        CartItem item = new CartItem();
        item.setUserId(request.getUserId());
        item.setMenuItemId(menu.getId());
        item.setName(menu.getName());
        item.setPrice(menu.getPrice());
        item.setQuantity(request.getQuantity());

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
