package com.example.quickeats.service;

import com.example.quickeats.model.Menu;
import com.example.quickeats.repository.MenuRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    private final MenuRepository menuRepository;

    public MenuService(MenuRepository menuRepository) {
        this.menuRepository = menuRepository;
    }

    public List<Menu> getAllMenuItems() {
        return menuRepository.findAll();
    }

    public Menu getMenuItemById(Long id) {
        return menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found with id " + id));
    }

    public Menu createMenuItem(Menu menu) {
        return menuRepository.save(menu);
    }

    public Menu updateMenuItem(Long id, Menu menu) {
        Menu existing = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));

        existing.setName(menu.getName());
        existing.setDescription(menu.getDescription());
        existing.setPrice(menu.getPrice());
        existing.setImage(menu.getImage());

        return menuRepository.save(existing);
    }

    public void deleteMenuItem(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new RuntimeException("Menu item not found");
        }
        menuRepository.deleteById(id);
    }
}
