public abstract class Aggregate<T, TId> {
    /// <summary>
    /// Get the list of pending changes (new events) within the scope of the current operation.
    /// </summary>
    protected readonly changes: object[] = [];

    /// <summary>
    /// Clears all the pending changes. Normally not used. Can be used for testing purposes.
    /// </summary>
    clearChanges() {
        this.changes.length = 0;
    }

    /// <summary>
    /// The original version is the aggregate version we got from the store.
    /// It is used for optimistic concurrency, to check if there were no changes made to the
    /// aggregate state between load and save for the current operation.
    /// </summary>
    public originalVersion: number = -1;

    /// <summary>
    /// The current version is set to the original version when the aggregate is loaded from the store.
    /// It should increase for each state transition performed within the scope of the current operation.
    /// </summary>
    public currentVersion: number = -1;

    /// <summary>
    /// Restores the aggregate state from a collection of events, previously stored in the <seealso cref="AggregateStore"/>
    /// </summary>
    /// <param name="events">Domain events from the aggregate stream</param>
    public abstract load(events : object[]);

    /// <summary>
    /// The fold operation for events loaded from the store, which restores the aggregate state.
    /// </summary>
    /// <param name="evt">Domain event to be applied to the state</param>
    public abstract fold(evt : object);

    /// <summary>
    /// Get the aggregate id in a storage-friendly format. Allows using a value object as the aggregate id
    /// inside the model, which then gets converted to a string for storage purposes.
    /// </summary>
    /// <returns></returns>
    public getId() { this.state.id; }

    /// <summary>
    /// Adds an event to the list of pending changes.
    /// </summary>
    /// <param name="evt">New domain event</param>
    protected addChange(evt : object) { this.changes.push(evt);}

    /// <summary>
    /// Use this method to ensure you are operating on a new aggregate.
    /// </summary>
    /// <exception cref="DomainException"></exception>
    protected EnsureDoesntExist(getException : Func<Exception>? = null) {
        if (this.currentVersion > -1)
            throw getException?.Invoke()
               ?? new DomainException($"{GetType().Name} already exists: {GetId()}");
    }

    /// <summary>
    /// Use this method to ensure you are operating on an existing aggregate.
    /// </summary>
    /// <exception cref="DomainException"></exception>
    protected  EnsureExists( getException : Error? = null) {
        if (currentVersion == -1)
            throw getException
               ?? new DomainException($"{GetType().Name} doesn't exist: {GetId()}");
    }

    /// <summary>
    /// Returns the current aggregate state. Cannot be mutated from the outside.
    /// </summary>
    public state : T = {} as T;
}
