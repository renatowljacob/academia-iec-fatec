import style from "./cliente.module.css"

import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCalendarDays, faClock, faCreditCard, faDumbbell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { getUserData, isCliente, logout } from "../../services/authService";
import { useEffect } from "react";

const Cliente = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isCliente()) {
            navigate("/");
        }
    }, []);

    const userData = getUserData().user
    const username = userData ? `${userData.nome.substring(0, 1).toUpperCase()}${userData.nome.substring(1)}` : "Sua Conta";

    return (
        <>
            <section className={style.view}>
                <div className={style.sidebar}>
                    <ul>
                        <li>{username}</li>
                        <li><Link to="progresso"><FontAwesomeIcon icon={faBarsProgress} />Acompanhar Progresso</Link></li>
                        <li><Link to="agenda"><FontAwesomeIcon icon={faCalendarDays} />Agendar aulas</Link></li>
                        <li><Link to="horario"><FontAwesomeIcon icon={faClock} />Consulta Horário</Link></li>
                        <li><Link to="pagamento"><FontAwesomeIcon icon={faCreditCard} />Pagamentos</Link></li>
                        <li><Link to="treinos"><FontAwesomeIcon icon={faDumbbell} />Treinar</Link></li>
                        <li><Link to="/" onClick={() => logout()}><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link></li>
                    </ul>
                </div>

                <div className={style.content}>
                    <Outlet />
                </div>
            </section>
        </>
    )
}

export default Cliente;
