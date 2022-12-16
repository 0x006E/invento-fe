import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import {
  IconAlertCircle,
  IconDatabase,
  IconGitPullRequest,
  IconMessages,
} from "@tabler/icons";
import React from "react";
import { Link } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  to: string;
}

function MainLink({ icon, color, label, to }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
      component={Link}
      to={to}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconGitPullRequest size={16} />,
    color: "blue",
    label: "Products",
    to: "/products",
  },
  {
    icon: <IconAlertCircle size={16} />,
    color: "teal",
    label: "Customers",
    to: "/customers",
  },
  {
    icon: <IconMessages size={16} />,
    color: "violet",
    label: "Discussions",
    to: "/discussions",
  },
  {
    icon: <IconDatabase size={16} />,
    color: "grape",
    label: "Databases",
    to: "/databases",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
