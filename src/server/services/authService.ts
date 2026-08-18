import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { connectDB } from '../db/mongodb';
import { fallbackDb } from '../db/fallbackDb';
import User, { IUser } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'pte-master-ai-production-jwt-secret-2026-x9k4m7qz';

export interface TokenPayload {
  id: string;
  role: string;
  tokenVersion?: number;
}

export const authService = {
  generateToken(user: { _id?: any; id?: string; role: string; tokenVersion?: number }): string {
    const id = user._id ? user._id.toString() : user.id || '';
    return jwt.sign(
      {
        id,
        role: user.role,
        tokenVersion: user.tokenVersion || 0,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
  },

  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  },

  async authenticateUser(email: string, pass: string) {
    const cleanEmail = email.toLowerCase().trim();
    const db = await connectDB();

    if (db) {
      const user = await User.findOne({ email: cleanEmail });
      if (user) {
        const isMatch = await user.comparePassword(pass);
        if (isMatch) {
          // Increment tokenVersion for single-device session enforcement
          user.tokenVersion = (user.tokenVersion || 0) + 1;
          user.lastLoginAt = new Date();
          await user.save();

          const token = authService.generateToken(user);
          return { user, token };
        }
      }
    }

    // Fallback store authentication
    const fbUser = fallbackDb.findByEmail(cleanEmail);
    if (fbUser) {
      const isMatch = await fallbackDb.comparePassword(pass, fbUser.password);
      if (isMatch) {
        fbUser.tokenVersion = (fbUser.tokenVersion || 0) + 1;
        fbUser.lastLoginAt = new Date().toISOString();
        fallbackDb.updateUser(fbUser.id, fbUser);

        const token = fallbackDb.generateToken(fbUser);
        return { user: fbUser, token };
      }
    }

    return null;
  },

  async findUserById(userId: string) {
    const db = await connectDB();
    if (db) {
      try {
        const user = await User.findById(userId);
        if (user) return user;
      } catch (e) {}
    }
    return fallbackDb.findById(userId);
  }
};

export default authService;
