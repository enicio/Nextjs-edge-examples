export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}


export const runtime = 'edge'; // 'nodejs' (default) | 'edge'