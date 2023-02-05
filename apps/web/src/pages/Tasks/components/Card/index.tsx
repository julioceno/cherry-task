import { Box, Typography, useTheme } from '@mui/material';
import { Spacer } from '../../../../components';

export interface CardProps {
  title: string;
  type: string;
  description: string;
}

function Card({ title, type, description }: CardProps) {
  const theme = useTheme();

  const height = 60;
  const width = 80;

  return (
    <Box
      sx={{
        background: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          background: theme.palette.primary.main,
        },
      }}
      margin={2}
      p={2}
      height={theme.spacing(height)}
      width={theme.spacing(width)}
      borderRadius={theme.spacing(width / width)}
    >
      <Box>
        <Typography variant='h5' fontWeight='600'>
          {title}
        </Typography>
        <Typography fontWeight='500'>Tipo da tarefa: {type}</Typography>
      </Box>
      <Box>
        <Spacer y={3} />
      </Box>
      <Typography
        style={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitLineClamp: Math.round(width / (height - (width - 3) / 2)),
          WebkitBoxOrient: 'vertical',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export { Card };
