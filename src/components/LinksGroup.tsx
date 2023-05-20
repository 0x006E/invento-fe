import { NavLink, UnstyledButton, createStyles, rem } from "@mantine/core";
import { useState } from "react";
import { NavLink as N } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(15),
    marginLeft: rem(15),
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  active: boolean;
}
export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  active,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <N className={classes.link} to={link.link} key={link.label}>
      {link.label}
    </N>
  ));
  return (
    <>
      <NavLink
        component={UnstyledButton}
        onChange={(e) => setOpened(e)}
        label={label}
        active={active}
        icon={<Icon />}
        opened={opened}
      >
        {hasLinks ? items : null}
      </NavLink>
    </>
  );
}
declare module "@mantine/core" {
  interface NavLinkProps {
    onClick?: () => void;
  }
}
