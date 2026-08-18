// In-memory active session tracker for real-time admin monitoring

export interface ActiveSession {
  sessionId: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  branch: string;
  currentTask: string;
  activeSince: string;
  lastHeartbeat: number;
  ip: string;
  device: string;
}

class SessionTracker {
  private sessions: Map<string, ActiveSession> = new Map();

  constructor() {
    // Seed initial active sessions for demonstration
    this.recordHeartbeat({
      userId: 'student_01',
      name: 'Subash Bhandari',
      email: 'subash.bhandari@pteai.com',
      role: 'student',
      branch: 'Kathmandu Central Campus',
      currentTask: 'Speaking: Read Aloud [RA-104]',
      ip: '103.10.28.45 (Kathmandu, NP)',
      device: 'Desktop Chrome 128 (Windows 11)',
    });

    this.recordHeartbeat({
      userId: 'student_03',
      name: 'Bikash Shrestha',
      email: 'bikash.shrestha@gmail.com',
      role: 'student',
      branch: 'Pokhara Regional Campus',
      currentTask: 'Writing: Write Essay [WE-402]',
      ip: '27.34.20.12 (Pokhara, NP)',
      device: 'MacBook Air (Safari 18)',
    });
  }

  public recordHeartbeat(data: {
    userId: string;
    name: string;
    email: string;
    role: string;
    branch: string;
    currentTask: string;
    ip?: string;
    device?: string;
  }): ActiveSession {
    const existing = this.sessions.get(data.userId);
    const now = Date.now();
    const session: ActiveSession = {
      sessionId: existing?.sessionId || `sess_${Math.random().toString(36).substring(2, 9)}`,
      userId: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
      branch: data.branch,
      currentTask: data.currentTask || 'Dashboard Browsing',
      activeSince: existing?.activeSince || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lastHeartbeat: now,
      ip: data.ip || '103.198.9.14 (Kathmandu, NP)',
      device: data.device || 'Web Browser',
    };

    this.sessions.set(data.userId, session);
    return session;
  }

  public getActiveSessions(): ActiveSession[] {
    const threshold = Date.now() - 5 * 60 * 1000; // 5 minutes inactivity timeout
    const active: ActiveSession[] = [];
    for (const [key, session] of this.sessions.entries()) {
      if (session.lastHeartbeat >= threshold) {
        active.push(session);
      }
    }
    return active;
  }

  public removeSession(userIdOrSessionId: string): boolean {
    for (const [key, session] of this.sessions.entries()) {
      if (session.userId === userIdOrSessionId || session.sessionId === userIdOrSessionId) {
        this.sessions.delete(key);
        return true;
      }
    }
    return false;
  }
}

export const sessionTracker = new SessionTracker();
