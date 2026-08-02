import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://better-hono.2791389901.workers.dev",
});