import { Result } from "./result";

abstract class ApplicationService<
  T extends Aggregate<TState, TId>,
  TState extends AggregateState<TState, TId>,
  TId extends AggregateId
> {
  protected readonly Store: IAggregateStore;
  abstract handle(command: any): Promise<Result<TState, TId>>;
}
