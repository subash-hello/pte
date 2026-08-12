export type UserRole = "student" | "branch_admin" | "super_admin";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  branchName?: string;
  targetScore?: number;
  xp?: number;
  level?: number;
  avatar?: string;
}
