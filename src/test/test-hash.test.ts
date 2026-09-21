import { hashToken } from "../utils/hash.utils.js";

const token = "my-secret-refresh-token";

const hash = hashToken(token);

console.log("Token: ", token);

console.log("Hash: ", hash);