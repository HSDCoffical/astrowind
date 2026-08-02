const API_BASE = import.meta.env.PUBLIC_API_URL || "https://hono-bbs-9qj.pages.dev";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "请求失败");
  }
  return res.json();
}

// 获取当前用户 Session（Better Auth 标准端点）
export async function getSession() {
  return request("/api/auth/session");
}

// 修改密码
export async function changePassword(oldPassword: string, newPassword: string) {
  return request("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword: oldPassword, newPassword }),
  });
}

// 更新个人资料
export async function updateProfile(data: {
  email?: string;
  bio?: string;
  avatar?: string;
  website?: string;
  location?: string;
}) {
  return request("/api/profile/update", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 获取消息列表
export async function getMessages() {
  return request("/api/messages");
}

// 标记消息已读
export async function markMessageRead(id: number) {
  return request(`/api/messages/${id}/read`, { method: "POST" });
}

// 管理员发送消息
export async function sendMessage(receiverId: number, content: string) {
  return request("/api/messages/admin/send", {
    method: "POST",
    body: JSON.stringify({ receiver_id: receiverId, content }),
  });
}