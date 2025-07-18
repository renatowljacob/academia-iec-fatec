import style from "./cliente.module.css"

import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarsProgress, faCalendarDays, faClock, faCreditCard, faDumbbell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Cliente = () => {
    return (
        <>
            <section className={style.view}>
                <div className={style.sidebar}>
                    <ul>
                        <li>Nome do Usuário</li>
                        <li><Link to="progresso"><FontAwesomeIcon icon={faBarsProgress} />Acompanhar Progresso</Link></li>
                        <li><Link to="agenda"><FontAwesomeIcon icon={faCalendarDays} />Agendar aulas</Link></li>
                        <li><Link to="horario"><FontAwesomeIcon icon={faClock} />Consulta Horário</Link></li>
                        <li><Link to="pagamento"><FontAwesomeIcon icon={faCreditCard} />Pagamentos</Link></li>
                        <li><Link to="treinos"><FontAwesomeIcon icon={faDumbbell} />Treinar</Link></li>
                        <li><Link to="/"><FontAwesomeIcon icon={faRightFromBracket} />Logout</Link></li>
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