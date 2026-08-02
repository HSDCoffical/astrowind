import { useState } from "react";
import { changePassword } from "~/lib/api";

export function PasswordForm() {
  const [old, setOld] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPwd !== confirm) { setMsg("❌ 两次密码不一致"); return; }
    setLoading(true); setMsg("");
    try {
      const res = await changePassword(old, newPwd);
      if (res.error) setMsg("❌ " + res.error.message);
      else { setMsg("✅ 修改成功"); setOld(""); setNewPwd(""); setConfirm(""); }
    } catch (err: any) { setMsg("❌ " + err.message); }
    finally { setLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {msg && <div className="p-3 bg-gray-100 rounded">{msg}</div>}
      <div><label className="block text-sm font-medium">当前密码</label><input type="password" value={old} onChange={e => setOld(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">新密码</label><input type="password" value={newPwd} onChange={e => setNewPwd(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">确认新密码</label><input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required className="w-full px-3 py-2 border rounded" /></div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">{loading ? "修改中..." : "修改密码"}</button>
    </form>
  );
}