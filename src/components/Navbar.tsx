import { Link } from 'react-router-dom'
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
                    <Link to='/' className='navbar-items'>{t("info")}</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/arraycp' className='navbar-items'>{t("arraytesting")}</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/yupregister' className='navbar-items'>{t("yupregister")}</Link>
                </li>
                <li className="navbar-item">
                    <Link to='/formikregister' className='navbar-items'>{t("formikregister")}</Link>
                </li>
                <li className='navbar-item'>
                    <Link to='/muitable' className='navbar-items'>{t("muitable")}</Link>
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