import type { Role } from "./roles";
import { permissions } from "../lib/permissions";

export function can(
    role : Role,
    permission: keyof typeof permissions
) {
    return permissions[permission].includes(role as never);
}