import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../../../components';

export interface CardProps {
  id: string;
  title: string;
  description: string;
}

function Card({ id, title, description }: CardProps) {
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
        background: theme.palette.primary.dark, // TODO: tirar isso do jsx
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
      onClick={() => handleNavigation(`/task/${id}`)}
    >
      <Typography variant='h5' fontWeight='600'>
        {title}
      </Typography>
      <Spacer y={3} />
      <Typography
        style={{
          display: '-webkit-box', // TODO: tirar isso do jsx
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
