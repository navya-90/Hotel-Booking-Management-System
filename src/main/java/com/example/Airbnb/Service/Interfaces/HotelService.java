package com.example.Airbnb.Service.Interfaces;

import com.example.Airbnb.Dto.HotelDTO;
import com.example.Airbnb.Dto.HotelInfoDTO;

import java.util.List;

public interface HotelService {
    HotelDTO createNewHotel(HotelDTO hotelDto);
    HotelDTO getHotelById(Long id);
    HotelDTO updateHotelById(Long id, HotelDTO hotelDto);
    void deleteHotelById(Long id);
    void activateHotel(Long hotelId);
    HotelInfoDTO getHotelInfoById(Long hotelId);
    List<HotelDTO> getAllHotels();
}
