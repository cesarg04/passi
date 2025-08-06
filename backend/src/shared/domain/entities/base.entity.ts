export abstract class BaseEntity {
  protected constructor(
    public readonly id?: number,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}

  abstract toJSON(): Record<string, any>;
}
