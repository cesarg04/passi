import { BaseEntity } from "../../../../shared/domain/entities/base.entity";

export class User extends BaseEntity {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    id?: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(email: string, password: string, name?: string): User {
    return new User(email, password, name);
  }

  toJSON(): Record<string, any> {
    const { password, ...userWithoutPassword } = this;
    return {
      ...userWithoutPassword,
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updatePassword(newPassword: string): User {
    return new User(
      this.email,
      newPassword,
      this.name,
      this.id,
      this.createdAt,
      this.updatedAt,
    );
  }
}
