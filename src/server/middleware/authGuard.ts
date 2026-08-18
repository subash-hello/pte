import { NextResponse } from 'next/server';
import { authService, TokenPayload } from '../services/authService';

export function getAuthUser(req: Request): TokenPayload | null {
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  const token = authHeader.split(' ')[1];
  return authService.verifyToken(token);
}

export function requireRole(req: Request, allowedRoles: string[]) {
  const user = getAuthUser(req);
  if (!user) {
    return {
      authorized: false,
      user: null,
      response: NextResponse.json({ error: 'Unauthorized: Authentication required' }, { status: 401 }),
    };
  }

  if (!allowedRoles.includes(user.role)) {
    return {
      authorized: false,
      user,
      response: NextResponse.json({ error: 'Forbidden: Insufficient privileges' }, { status: 403 }),
    };
  }

  return { authorized: true, user, response: null };
}

export default { getAuthUser, requireRole };
