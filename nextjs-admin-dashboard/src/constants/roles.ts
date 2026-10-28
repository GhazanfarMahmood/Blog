export const ROLES = {
    SUPER_ADMIN : "super-admin",
    ADMIN : "admin",
    EDITOR : "editor",
    VIEWER : "viewer",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
