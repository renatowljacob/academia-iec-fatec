import { useEffect, useState } from 'react';
import axios from 'axios';

const Administrativo = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <ul>
        {usuarios.map(user => (
          <li key={user.id}>{user.nome} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Administrativo;
