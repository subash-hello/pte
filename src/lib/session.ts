/**
 * Client-side session management utilities.
 * Manages JWT token and user data in localStorage.
 */

const TOKEN_KEY = 'pte_auth_token';
const USER_KEY = 'pte_user_session';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'branch_admin' | 'super_admin';
  status: 'pending' | 'approved' | 'declined';
  branch: string;
  pteGoal: number;
  subscription: string;
  accessDurationDays: number;
  approvedAt: string | null;
  xp: number;
  streak: number;
  level: number;
  lastLoginAt: string | null;
  createdAt: string;
}

/**
 * Store authentication session (token + user data)
 */
export function setSession(token: string, user: SessionUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/**
 * Get stored JWT token
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user data
 */
export function getUser(): SessionUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Clear session (logout)
 */
export function clearSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getToken() && !!getUser();
}

/**
 * Check if user has admin access
 */
export function isAdmin(): boolean {
  const user = getUser();
  return !!user && (user.role === 'super_admin' || user.role === 'branch_admin');
}

/**
 * Check if user is super admin
 */
export function isSuperAdmin(): boolean {
  const user = getUser();
  return !!user && user.role === 'super_admin';
}

/**
 * Authenticated fetch wrapper — automatically injects Authorization: Bearer <token> header.
 * Use this for ALL API calls that require authentication.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
