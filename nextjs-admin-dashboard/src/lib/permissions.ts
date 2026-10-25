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

    calendar : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR
    ],

    users : [
        ROLES.SUPER_ADMIN,
    ],

    analytic : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER
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

    media : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
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

    appearance : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER
    ],

    tools: [
        ROLES.SUPER_ADMIN
    ],

    forms : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER
    ],

    tables : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER,
    ],

    pages : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER,
    ],

    charts : [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.EDITOR,
        ROLES.VIEWER,
    ],

    ui_elements : [
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
} satisfies Record<string, readonly Role[]>;