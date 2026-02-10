package com.example.Airbnb.Service.Interfaces;

import com.example.Airbnb.Dto.ProfileUpdateRequestDTO;
import com.example.Airbnb.Dto.UserDTO;
import com.example.Airbnb.Entities.UserEntity;

public interface UserService {
    UserEntity getUserById(Long id);

    void updateProfile(ProfileUpdateRequestDTO profileUpdateRequestDto);

    UserDTO getMyProfile();
}
