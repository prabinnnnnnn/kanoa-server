import { IRepository } from "../../types/crud.types.js";
import { User } from "./auth.model.js";
import { UserCreationAttributes, UserUpdateAttributes } from "./auth.types.js";

export class AuthRepository implements IRepository<User, UserCreationAttributes, UserUpdateAttributes> {

    async getAll(): Promise<User[]> {
        return User.findAll();
    }

    async create(data: UserCreationAttributes): Promise<User> {
        return User.create(data);
    }

    async update(id: string, data: UserUpdateAttributes): Promise<User | null> {
        const user = await User.findByPk(id);

        if (!user) return null;

        return user.update(data);
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await User.destroy({
            where: { id },
        });

        return deleted > 0;
    }

    async getById(id: string): Promise<User | null> {
        return User.findByPk(id);
    }

    async getBySlug(slug: string): Promise<User | null> {
        return User.findOne({
            where: {},
        });
    }
}