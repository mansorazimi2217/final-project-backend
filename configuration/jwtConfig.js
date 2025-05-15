import crypto from "crypto";

// Generate a random 256-bit (32-byte) key for AES-256
const secretKey = crypto.randomBytes(32).toString("hex");

export default secretKey;
