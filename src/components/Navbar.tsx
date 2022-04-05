import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { useEffect } from 'react'
import '../css/Navbar.css'

export const Navbar: React.FC = () => {

    const { i18n, t } = useTranslation(["home"]);

    const handleLanguageChange = (e: any) => {
        i18n.changeLanguage(e.target.value);
    }

    useEffect(() => {
        if (localStorage.getItem("i18nextLng")!.length > 2) {
            i18next.changeLanguage("en");
        }
    }, [])

    return (
        <div className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <NavLink
                        to='/'
                        className='navbar-items'
                    >
                        {t("info")}
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink
                        to='/arraycp'
                        className='navbar-items'
                    >
                        {t("arraytesting")}
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink
                        to='/yupregister'
                        className='navbar-items'
                    >
                        {t("yupregister")}
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink
                        to='/formikregister'
                        className='navbar-items'
                    >
                        {t("formikregister")}
                    </NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink
                        to='/muitable'
                        className='navbar-items'
                    >
                        {t("muitable")}
                    </NavLink>
                </li>
            </ul>
            <ul className='navbar-item'>
                <li className='navbar-item'>
                    <select
                        className='nav navbar-nav navbar-right border-0'
                        value={localStorage.getItem("i18nextLng")!}
                        onChange={handleLanguageChange}
                    >
                        <option value='vn'>Vietnamese</option>
                        <option value='en'>English</option>
                    </select>
                </li>
            </ul>
        </div>
    )
}