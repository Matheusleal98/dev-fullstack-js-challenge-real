import "./style.css";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="main-nav">
            <header>
                Módulo Acadêmico
            </header>
            <ul className="nav-links">
                <Link to="/" className="nav-item">
                    <li>Alunos</li>
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;