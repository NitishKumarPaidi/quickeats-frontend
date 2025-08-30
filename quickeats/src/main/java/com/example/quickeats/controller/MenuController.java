package com.example.quickeats.controller;

import com.example.quickeats.model.Menu;
import com.example.quickeats.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    // Get all menu items
    @GetMapping
    public List<Menu> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/{id}")
    public Menu getMenuItemById(@PathVariable Long id) {
        return menuService.getMenuItemById(id);
    }

    // Create a new menu item
    @PostMapping
    public Menu createMenuItem(@RequestBody Menu menu) {
        return menuService.createMenuItem(menu);
    }

    // Update a menu item by id
    @PutMapping("/{id}")
    public Menu updateMenuItem(@PathVariable Long id, @RequestBody Menu menu) {
        return menuService.updateMenuItem(id, menu);
    }

    // Delete a menu item by id
    @DeleteMapping("/{id}")
    public String deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return "Menu item with id " + id + " deleted successfully!";
    }
}
