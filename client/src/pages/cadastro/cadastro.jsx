import { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3000/usuarios', { nome, email })
      .then(res => {
        alert('Usuário cadastrado com sucesso!');
        console.log(res.data);
      })
      .catch(err => {
        alert('Erro ao cadastrar usuário');
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleCadastro}>
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Cadastro;
