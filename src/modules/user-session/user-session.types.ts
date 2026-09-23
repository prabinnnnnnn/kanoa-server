export interface CreateUserSessionInput {
    id?: string;
    userId: string;
    refreshTokenHash: string;
    userAgent?: string | null;
    ipAddress?: string | null;
    expiresAt: Date;
}

export interface UserSessionResponse {
    id: string;
    userId: string;
    userAgent: string | null;
    ipAddress: string | null;
    expiresAt: Date;
    revokedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSessionResult {
    session: UserSessionResponse;
}

export interface UserSessionsResult {
    sessions: UserSessionResponse[];
}