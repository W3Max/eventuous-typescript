import { RoomBooked } from '../sutDomain/bookingEvents';
import { BookRoom } from '../sutApp/commands';
import * as faker from 'faker';
import { DateTime } from 'luxon';
import { Change } from '@w3max/eventuous-typescript'

describe('handling a command', () => {
 const eventStore     = new InMemoryEventStore();
 const aggregateStore = new AggregateStore(eventStore);
 
  const sut = new BookingService(aggregateStore)

  const now = DateTime.now();

  const cmd: BookRoom = {
    bookingId: faker.datatype.string(),
    roomId: faker.datatype.string(),
    checkIn: now,
    checkOut: now.plus({ day: 2 }),
    price: faker.datatype.float({ precision: 2 }),
  };

  const result = await sut.handle(cmd);

  it('should return expected changes', () => {
    const expected : Change[] = [{
      event:  {
        bookingId: cmd.bookingId,
        roomId: cmd.roomId,
        checkIn: cmd.checkIn,
        checkOut: cmd.checkOut,
        price: cmd.price
      } as RoomBooked,
      eventType: "RoomBooked"
    }];

    expect(result.changes).toEqual(expected);
  });
});
