/**
 * STRIPE — payment processing helpers used by agents.
 * All calls are mocked with CONNECT comments.
 */

import { CONNECTION_CONFIG } from './config.js'

/**
 * Creates a Stripe PaymentIntent.
 * @param {string} accountId - owner account whose Stripe is used
 * @param {number} amount - in pence
 * @param {string} currency
 * @param {Object} metadata
 * @returns {Promise<{ clientSecret: string, paymentIntentId: string }>}
 */
export async function createPaymentIntent(accountId, amount, currency, metadata = {}) {
  // CONNECT: Stripe — replace with real SDK
  // const stripe = require('stripe')(getOwnerStripeKey(accountId))
  // const intent = await stripe.paymentIntents.create({ amount, currency, metadata })
  // return { clientSecret: intent.client_secret, paymentIntentId: intent.id }

  console.log(`[stripe][MOCK] PaymentIntent: ${currency.toUpperCase()} ${amount} for account ${accountId}`)
  return { clientSecret: `mock_pi_secret_${Date.now()}`, paymentIntentId: `mock_pi_${Date.now()}` }
}

/**
 * Handles an inbound Stripe webhook event.
 * @param {string} rawBody
 * @param {string} signature
 * @returns {{ event: Object|null, error: string|null }}
 */
export function handleWebhook(rawBody, signature) {
  // CONNECT: Stripe — verify webhook signature
  // const stripe = require('stripe')(CONNECTION_CONFIG.stripe.secretKey)
  // const event = stripe.webhooks.constructEvent(rawBody, signature, CONNECTION_CONFIG.stripe.webhookSecret)
  // return { event, error: null }

  console.log('[stripe][MOCK] Webhook received')
  return { event: { type: 'payment_intent.succeeded', data: { object: { metadata: {} } } }, error: null }
}

/**
 * Lists recent charges for an account for reporting.
 * @param {string} accountId
 * @param {{ from: Date, to: Date }} dateRange
 * @returns {Promise<Object[]>}
 */
export async function listCharges(accountId, dateRange) {
  // CONNECT: Stripe — charges.list with created filter
  console.log(`[stripe][MOCK] Listing charges for ${accountId}`)
  return []
}
