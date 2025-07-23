// src/pages/administrativo/Administrativo.jsx

import { Outlet, Link, useNavigate } from "react-router-dom";
import style from "./administrativo.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faTableList, faUsersLine, faDumbbell, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { isAdmin, logout } from "../../services/authService";
import { useEffect } from "react";

const Administrativo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin()) {
      navigate("/");
    }
  }, [])

  return (
    <section className={style.view}>
      <aside className={style.sidebar}>
        <ul>
          <li>Adminisitrativo</li>
          <li><Link to="cadastrar-cliente"><FontAwesomeIcon icon={faUsersLine} />Cadastrar Cliente</Link></li>
          <li><Link to="cadastrar-treino"><FontAwesomeIcon icon={faDumbbell} />Cadastrar Treino</Link></li>
          <li><Link to="controle-presenca"><FontAwesomeIcon icon={faTableList} />Controle de Presença</Link></li>
          <li><Link to="gestao-planos"><FontAwesomeIcon icon={faToolbox} />Gestão de Planos</Link></li>
          <li><Link to="/" onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link></li>
        </ul>
      </aside>
      <main className={style.content}>
        <Outlet />
      </main>
    </section>
  );
};

export default Administrativo;
