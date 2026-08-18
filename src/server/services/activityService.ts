export interface ActiveSession {
  userId: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  currentTask: string;
  lastActive: Date;
  ipAddress?: string;
  device?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var globalActiveSessions: Map<string, ActiveSession> | undefined;
}

if (!global.globalActiveSessions) {
  global.globalActiveSessions = new Map<string, ActiveSession>();
}

export const activityService = {
  recordHeartbeat(user: {
    userId?: string;
    id?: string;
    name: string;
    email: string;
    role: string;
    branch?: string;
    currentTask?: string;
    ip?: string;
    device?: string;
  }) {
    const sessions = global.globalActiveSessions!;
    const uid = user.userId || user.id || 'anonymous';
    const sessionObj: ActiveSession = {
      userId: uid,
      name: user.name,
      email: user.email,
      role: user.role,
      branch: user.branch || 'Kathmandu Central Campus',
      currentTask: user.currentTask || 'Active Learning',
      lastActive: new Date(),
      ipAddress: user.ip || '127.0.0.1',
      device: user.device || 'Desktop Browser',
    };
    sessions.set(uid, sessionObj);
    return sessionObj;
  },

  getActiveSessions(branchFilter?: string): ActiveSession[] {
    const sessions = global.globalActiveSessions!;
    const now = Date.now();
    const activeThresholdMs = 2 * 60 * 1000;

    const results: ActiveSession[] = [];
    sessions.forEach((session, key) => {
      if (now - new Date(session.lastActive).getTime() > activeThresholdMs) {
        sessions.delete(key);
      } else {
        if (!branchFilter || session.branch.toLowerCase().includes(branchFilter.toLowerCase())) {
          results.push(session);
        }
      }
    });

    return results;
  },

  removeSession(userId: string): boolean {
    const sessions = global.globalActiveSessions!;
    if (sessions.has(userId)) {
      sessions.delete(userId);
      return true;
    }
    return false;
  }
};

export default activityService;
