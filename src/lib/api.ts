const API_BASE = import.meta.env.PUBLIC_API_URL || "https://hono-bbs-9qj.pages.dev";

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
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

// 获取当前登录用户信息
export async function getSession() {
  return apiRequest("/api/auth/session");
}

// 修改密码
export async function changePassword(oldPassword: string, newPassword: string) {
  return apiRequest("/api/auth/change-password", {
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
  return apiRequest("/api/profile/update", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// 获取消息列表
export async function getMessages() {
  return apiRequest("/api/messages");
}

// 标记消息已读
export async function markMessageRead(id: number) {
  return apiRequest(`/api/messages/${id}/read`, { method: "POST" });
}

// 管理员发送消息
export async function sendMessage(receiverId: number, content: string) {
  return apiRequest("/api/messages/admin/send", {
    method: "POST",
    body: JSON.stringify({ receiver_id: receiverId, content }),
  });
}

// 获取所有用户（用于管理员选择收件人）
export async function getAllUsers() {
  return apiRequest("/api/messages/users");
}