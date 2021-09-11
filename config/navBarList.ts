import { NavBarLists } from "../types/nav-bar-lists";

import dashboardIcon from "../assets/images/nav-bar/dashboard.svg";
import dashboardActiveIcon from "../assets/images/nav-bar/dashboard-active.svg";
import propertiesIcon from "../assets/images/nav-bar/properties.svg";
import propertiesActiveIcon from "../assets/images/nav-bar/properties-active.svg";
import settingsIcon from "../assets/images/nav-bar/settings.svg";
import settingsActiveIcon from "../assets/images/nav-bar/settings-active.svg";

const dashboard: NavBarLists = {
	id: "dashboard",
	href: "/dashboard",
	title: "Dashboard",
	img: dashboardIcon,
	activeImg: dashboardActiveIcon,
};

const myProperties: NavBarLists = {
	id: "myProperties",
	href: "/properties",
	title: "My Properties",
	img: propertiesIcon,
	activeImg: propertiesActiveIcon,
};

const settings: NavBarLists = {
	id: "settings",
	href: "/settings",
	title: "Account Settings",
	img: settingsIcon,
	activeImg: settingsActiveIcon,
};

const agencySettings: NavBarLists = {
	id: "agency-settings",
	href: "/agency-settings",
	title: "Agency Settings",
	img: settingsIcon,
	activeImg: settingsActiveIcon,
};

const competitiveReport: NavBarLists = {
	id: "competitive-report",
	href: "#",
	title: "Competitive Report",
	img: settingsIcon,
	activeImg: settingsActiveIcon,
};

const sellerNavBarList = [dashboard, myProperties, settings];
const agencyNavBarList = [
	myProperties,
	competitiveReport,
	settings,
	agencySettings,
];

export { agencyNavBarList, sellerNavBarList };
