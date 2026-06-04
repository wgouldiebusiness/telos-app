// ============================================================
// AUTH CONFIG — fill in JWT_SECRET_KEY before deploying.
// All other values are safe defaults — adjust per client need.
// ============================================================

export const AUTH_CONFIG = {
  jwt: {
    secret:              'JWT_SECRET_KEY',    // min 64 chars, cryptographically random
    accessTokenExpiry:   '15m',
    refreshTokenExpiry:  '7d',
    algorithm:           'HS256',
  },
  passwords: {
    minLength:              10,
    requireUppercase:       true,
    requireNumber:          true,
    requireSpecialChar:     true,
    saltRounds:             12,
    resetTokenExpiry:       3_600_000,    // 1 hour in ms
    resetMaxAttempts:       3,
    lockoutDurationMinutes: 30,
  },
  sessions: {
    maxConcurrentSessions:      3,
    inactivityTimeoutMinutes:   60,
    rememberMeDays:             30,
  },
  security: {
    maxLoginAttempts:    5,
    lockoutAfterAttempts: 5,
    mfaEnabled:          false,   // set true per client if required
    trustedDeviceDays:   30,
  },
}
