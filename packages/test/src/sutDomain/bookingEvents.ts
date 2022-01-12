import { DateTime } from 'luxon';

export interface RoomBooked {
    bookingId: string;
    roomId: string;
    checkIn: DateTime;
    checkOut: DateTime;
    price: number;
}