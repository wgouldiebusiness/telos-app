// ============================================================
// ACCOUNT CONFIG — defines what each tier can do.
// masterOverrides are set per-account at onboarding.
// ============================================================

export const ACCOUNT_CONFIG = {
  tiers: {
    master: {
      label:               'Telos Master',
      level:               1,
      canCreate:           ['owner', 'client'],
      canSuspend:          ['owner', 'client'],
      canDelete:           ['owner', 'client'],
      canViewBilling:      true,
      canManageAgents:     true,
      canImpersonate:      true,
      canViewAllAccounts:  true,
      canExportData:       true,
    },
    owner: {
      label:               'Business Owner',
      level:               2,
      canCreate:           ['client'],
      canSuspend:          ['client'],
      canDelete:           [],
      canViewBilling:      true,   // own billing only
      canManageAgents:     true,   // own agents only
      canImpersonate:      false,
      canViewAllAccounts:  false,  // own clients only
      canExportData:       true,   // own data only
    },
    client: {
      label:               'End Client',
      level:               3,
      canCreate:           [],
      canSuspend:          [],
      canDelete:           [],
      canViewBilling:      false,
      canManageAgents:     false,
      canImpersonate:      false,
      canViewAllAccounts:  false,
      canExportData:       false,
    },
  },

  // Master can grant temporary elevated permissions to specific owner accounts.
  // Populated at onboarding: { [ownerAccountId]: { [permission]: { expiresAt, grantedBy } } }
  masterOverrides: {},
}
