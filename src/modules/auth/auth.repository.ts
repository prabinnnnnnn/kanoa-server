import { IRepository } from "../../types/crud.types.js";
import { User } from "./auth.model.js";
import { UserCreationAttributes, UserUpdateAttributes } from "./auth.types.js";

export class AuthRepository implements IRepository<User, UserCreationAttributes, UserUpdateAttributes> {

    async getAll(): Promise<User[]> {
        return User.findAll();
    }

    async getUserByVerificationToken(token: string): Promise<User | null> {
        return User.findOne({
            where: {
                emailVerificationToken: token,
            },
        });
    }

    async verifyEmail(id: string): Promise<void> {
        await User.update(
            {
                isEmailVerified: true,
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
            {
                where: { id },
            },
        );
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

    async getUserByEmail(email: string): Promise<User | null> {
        return User.findOne({
            where: { email },
        });
    }
}