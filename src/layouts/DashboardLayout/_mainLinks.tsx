import { NavLink, ThemeIcon } from "@mantine/core";
import {
  IconBuilding,
  IconBuildingStore,
  IconCar,
  IconCurrencyRupee,
  IconFriends,
  IconLocation,
  IconPin,
  IconUsers,
} from "@tabler/icons";
import React from "react";
import { NavLink as N, useMatch, useResolvedPath } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  return (
    <NavLink
      component={N}
      to={to}
      label={label}
      icon={
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
      }
      active={match ? true : false}
    ></NavLink>
  );
}

const data = [
  {
    icon: <IconBuildingStore size={16} />,
    color: "blue",
    label: "Products",
    to: "/products",
  },
  {
    icon: <IconCar size={16} />,
    color: "violet",
    label: "Vehicles",
    to: "/vehicles",
  },
  {
    icon: <IconUsers size={16} />,
    color: "teal",
    label: "Employees",
    to: "/employees",
  },
  {
    icon: <IconLocation size={16} />,
    color: "grape",
    label: "Locations",
    to: "/locations",
  },
  {
    icon: <IconBuilding size={16} />,
    color: "blue",
    label: "Warehouses",
    to: "/warehouses",
  },
  {
    icon: <IconFriends size={16} />,
    color: "violet",
    label: "People",
    to: "/people",
  },
  {
    icon: <IconCurrencyRupee size={16} />,
    color: "teal",
    label: "Sales",
    to: "/sales",
  },
  {
    icon: <IconPin size={16} />,
    color: "grape",
    label: "Trips",
    to: "/trips",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
