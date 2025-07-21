import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/login', { email, senha })
      .then(response => {
        alert('Login feito com sucesso!');
        console.log(response.data);
      })
      .catch(error => {
        alert('Erro no login');
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
