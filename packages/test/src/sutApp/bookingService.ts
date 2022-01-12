export class BookingService extends ApplicationService<Booking, BookingState, BookingId> {
    public BookingService(IAggregateStore store) : base(store) {
        OnNew<Commands.BookRoom>(
            (booking, cmd)
                => booking.BookRoom(
                    new BookingId(cmd.BookingId),
                    cmd.RoomId,
                    new StayPeriod(cmd.CheckIn, cmd.CheckOut),
                    cmd.Price
                )
        );

        OnAny<Commands.ImportBooking>(
            cmd => new BookingId(cmd.BookingId),
            (booking, cmd)
                => booking.Import(
                    new BookingId(cmd.BookingId),
                    cmd.RoomId,
                    new StayPeriod(cmd.CheckIn, cmd.CheckOut)
                )
        );
    }
}