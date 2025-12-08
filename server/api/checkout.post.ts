import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  // Get data sent from frontend
  const body = await readBody<{
    items: {
      id: string | number
      name: string
      price: number
      quantity: number
    }[]
    customer?: {
      firstName: string
      lastName: string
      email: string
      phone: string
      address: string
    }
  }>(event)

  // Validate
  if (!body || !Array.isArray(body.items) || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No items provided for checkout'
    })
  }

  // Convert cart items to Stripe format
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    body.items.map((item) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // £ → pence
      },
      quantity: item.quantity,
    }))

  // Create stripe checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: body.customer?.email,
    success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/cancel',
  })

  return { url: session.url }
})
