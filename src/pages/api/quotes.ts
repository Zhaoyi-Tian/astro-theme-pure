import type { APIRoute } from 'astro'
import quotes from '@/data/quotes.json'

export const GET: APIRoute = async () => {
  // 随机选择一条语录
  const randomIndex = Math.floor(Math.random() * quotes.length)
  const randomQuote = quotes[randomIndex]

  return new Response(
    JSON.stringify({
      hitokoto: randomQuote,
      length: randomQuote.length,
      id: randomIndex
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  )
}