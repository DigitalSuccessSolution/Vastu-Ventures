import { useAuthStore } from "./store";

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

export default async function securedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  
  const headers = new Headers(init?.headers);
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  
  let response = await fetch(input, {
    ...init,
    headers,
  });

  // If unauthorized (401), try to refresh token automatically
  if (response.status === 401) {
    if (typeof window === "undefined") return response;

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        // Refresh token endpoint automatically sends cookies
        const refreshRes = await fetch(`${apiUrl}/auth/refresh-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Send HttpOnly refresh-token cookie
        });
        const refreshData = await refreshRes.json();
        
        if (refreshRes.ok && refreshData.success && refreshData.data?.accessToken) {
          const newAccessToken = refreshData.data.accessToken;
          // Store token in Zustand & localStorage
          useAuthStore.getState().setToken(newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } else {
          throw new Error("Session expired");
        }
      } catch (err) {
        isRefreshing = false;
        useAuthStore.getState().logout();
        window.location.href = "/admin/login";
        return response;
      }
    }

    // Wait for the token refresh to complete, then retry the request with the new token
    return new Promise((resolve) => {
      subscribeTokenRefresh((newToken) => {
        const newHeaders = new Headers(init?.headers);
        newHeaders.set("Authorization", `Bearer ${newToken}`);
        resolve(fetch(input, { ...init, headers: newHeaders }));
      });
    });
  }

  return response;
}
