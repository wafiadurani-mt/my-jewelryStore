// server/api/ping.get.ts
export default defineEventHandler(() => {
  return { ok: true, message: 'API is working' }
})
