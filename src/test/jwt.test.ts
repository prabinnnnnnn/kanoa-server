import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken } from "../utils/jwt.utils.js";

const userId = "11111111-1111-1111-1111-111111111111";
const sessionId = "22222222-2222-2222-2222-222222222222";

// Generate tokens
const accessToken = generateAccessToken({
    sub: userId,
    role: "user",
});

const refreshToken = generateRefreshToken({
    sub: userId,
    sid: sessionId,
    type: "refresh",
});

console.log("\nAccess Token:");
console.log(accessToken);

console.log("\nRefresh Token:");
console.log(refreshToken);

// Verify tokens
const accessPayload = verifyAccessToken(accessToken);
const refreshPayload = verifyRefreshToken(refreshToken);

console.log("\nAccess Token Payload:");
console.log(accessPayload);

console.log("\nRefresh Token Payload:");
console.log(refreshPayload);