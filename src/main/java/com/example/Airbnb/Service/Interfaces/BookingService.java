package com.example.Airbnb.Service.Interfaces;

import com.example.Airbnb.Dto.BookingDTO;
import com.example.Airbnb.Dto.BookingRequest;
import com.example.Airbnb.Dto.GuestDTO;
import com.example.Airbnb.Dto.HotelReportDTO;
import com.example.Airbnb.Enums.BookingStatus;
import com.stripe.model.Event;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
    BookingDTO initialiseBooking(BookingRequest bookingRequest);

    BookingDTO addGuests(Long bookingId, List<GuestDTO> guestDtoList);

    String initiatePayments(Long bookingId);

    void capturePayment(Event event);

    void cancelBooking(Long bookingId);

    BookingStatus getBookingStatus(Long bookingId);

    List<BookingDTO> getAllBookingsByHotelId(Long hotelId);

    HotelReportDTO getHotelReport(Long hotelId, LocalDate startDate, LocalDate endDate);

    List<BookingDTO> getMyBookings();
}
