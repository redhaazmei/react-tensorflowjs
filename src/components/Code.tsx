import { createStyles } from '@mantine/core';
import { Prism } from '@mantine/prism';

const useStyles = createStyles((theme) => ({
  prism: {
    backgroundColor:
      theme.colorScheme === 'light'
        ? theme.colors.gray[3]
        : theme.colors.dark[9],
  },
}));

interface CodeProps {
  code: string;
}

export default function Code({ code }: CodeProps) {
  const { classes } = useStyles();
  return (
    <Prism className={classes.prism} language="tsx">
      {code}
    </Prism>
  );
}
