import { useState } from 'react';
import { trpc } from '../../utils/trpc';

function SignIn() {
  const mutation = trpc.createUser.useMutation();

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

            mutation.mutate({
              name: ' Júlio',
              email: 'julio@gmail.com',
              password: 'password',
              passwordConfirm: 'password',
            });

            console.log(mutation);
          }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div>
            <input type='email' placeholder='Email' />
          </div>
          <div>
            <input type='password' placeholder='Senha' />
          </div>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button>Entrar</button>
          </div>
          <a href='/sign-up'>Registrar-se</a>
        </form>
      </div>
    </div>
  );
}

export { SignIn };
