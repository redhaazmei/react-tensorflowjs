import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  ActionIcon,
  NavLink,
  Anchor,
} from '@mantine/core';
import { TbSun, TbMoon } from 'react-icons/tb';
import { navlinks } from 'components/navlinks';

const useStyles = createStyles((theme) => ({
  appShell: {
    background:
      theme.colorScheme === 'light'
        ? theme.colors.gray[0]
        : theme.colors.dark[7],
    height: '100%',
  },
  header: {
    background:
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[9],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    paddingInline: theme.spacing.xl,
  },
  navbar: {
    background:
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[9],
    padding: theme.spacing.xl,
  },
  navlink: {
    fontWeight: 500,
  },
  footer: {
    background:
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[9],
    display: 'flex',
    alignItems: 'center',
    paddingInline: theme.spacing.xl,
  },
  prose: {
    maxWidth: theme.breakpoints.md,
    height: '100%',
    marginInline: 'auto',
    padding: theme.spacing.xl,
    'h1, h2, h3, h4, h5, h6, p, ul, pre': {
      paddingBottom: theme.spacing.md,
    },
    'h1, h2, h3, h4, h5, h6': {
      paddingTop: theme.spacing.md,
    },
    a: {
      color:
        theme.colorScheme === 'light'
          ? theme.colors.blue[7]
          : theme.colors.blue[5],
    },
    code: {
      fontFamily: theme.fontFamilyMonospace,
      fontSize: theme.fontSizes.sm,
    },
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const theme = useMantineTheme();
  const dark = colorScheme === 'dark';
  return (
    <AppShell
      className={classes.appShell}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={
        <Header className={classes.header} height={70}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger
              opened={isOpen}
              onClick={() => setIsOpen((o) => !o)}
              size="sm"
            />
          </MediaQuery>
          <Text
            size="xl"
            weight={800}
            variant="gradient"
            gradient={{
              from: dark ? theme.colors.indigo[4] : 'indigo',
              to: dark ? theme.colors.cyan[3] : 'cyan',
              deg: 45,
            }}
          >
            React + TensorFlow.js
          </Text>
          <ActionIcon
            variant="default"
            size="lg"
            onClick={() => toggleColorScheme()}
          >
            {dark ? <TbSun /> : <TbMoon />}
          </ActionIcon>
        </Header>
      }
      navbar={
        <Navbar
          className={classes.navbar}
          hiddenBreakpoint="sm"
          hidden={!isOpen}
          width={{ sm: 200, lg: 300 }}
        >
          {navlinks.map((link) => (
            <NavLink
              className={classes.navlink}
              key={link.label}
              component={Link}
              to={link.link}
              label={link.label}
              icon={link.icon}
              active={location.pathname === link.link}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </Navbar>
      }
      footer={
        <Footer className={classes.footer} height={60}>
          <Text size="sm">
            by{' '}
            <Anchor href="https://redha.dev" target="_blank">
              Redha Azmei
            </Anchor>
          </Text>
        </Footer>
      }
    >
      <div className={classes.prose}>{children}</div>
    </AppShell>
  );
}
