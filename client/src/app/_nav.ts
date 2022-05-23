import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "home",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Components",
  },
  {
    name: "Head Of Account",
    url: "hoa",
    icon: "icon-cursor",
  },
  {
    name: "Employee",
    url: "button",
    icon: "icon-cursor",
    children: [
      {
        name: "Register",
        url: "register",
        icon: "icon-cursor",
      },
      {
        name: "View",
        url: "view",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Type",
    url: "button",
    icon: "icon-cursor",
    children: [
      {
        name: "Add type",
        url: "addtype",
        icon: "icon-cursor",
      },
      {
        name: "View Type",
        url: "viewtype",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Party",
    url: "button",
    icon: "icon-cursor",
    children: [
      {
        name: "Add party",
        url: "addparty",
        icon: "icon-cursor",
      },
      {
        name: "View Party",
        url: "viewparty",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Change password",
    url: "changepassword",
    icon: "icon-cursor"
  },
];

export const navItems1: INavData[] = [
  {
    name: "Dashboard",
    url: "home",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Components",
  },
  {
    name: "Receipts",
    url: "receipts",
    icon: "icon-cursor"
  },
  {
    name: "Verification",
    url: "verify",
    icon: "icon-cursor"
  },
  {
    name: "Receipt Status",
    url: "/verify",
    icon: "icon-cursor",
    children: [
      {
        name: "Approved",
        url: "approval",
        icon: "icon-cursor",
      },
      {
        name: "Pending",
        url: "pending",
        icon: "icon-cursor",
      },
      {
        name: "Rejected",
        url: "reject",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Filter",
    url: "filter",
    icon: "icon-cursor"
  },
  {
    name: "Reprint",
    url: "reprint",
    icon: "icon-cursor"
  },
  {
    name: "cancellation",
    url: "cancel",
    icon: "icon-cursor"
  },

  {
    name: "Reports",
    url: "report",
    icon: "icon-cursor",
  },
  {
    name: "Change password",
    url: "changepassword",
    icon: "icon-cursor"
  },
];


export const navItems2: INavData[] = [
  {
    name: "Dashboard",
    url: "home",
    icon: "icon-speedometer",
  },
  {
    title: true,
    name: "Components",
  },
  {
    name: "Receipts",
    url: "receipts",
    icon: "icon-cursor"
  },
  {
    name: "Receipt Status",
    url: "/verify",
    icon: "icon-cursor",
    children: [
      {
        name: "Approved",
        url: "approval",
        icon: "icon-cursor",
      },
      {
        name: "Pending",
        url: "pending",
        icon: "icon-cursor",
      },
      {
        name: "Rejected",
        url: "reject",
        icon: "icon-cursor",
      },
    ],
  },
  {
    name: "Filter",
    url: "filter",
    icon: "icon-cursor"
  },
  {
    name: "Reprint",
    url: "reprint",
    icon: "icon-cursor"
  },
  {
    name: "cancellation",
    url: "cancel",
    icon: "icon-cursor"
  },

  {
    name: "Reports",
    url: "report",
    icon: "icon-cursor",
  },
  {
    name: "Change password",
    url: "changepassword",
    icon: "icon-cursor"
  },
];

