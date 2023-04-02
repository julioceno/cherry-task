import { HandleErrorPage } from '../../components/HandleErrorPage';

function ResourceNotImplemented() {
  return <HandleErrorPage status={404} error='Rota não encontrada.' />;
}

export { ResourceNotImplemented };
