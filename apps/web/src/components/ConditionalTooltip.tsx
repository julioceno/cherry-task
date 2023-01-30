import { Tooltip, TooltipProps } from '@mui/material';

interface Props extends TooltipProps {
  enabled: boolean;
}

function ConditionalTooltip({ enabled, children, ...rest }: Props) {
  return enabled ? <Tooltip {...rest}>{children}</Tooltip> : children;
}

export { ConditionalTooltip };
