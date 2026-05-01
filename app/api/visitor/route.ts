import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 获取真实 IP
    // 在 Vercel 上，真实 IP 会在 x-forwarded-for 或者 x-real-ip 里
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : realIp || 'Unknown IP';

    // 构造记录对象
    const record = {
      timestamp: new Date().toISOString(),
      ip,
      country: body.country || 'Unknown',
      city: body.city || 'Unknown',
      browser: body.browser || 'Unknown',
      os: body.os || 'Unknown',
      userAgent: request.headers.get('user-agent') || 'Unknown',
    };

    // 将记录推入名为 'visitor_logs' 的 Redis 列表中
    // lpush 将新记录放在最前面
    await kv.lpush('visitor_logs', JSON.stringify(record));
    
    // 为了防止列表过长，可以保留最近 1000 条
    await kv.ltrim('visitor_logs', 0, 999);

    return NextResponse.json({ success: true, record });
  } catch (error) {
    console.error('Failed to log visitor:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  // 这个接口用来给管理页面获取数据，我们加一个简单的鉴权
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  
  // 你需要把密码配在 Vercel 环境变量 ADMIN_SECRET 里
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 获取前 100 条记录
    const logs = await kv.lrange('visitor_logs', 0, 99);
    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Failed to fetch visitor logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
