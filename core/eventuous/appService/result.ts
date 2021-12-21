export interface Change {
  readonly event: object;
  eventType: string;
}

export interface Result {
  readonly changes: Change[];
  readonly state: object;
  readonly success: boolean;
}
