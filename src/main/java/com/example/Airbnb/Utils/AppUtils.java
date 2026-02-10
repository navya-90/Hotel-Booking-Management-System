package com.example.Airbnb.Utils;

import com.example.Airbnb.Entities.UserEntity;
import org.springframework.security.core.context.SecurityContextHolder;

public class AppUtils {
    public static UserEntity getCurrentUser() {
        return (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
