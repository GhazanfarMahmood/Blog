import { ROLES, type Role } from "@/constants/roles";

export const permissions = {
    dashboard : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER
    ],

    post : [
        ROLES.SUPER_ADMIN
    ],

    users : [
        ROLES.SUPER_ADMIN,
    ],

    categories: [
        ROLES.SUPER_ADMIN,
    ],

    writers: [
        ROLES.SUPER_ADMIN,
    ],

    comments: [
        ROLES.SUPER_ADMIN,
    ],

    tag : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ],

    profile : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER
    ], 

    pages : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER,
    ],

    newsletter : [
        ROLES.SUPER_ADMIN,
    ],

    settings: [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN, 
        ROLES.EDITOR,
        ROLES.VIEWER
    ],

    contact : [
        ROLES.SUPER_ADMIN
    ],

    about : [
        ROLES.SUPER_ADMIN
    ],

    home : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
    ],
    
} satisfies Record<string, readonly Role[]>;