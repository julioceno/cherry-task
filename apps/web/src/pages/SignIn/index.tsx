import { useState } from 'react';
import { trpc } from '../../utils/trpc';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [error, setError] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');

  const navigate = useNavigate();

  const authenticate = trpc.authenticate.useMutation();

  function clearFields() {
    setEmail('');
    setPassoword('');
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
      <div>
        <h1 style={{ textAlign: 'center' }}>Entrar</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            authenticate.mutate(
              {
                email,
                password,
              },
              {
                onSuccess(value) {
                  console.log(value);
                  localStorage.setItem('token', value.data.token);

                  navigate('/Dashboard');
                  clearFields();
                },
                onError(value) {
                  setError(value.message);
                },
              }
            );
          }} //julio@gmail.com
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button>Entrar</button>
          </div>
          {authenticate.isLoading && <p>Carregando...</p>}
          {error && <p>{error}</p>}

          <a href='/sign-up'>Registrar-se</a>
        </form>
      </div>
    </div>
  );
}

export { SignIn };
