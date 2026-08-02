import { useState } from "react";
import { updateProfile } from "~/lib/api";

export function ProfileForm({ initialData }: { initialData: any }) {
  const [form, setForm] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await updateProfile(form);
      setMsg("✅ 更新成功");
    } catch (err: any) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      {msg && <div className="p-3 bg-gray-100 rounded">{msg}</div>}
      <div><label className="block text-sm font-medium">用户名</label><input value={form.username} disabled className="w-full px-3 py-2 border rounded bg-gray-100" /></div>
      <div><label className="block text-sm font-medium">邮箱</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">头像 URL</label><input value={form.avatar} onChange={e => setForm({...form, avatar: e.target.value})} className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">简介</label><textarea rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">个人网站</label><input value={form.website} onChange={e => setForm({...form, website: e.target.value})} className="w-full px-3 py-2 border rounded" /></div>
      <div><label className="block text-sm font-medium">所在地</label><input value={form.location} onChange={e => setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border rounded" /></div>
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">{loading ? "保存中..." : "保存修改"}</button>
    </form>
  );
}