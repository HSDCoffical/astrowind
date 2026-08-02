import { useState, useEffect } from "react";
import { getMessages, markMessageRead } from "~/lib/api";

export function MessageList() {
  const [msgs, setMsgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const data = await getMessages();
      setMsgs(data);
    } catch {}
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id: number) => {
    await markMessageRead(id);
    setMsgs(msgs.map(m => m.id === id ? { ...m, is_read: true } : m));
  };

  if (loading) return <p>加载中...</p>;

  return (
    <div className="space-y-2 max-w-3xl">
      {msgs.length === 0 ? <p className="text-gray-500">暂无消息</p> :
        msgs.map(m => (
          <div key={m.id} className={`border rounded-lg p-4 ${!m.is_read ? "bg-blue-50 dark:bg-blue-900/20" : "bg-white dark:bg-gray-800"}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{m.sender_id === 0 ? "系统通知" : m.sender_name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{m.content}</p>
              </div>
              <div className="text-xs text-gray-400 text-right">
                {new Date(m.created_at + "Z").toLocaleString()}
                {!m.is_read && <button onClick={() => markRead(m.id)} className="block mt-1 text-blue-600 underline">标为已读</button>}
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}