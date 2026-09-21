import { UserSessionService } from "../modules/user-session/user-session.service.js";
import { db } from "../config/db.js";
import { UserSessionRepository } from "../modules/user-session/user-session.repository.js";

const userSessionService = new UserSessionService(new UserSessionRepository)

async function testUserSession() {
    try {
        await db.authenticate();

        console.log("Database connected");

        const session = await userSessionService.createSession({
            userId: "936d1b32-35fb-4d59-8720-bf34443c2aa1",
            refreshTokenHash: "test-hash",
            userAgent: "Chrome",
            ipAddress: "127.0.0.1",
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
        });

        console.log("Session created:");
        console.log(session.toJSON());

    } catch (error) {
        console.error("Test failed:", error);
    } finally {
        await db.close();
    }
}

testUserSession();