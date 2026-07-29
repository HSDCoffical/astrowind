export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.split('/').pop();

  // 获取当前月份键（每月自动重置）
  const now = new Date();
  const key = `form_${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}`;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // GET：获取剩余次数
  if (request.method === 'GET') {
    try {
      let value = await env.COUNT_STORE.get(key);
      if (value === null) {
        await env.COUNT_STORE.put(key, '50');
        value = '50';
      }
      return new Response(JSON.stringify({ value: parseInt(value, 10) }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { headers, status: 500 });
    }
  }

  // POST：减少1次
  if (request.method === 'POST') {
    try {
      let current = await env.COUNT_STORE.get(key);
      if (current === null) {
        await env.COUNT_STORE.put(key, '50');
        current = '50';
      }
      let num = parseInt(current, 10);
      if (num <= 0) {
        return new Response(JSON.stringify({ error: '已用尽' }), { headers, status: 400 });
      }
      const newValue = num - 1;
      await env.COUNT_STORE.put(key, String(newValue));
      return new Response(JSON.stringify({ value: newValue }), { headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { headers, status: 500 });
    }
  }

  return new Response('Method not allowed', { headers, status: 405 });
}
