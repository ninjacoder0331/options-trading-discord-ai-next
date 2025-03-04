import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Open Trades",
        url: "/open-trades",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Closed Trades",
        url: "/closed-trades",
        icon: Icons.Table,
        items: [],
      },
      {
        title: "Statistics",
        url: "/statistics",
        icon: Icons.PieChart,
        items: [],
      },
      {
        title: "AI Setup",
        url: "/ai-setup",
        icon: Icons.FourCircle,
        items: [],
      },
      {
        title: "Discord Setup",
        url: "/discord-setup",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Traders Setup",
        url: "/traders-setup",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Brokerage Setup",
        url: "/brokerage-setup",
        icon: Icons.Alphabet,
        items: [],
      },
      {
        title: "Logout",
        url: "/logout",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];
