import { User } from "./auth.model.js";
import { AuthRepository } from "./auth.repository.js";
import { UserCreationAttributes, UserUpdateAttributes } from "./auth.types.js";

export class AuthService {
    constructor(private readonly repository: AuthRepository) { }

    async getAll(): Promise<User[]> {
        return this.repository.getAll();
    }

    async getById(id: string): Promise<User | null> {
        return this.repository.getById(id);
    }

    async create(data: UserCreationAttributes): Promise<UserCreationAttributes> {
        return this.repository.create(data);
    }

    async update(id: string, data: UserUpdateAttributes): Promise<UserUpdateAttributes | null> {
        return this.repository.update(id, data);
    }

    async delete(id: string): Promise<boolean> {
        return this.repository.delete(id);
    }
}