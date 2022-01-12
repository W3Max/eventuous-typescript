import { AggregateId } from "./aggregateId";

export abstract class AggregateState<T, TId extends AggregateId> {

    public id : TId { get; protected init; } = null!;

    internal T SetId(TId id) => (T)this with { Id = id };
}