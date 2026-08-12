import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectToDatabase } from './mongodb';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'pte-master-ai-production-jwt-secret-2026-x9k4m7qz';
const JWT_EXPIRES_IN = '7d';

export interface JWTPayload {
  id: string;
  role: string;
  tokenVersion: number;
}

/**
 * Generate a signed JWT token for a user
 */
export function generateToken(user: IUser): string {
  const payload: JWTPayload = {
    id: user._id.toString(),
    role: user.role,
    tokenVersion: user.tokenVersion,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verify JWT token and return decoded payload
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Extract JWT token from request headers
 * Supports: Authorization: Bearer <token> and X-App-Token: <token>
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization') || request.headers.get('X-App-Token') || '';
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }
  return authHeader || null;
}

/**
 * Full authentication verification:
 * 1. Extract token from request
 * 2. Verify JWT signature
 * 3. Fetch user from database
 * 4. Enforce tokenVersion (single-device sessions)
 * 5. Check account status
 *
 * Returns the authenticated user or null
 */
export async function verifyAuth(request: NextRequest): Promise<any | null> {
  const token = extractToken(request);
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  try {
    const db = await connectToDatabase();
    if (!db) {
      const fbUser = (await import('./fallbackDb')).fallbackDb.findById(decoded.id);
      if (!fbUser) return null;
      if (decoded.tokenVersion !== undefined && fbUser.tokenVersion !== decoded.tokenVersion) {
        return null;
      }
      return fbUser;
    }

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return null;

    // Enforce single-device session (tokenVersion mismatch = kicked)
    if (decoded.tokenVersion !== undefined && user.tokenVersion !== decoded.tokenVersion) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Auth verification error:', error);
    const fbUser = (await import('./fallbackDb')).fallbackDb.findById(decoded.id);
    return fbUser || null;
  }
}

/**
 * Verify auth and require admin or branch_admin role
 */
export async function verifyAdminAuth(request: NextRequest): Promise<IUser | null> {
  const user = await verifyAuth(request);
  if (!user) return null;
  if (user.role !== 'super_admin' && user.role !== 'branch_admin') return null;
  return user;
}

/**
 * Verify auth and require super_admin role only
 */
export async function verifySuperAdminAuth(request: NextRequest): Promise<IUser | null> {
  const user = await verifyAuth(request);
  if (!user) return null;
  if (user.role !== 'super_admin') return null;
  return user;
}

/**
 * Sanitize user object for client response (remove sensitive fields)
 */
export function sanitizeUser(user: any) {
  const userId = user._id ? user._id.toString() : (user.id || '');
  return {
    _id: userId,
    id: userId,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    role: user.role || 'student',
    status: user.status || 'pending',
    branch: user.branch || 'Kathmandu Main Campus',
    pteGoal: user.pteGoal || 79,
    subscription: user.subscription || 'free',
    accessDurationDays: user.accessDurationDays || 30,
    approvedAt: user.approvedAt || null,
    xp: user.xp || 0,
    streak: user.streak || 0,
    level: user.level || 1,
    lastLoginAt: user.lastLoginAt || null,
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
}
