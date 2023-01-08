import { useState } from 'react';
import { trpc } from '../../utils/trpc';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassoword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const createUser = trpc.createUser.useMutation();

  function clearFields() {
    setName('');
    setEmail('');
    setPassoword('');
    setPasswordConfirm('');
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
        <h1 style={{ textAlign: 'center' }}>Criando conta</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            createUser.mutate({
              name,
              email,
              password,
              passwordConfirm,
            });

            console.log(createUser.isSuccess);
            console.log(createUser.error);
            clearFields();
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <input
              type='text'
              placeholder='Nome'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <input
              type='email'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Senha'
              onChange={(e) => setPassoword(e.target.value)}
              value={password}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Confirme sua senha'
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button>Registrar-se</button>
          </div>
          <a href='/sign-in'>Entrar</a>
        </form>
      </div>
    </div>
  );
}

export { SignUp };
