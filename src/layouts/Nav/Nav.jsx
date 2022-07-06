import "./Nav.css"
import { Line } from "layouts";

const Nav = (props) => {
    return (
        <nav className="nav">
            {props.children}
        </nav>
    );
}

export default Nav;