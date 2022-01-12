import { DateTime } from 'luxon';

export interface BookRoom {
  bookingId: string;
  roomId: string;
  checkIn: DateTime;
  checkOut: DateTime;
  price: number;
}

export interface ImportBooking {
  bookingId: string;
  roomId: string;
  checkIn: DateTime;
  checkOut: DateTime;
}
