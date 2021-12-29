export class DomainException extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, DomainException.prototype);
  }
}

export class InvalidIdException extends Error {
  constructor(id: AggregateId) {
    super(`Aggregate id ${typeof id} cannot have an empty value`);
    Object.setPrototypeOf(this, InvalidIdException.prototype);
  }
}

export class CommandHandlerNotFound<T> extends Error {
  constructor(type: T) {
    super(`Handler not found for command ${typeof type}`);
    Object.setPrototypeOf(this, InvalidIdException.prototype);
  }
}

export class CommandHandlerAlreadyRegistered<T> extends Error {
  constructor(type: T) {
    super(`Command handler for ${typeof type} already registered`);
    Object.setPrototypeOf(this, InvalidIdException.prototype);
  }
}
