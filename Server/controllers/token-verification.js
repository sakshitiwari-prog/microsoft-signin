var secretKey = "$wne7823@#$5nsjnd@@%%$#@#$";
function verifyToken(token) {
  try {
    // Verify the JWT signature
    const decoded = jwt.verify(token, secretKey);

    // Validate token claims (issuer, audience, etc.) if needed
    // Check expiration time
    console.log("decoded.exp", decoded);
    if (decoded.exp < Date.now() / 1000) {
      throw new Error("Token expired");
    }

    // Optionally check token revocation

    return decoded;
  } catch (error) {
    // Token verification failed
    console.error("Token verification failed:", error.message);
    return null;
  }
}
module.exports = verifyToken;
