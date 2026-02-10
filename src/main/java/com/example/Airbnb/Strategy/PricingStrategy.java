package com.example.Airbnb.Strategy;

import com.example.Airbnb.Entities.InventoryEntity;

import java.math.BigDecimal;

public interface PricingStrategy {
    BigDecimal calculatePrice(InventoryEntity inventory);
}
