import { AuthUIProvider } from "@daveyplate/better-auth-ui";
import { Toaster } from "sonner";
import { authClient } from "~/lib/auth-client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <AuthUIProvider authClient={authClient}>
        {children}
      </AuthUIProvider>
    </>
  );
}