import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../css/Notfound.css'

export const Notfound: React.FC = () => {
  const { t } = useTranslation(["body"])

  return (
    <div className='notfound'>
      <h1>{t("body:notfound.notfoundname")}</h1>
      <p>{t("body:notfound.notfoundalert1")}</p>
      <span>
        <Link to='/' style={{ fontWeight: 'bold' }}>{t("body:notfound.notfoundalert2")}</Link>
      </span>
    </div>
  )
}
