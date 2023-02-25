import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import img from '../../assets/outer_space.png';
import { useStyles } from './styles';

function ResourceNotImplemented() {
  const classes = useStyles();
  const theme = useTheme();

  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));

  console.log(isDownMd);

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
      >
        <img src={img} alt='Foguete' className={classes.image} />
        <Grid>
          <Typography>
            <strong>Status do erro:</strong> 404
          </Typography>
          <Typography paragraph>
            <strong>Mensagem: </strong> Rota não encontrada.
          </Typography>
          <Button>Voltar ao Início</Button>
        </Grid>
      </Box>
    </Grid>
  );
}

export { ResourceNotImplemented };
