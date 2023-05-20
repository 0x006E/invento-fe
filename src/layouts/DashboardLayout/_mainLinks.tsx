import { NavLink, ThemeIcon } from "@mantine/core";
import {
  IconArrowUp,
  IconBuilding,
  IconBuildingStore,
  IconCar,
  IconCurrencyRupee,
  IconFriends,
  IconLocation,
  IconPin,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";
import { NavLink as N, useMatch, useResolvedPath } from "react-router-dom";
import { LinksGroup } from "../../components/LinksGroup";

interface MainLinkProps {
  icon: React.FC<any>;
  color: string;
  label: string;
  to: string;
  links?: { label: string; link: string }[];
  initiallyOpened?: boolean;
}

function MainLink({
  icon: Icon,
  color,
  label,
  to,
  links,
  initiallyOpened,
}: MainLinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  let ColoredIcon: React.FC<any> = () => (
    <ThemeIcon color={color} variant="light">
      <Icon size={16} />
    </ThemeIcon>
  );

  if (!links || links.length == 0)
    return (
      <NavLink
        component={N}
        to={to}
        label={label}
        icon={<ColoredIcon />}
        active={match ? true : false}
      ></NavLink>
    );

  return (
    <LinksGroup
      icon={ColoredIcon}
      label={label}
      links={links}
      key={label}
      active={match ? true : false}
      initiallyOpened={initiallyOpened}
    />
  );
}

const data = [
  {
    icon: IconBuildingStore,
    color: "blue",
    label: "Products",
    to: "/products",
  },
  {
    icon: IconCar,
    color: "violet",
    label: "Vehicles",
    to: "/vehicles",
  },
  {
    icon: IconUsers,
    color: "teal",
    label: "Employees",
    to: "/employees",
  },
  {
    icon: IconArrowUp,
    color: "violet",
    label: "Stock",
    initiallyOpened: true,
    to: "/stock",
    links: [
      { label: "Opening Stock", link: "/stock/opening" },
      { label: "Take Stock", link: "/stock/take" },
      { label: "Give Stock", link: "/stock/give" },
    ],
  },

  {
    icon: IconLocation,
    color: "grape",
    label: "Locations",
    to: "/locations",
  },
  {
    icon: IconBuilding,
    color: "blue",
    label: "Warehouses",
    to: "/warehouses",
    initiallyOpened: true,
    links: [
      { label: "Warehouses", link: "/warehouses" },
      { label: "Load In", link: "/warehouses/load-in" },
      { label: "Load Out", link: "/warehouses/load-out" },
    ],
  },
  {
    icon: IconFriends,
    color: "violet",
    label: "Customers",
    to: "/customers",
  },
  {
    icon: IconCurrencyRupee,
    color: "teal",
    label: "Sales",
    to: "/sales",
    initiallyOpened: true,
    links: [
      { label: "Sales", link: "/sales" },
      { label: "Return", link: "/sales/return" },
      { label: "Replace Defective", link: "/sales/replace-defective" },
    ],
  },
  {
    icon: IconPin,
    color: "grape",
    label: "Trips",
    to: "/trips",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
