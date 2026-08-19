import { permission } from "process";
import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url : "/",
        permission: "dashboard",
        items: [],
      },
      {
        title : "Blogs",
        icon : Icons.PostIcon,
        url : "/blog",
        permission : "blogs",
        items: []
      },
      {
        title : "Post",
        icon : Icons.PostIcon,
        url : "/post",
        permission: "post",
        items : [],
      },
      {
        title : "Categories",
        icon : Icons.CategoryIcon,
        url : "/categories",
        permission: "categories",
        items : [],
      },
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        permission: "calendar",
        items: [],
      },
      {
        title: "Tag",
        url: "/tag",
        icon: Icons.TagIcon,
        permission: "tag",
        items: [],
      },
      {
        title : "Media",
        url : "/media",
        icon : Icons.MediaIcon,
        permission: "media",
        items : [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        permission: "profile",
        items: [],
      },
      {
        title : "Comments",
        url : "/comment",
        icon : Icons.CommentIcon,
        permission: "comments",
        items : [],
      },
      {
        title : "Users",
        url : "/user",
        icon : Icons.User,
        permission: "users",
        items : [],
      },
      {
        title : "Newsletter",
        url : "/newsletter",
        icon : Icons.EnvelopeIcon,
        permission: "newsletter",
        items : [],
      },
      {
        title : "Analytic",
        url : "/analytic",
        icon : Icons.AnalyticIcon,
        permission: "analytic",
        items : [],
      },
      {
        writers : "Writers",
        url : "/writer",
        icon : Icons.ToolIcon,
        permission : "writers",
        items : [],
      },
      {
        title : "Settings",
        url : "/settings",
        icon : Icons.SettingIcons,
        permission: "settings",
        items : [],
      },
      {
        title: "Appearance",
        url : "/appearance",
        icon : Icons.AppearanceIcon,
        permission: "appearance",
        items : [],
      },
      {
        title: "Tools",
        url : "/tool",
        icon : Icons.ToolIcon,
        permission: "tools",
        items : [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        permission: "forms",
        items: [
          {
            title: "Form Elements",
            url: "/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Icons.Table,
        permission: "tables",
        items: [
          {
            title: "Tables",
            url: "/tables",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        permission: "charts",
        items: [
          {
            title: "Basic Chart",
            url: "/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        permission: "ui_elements",
        items: [
          {
            title: "Alerts",
            url: "/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/ui-elements/buttons",
          },
        ],
      },
    ],
  },
];
