import logo from '../../images/sudokool_logo.png'
import './Header.scss'

const Header = () => {
    return (
        <header className="header">
            <img className="header__image" src={logo} alt="Sudokool logo" />
        </header>
    )
}

export default Header
