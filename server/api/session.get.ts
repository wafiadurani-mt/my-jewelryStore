import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const { stripeSecretKey } = useRuntimeConfig()
  const stripe = new Stripe(stripeSecretKey)

  // Read session_id from query: /api/session?session_id=xxx
  const { session_id } = getQuery(event)

  if (!session_id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing session_id',
    })
  }

  // Ask Stripe for full session details + line items
  const session = await stripe.checkout.sessions.retrieve(String(session_id), {
    expand: ['line_items'],
  })

  return session
})
