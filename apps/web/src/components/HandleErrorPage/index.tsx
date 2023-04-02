import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import img from '../../assets/outer_space.png';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';

export function HandleErrorPage({
  status = 500,
  error,
}: {
  status?: number;
  error: string;
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const theme = useTheme();

  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Grid
      container
      className={classes.container}
      justifyContent='center'
      alignItems='center'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        maxWidth='70%'
        flexDirection={isDownMd ? 'column' : 'row'}
        p={10}
      >
        <img src={img} alt='Foguete' className={classes.image} />
        <Grid>
          <Typography>
            <strong>Status do erro:</strong> {status}
          </Typography>
          <Typography paragraph>
            <strong>Mensagem: </strong> {error}
          </Typography>

          <Button onClick={() => navigate('/')}>Voltar ao Início</Button>
        </Grid>
      </Box>
    </Grid>
  );
}
