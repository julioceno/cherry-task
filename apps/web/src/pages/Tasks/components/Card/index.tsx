import { Box, Button, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Spacer } from '../../../../components';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { snackbarStore, trpc } from '../../../../utils';

export interface CardProps {
  id: string;
  title: string;
  description: string;
}

function Card({ id, title, description }: CardProps) {
  const [hoverCard, setHoverCard] = useState(false);
  const [hoverExclude, setHoverExclude] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();

  const deleteTask = trpc.privateRouter.tasksRouter.delete.useMutation();
  const utils = trpc.useContext();

  function handleNavigation(pathname: string) {
    if (!hoverExclude) {
      navigate(pathname);
    }
  }

  const toggleHover = () => {
    setHoverCard(!hoverCard);
  };

  const toggleHoverExclude = () => {
    setHoverExclude(!hoverExclude);
  };

  const handleDelete = (id: string) => {
    deleteTask.mutateAsync(id, {
      onSuccess() {
        console.log('deu bom');
        /* utils.privateRouter.tasksRouter.findAll.refetch(); */
      },
      onError(err) {
        snackbarStore.setMessage('Ocorreu um erro ao tentar deletar a tarefa.');
      },
    });
  };

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
          cursor: 'pointer',
        },
        height: theme.spacing(height),
        width: theme.spacing(width),
        padding: 2,
        margin: 2,
        borderRadius: theme.spacing(width / width),
      }}
      component='span'
      onClick={() => handleNavigation(`/task/${id}`)}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <Box display='flex' justifyContent='space-between'>
        <Typography
          variant='h5'
          fontWeight='600'
          style={{
            display: '-webkit-box', // TODO: tirar isso do jsx
            overflow: 'hidden',
            WebkitLineClamp: Math.round(width / (height - (width - 3) / 2)),
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>
        {hoverCard && (
          <div
            onMouseEnter={toggleHoverExclude}
            onMouseLeave={toggleHoverExclude}
          >
            <ClearIcon
              onClick={() => handleDelete(id)}
              sx={{ color: '#F45050' }}
            />
          </div>
        )}
      </Box>
      <Spacer y={3} />
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
