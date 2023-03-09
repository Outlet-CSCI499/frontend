import { Link, NavLink } from 'react-router-dom'
import './index.scss'
import LogoO from '../../assets/images/logo-o.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => (
    <div className='nav-bar'>
        <Link className='logo' to='/'>
            <img src={LogoO} alt='logo' />
        </Link>
        <nav>
            <NavLink exact="true" activeclassname="active" to="/">
                <FontAwesomeIcon icon={faHome} color="#aaddff" />
            </NavLink>
            <NavLink exact="true" activeclassname="active" className="news-link" to="/news">
                <FontAwesomeIcon icon={faNewspaper} color="#aaddff" />
            </NavLink>
        </nav>
    </div>
)

export default Sidebar;