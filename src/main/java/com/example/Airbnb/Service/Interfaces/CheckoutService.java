package com.example.Airbnb.Service.Interfaces;

import com.example.Airbnb.Entities.BookingEntity;

public interface CheckoutService {
    String getCheckoutSession(BookingEntity booking, String successUrl, String failureUrl);
}
