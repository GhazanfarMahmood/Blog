import type { Role } from "./roles";
import { permissions } from "../lib/permissions";

type PermissionUser = {
    role : Role;
    isWriter?: boolean;
};

export function can(
    user: PermissionUser,
    permission : keyof typeof permissions
) {
    if(user.role === "super-admin") {
        return true;
    }

    if(
        (permission === "post" || permission === "categories") &&
        (user.role === "admin" || user.role === "editor")
    ) {
        return user.isWriter === true;
    }
    
    return permissions[permission].includes(user.role as never);
}