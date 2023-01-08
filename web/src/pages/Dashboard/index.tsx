import { trpc } from '../../utils/trpc';

function Dashboard() {
  const value = trpc.isAuthenticate.useQuery();

  const client = trpc.useContext();

  function testAccess() {
    client.isAuthenticate.refetch();
    console.log(value);
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {value.data ? <p>Autenticado</p> : <p>Sem autenticação</p>}
        <button onClick={() => testAccess()}>Testar acesso</button>
      </div>
    </div>
  );
}

export { Dashboard };
