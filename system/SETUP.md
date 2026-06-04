# Telos AI — System Setup & Client Onboarding Guide

## Before you start: fill in these config files

| File | What to fill in |
|------|----------------|
| `system/auth/config.js` | `JWT_SECRET_KEY` — minimum 64 characters, cryptographically random |
| `system/emails/config.js` | `EMAIL_API_KEY`, `TELOS_LOGO_URL` |
| `system/connections/config.js` | All third-party API keys (Stripe, Twilio, Google, HubSpot, Airtable) |

Generate a JWT secret: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

---

## Adding a new client — step by step

### Step 1: Create the owner account

Call `createOwnerAccount()` from `system/accounts/masterAccount.js`:

```js
import { createOwnerAccount } from './system/index.js'

const { account, inviteToken } = await createOwnerAccount(
  {
    name:         'Jane Smith',
    email:        'jane@hersbusiness.co.uk',
    businessName: 'Jane Smith Aesthetics',
  },
  TELOS_MASTER_ACCOUNT_ID
)
```

**What fires automatically:**
- Owner account created with tier: `owner`
- `accountInvite` email sent to the owner with a setup link
- Invite token valid for 48 hours
- Audit log entry created

---

### Step 2: Owner sets up their account

The owner clicks the invite link, lands on your setup page, and:

1. Sets their password (call `resetPassword()` with the token from the invite flow)
2. Sees their setup checklist: Stripe, calendar, first client

**What fires automatically:**
- `welcome` (owner tier) email sent on password confirmation

---

### Step 3: Owner connects integrations

The owner connects Stripe, Twilio, Google Calendar etc. via your portal UI, which calls:

```js
await connectIntegration(ownerAccountId, 'stripe', {
  secretKey: 'sk_live_...',
  webhookSecret: 'whsec_...',
})
```

**What fires automatically:**
- Credentials validated against real API before storing
- `agentConnected` email sent to the owner confirming the connection

---

### Step 4: Owner adds their first client

The owner adds a client through their portal, which calls:

```js
await createClientAccount(
  { name: 'Sarah Jones', email: 'sarah@gmail.com', phone: '+447911123456' },
  ownerAccountId
)
```

**What fires automatically:**
- Client account created with tier: `client`
- `welcome` (client tier) email sent — branded with owner's business name and logo
- Magic link included in welcome email, valid 15 minutes
- Audit log entry created

---

### Step 5: System is live

Telos monitors everything from the master dashboard:

```js
const overview = await getMasterOverview(TELOS_MASTER_ACCOUNT_ID)
```

This returns: active owners, total end clients, agent connections, email delivery stats, billing overview, recent activity.

---

## Day-to-day operations

### Check a specific client's health
```js
const card = await getOwnerSummaryCard(ownerAccountId)
// Returns: health status (green/amber/red), active agents, client count, alerts
```

### Impersonate an owner for support
```js
const { token, expiresAt } = impersonateOwner(ownerAccountId, TELOS_MASTER_ACCOUNT_ID)
// Use token to authenticate as the owner for up to 1 hour
// All actions logged as "Telos on behalf of [owner]"
```

### Suspend an account
```js
await suspendOwnerAccount(ownerAccountId, 'Non-payment — 30 days overdue', TELOS_MASTER_ACCOUNT_ID)
// Suspends owner + ALL clients beneath them
// All sessions terminated immediately
// Security email sent to owner
```

### Query the audit log
```js
const logs = getAuditLog(TELOS_MASTER_ACCOUNT_ID, {
  accountId: ownerAccountId,
  fromDate:  '2025-09-01',
})
```

---

## What the client sees on day one

1. **Invite email** arrives with a "Set up my account" button
2. They click → set password → land on their owner dashboard
3. Dashboard shows: setup checklist, empty bookings, connected agents (none yet), quick actions
4. They connect Stripe → `agentConnected` email confirms
5. They add a client → that client receives a branded welcome email with portal access
6. Client logs in via magic link → sees appointments, invoices, documents

---

## Security notes

- All passwords hashed with bcrypt (12 rounds)
- JWT access tokens expire in 15 minutes
- Refresh tokens rotate on every use — old token is immediately invalidated
- Accounts lock after 5 failed login attempts (30 minute lockout)
- Every privileged action writes to the immutable audit log before executing
- Impersonation sessions expire after 1 hour and are permanently logged
- All destructive actions (suspend, delete, disconnect) require permission check + audit entry

---

## Replacing mock functions with real SDKs

Every third-party call has a `// CONNECT: [ServiceName]` comment above the mock.
Search for `CONNECT:` across the `system/` folder to find all 30+ integration points.

Priority order for going live:
1. `system/auth/passwords.js` — install `bcrypt`
2. `system/auth/tokens.js` — install `jsonwebtoken`
3. `system/emails/emailEngine.js` — install `@sendgrid/mail`
4. `system/connections/stripe.js` — install `stripe`
5. `system/connections/twilio.js` — install `twilio`
6. All DB calls — connect to Supabase / PostgreSQL
