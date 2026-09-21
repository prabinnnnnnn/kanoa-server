import { UserSessionRepository } from "./user-session.repository.js";
import { UserSessionCreationAttributes } from "./user-session.types.js";

export class UserSessionService {
    constructor(private readonly repository: UserSessionRepository) { }

    async createSession(data: UserSessionCreationAttributes) {
        return this.repository.create(data);
    }

    async getSessionById(id: string) {
        return this.repository.findById(id);
    }

    async getSessionByRefreshTokenHash(refreshTokenHash: string) {
        return this.repository.findByRefreshTokenHash(
            refreshTokenHash
        );
    }

    async getActiveSessions(userId: string) {
        return this.repository.findByUserId(userId);
    }

    async revokeSession(id: string) {
        return this.repository.revoke(id);
    }

    async revokeAllSessions(userId: string) {
        return this.repository.revokeAllByUserId(userId);
    }
}
