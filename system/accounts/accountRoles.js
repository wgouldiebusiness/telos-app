/**
 * ACCOUNT ROLES — helpers for querying and describing tier relationships.
 */

import { ACCOUNT_CONFIG } from './config.js'

/**
 * Returns the human-readable label for a tier.
 * @param {'master'|'owner'|'client'} tier
 * @returns {string}
 */
export function getTierLabel(tier) {
  return ACCOUNT_CONFIG.tiers[tier]?.label ?? 'Unknown'
}

/**
 * Returns the numeric authority level for a tier (lower = more authority).
 * @param {'master'|'owner'|'client'} tier
 * @returns {number}
 */
export function getTierLevel(tier) {
  return ACCOUNT_CONFIG.tiers[tier]?.level ?? 99
}

/**
 * Returns true if tier A has authority over tier B.
 * @param {'master'|'owner'|'client'} tierA
 * @param {'master'|'owner'|'client'} tierB
 * @returns {boolean}
 */
export function outranks(tierA, tierB) {
  return getTierLevel(tierA) < getTierLevel(tierB)
}

/**
 * Returns the list of account types a given tier can create.
 * @param {'master'|'owner'|'client'} tier
 * @returns {string[]}
 */
export function getCreatableRoles(tier) {
  return ACCOUNT_CONFIG.tiers[tier]?.canCreate ?? []
}

/**
 * Returns a summary of what each tier can and cannot do.
 * Used by the frontend to conditionally render components.
 * @returns {Object}
 */
export function getTierCapabilitySummary() {
  return Object.fromEntries(
    Object.entries(ACCOUNT_CONFIG.tiers).map(([tier, config]) => [
      tier,
      {
        label:       config.label,
        canCreate:   config.canCreate,
        canSuspend:  config.canSuspend,
        billing:     config.canViewBilling,
        agents:      config.canManageAgents,
        export:      config.canExportData,
        impersonate: config.canImpersonate,
      },
    ])
  )
}
