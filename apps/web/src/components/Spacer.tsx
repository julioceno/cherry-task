import { Box, BoxProps, useTheme } from '@mui/material';

interface ISpacerProps extends BoxProps {
  x?: number;
  y?: number;
  basis?: number;
}

function Spacer({ x, y, basis, ...rest }: ISpacerProps) {
  const theme = useTheme();

  return (
    <Box
      width={x ? theme.spacing(x) : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
      flexGrow={0}
      flexShrink={0}
      {...rest}
    />
  );
}

export { Spacer };
