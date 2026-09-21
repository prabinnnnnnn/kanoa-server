import { UserSession } from "./user-session.model.js";
import { UserSessionCreationAttributes } from "./user-session.types.js";

export class UserSessionRepository {

    async create(data: UserSessionCreationAttributes): Promise<UserSession> {
        return UserSession.create(data);
    }

    async findById(id: string): Promise<UserSession | null> {
        return UserSession.findByPk(id);
    }

    async findByUserId(userId: string): Promise<UserSession[]> {
        return UserSession.findAll({
            where: {
                userId,
                revokedAt: null,
            },
        });
    }

    async revoke(id: string): Promise<[affectedCount: number]> {
        return UserSession.update(
            {
                revokedAt: new Date(),
            },
            {
                where: {
                    id,
                    revokedAt: null,
                },
            }
        );
    }

    async revokeAllByUserId(userId: string): Promise<[affectedCount: number]> {
        return UserSession.update(
            {
                revokedAt: new Date(),
            },
            {
                where: {
                    userId,
                    revokedAt: null,
                },
            }
        );
    }

    async findByRefreshTokenHash(refreshTokenHash: string): Promise<UserSession | null> {
        return UserSession.findOne({
            where: {
                refreshTokenHash,
                revokedAt: null,
            },
        });
    }
}
