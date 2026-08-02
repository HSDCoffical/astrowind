import { authClient } from "./auth-client";

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

export async function getSession() {
  return authClient.getSession();
}

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

export async function changePassword(oldPassword: string, newPassword: string) {
  return authClient.changePassword({
    currentPassword: oldPassword,
    newPassword,
  });
}

export async function getMessages() {
  return request("/api/messages");
}

export async function markMessageRead(id: number) {
  return request(`/api/messages/${id}/read`, { method: "POST" });
}

export async function sendMessage(receiverId: number, content: string) {
  return request("/api/messages/admin/send", {
    method: "POST",
    body: JSON.stringify({ receiver_id: receiverId, content }),
  });
}