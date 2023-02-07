import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../../../components';

export interface CardProps {
  title: string;
  type: string;
  description: string;
}

function Card({ title, type, description }: CardProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  const height = 60;
  const width = 80;

  function handleNavigation(pathname: string) {
    navigate(pathname);
  }

  return (
    <Box
      sx={{
        background: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          background: theme.palette.primary.main,
          cursor: 'pointer',
        },
      }}
      margin={2}
      p={2}
      height={theme.spacing(height)}
      width={theme.spacing(width)}
      borderRadius={theme.spacing(width / width)}
      component='span'
      onClick={() =>
        handleNavigation('/task/5130ab09-f763-4c95-8065-fcc20581adae')
      }
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
