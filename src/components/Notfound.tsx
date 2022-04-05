import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../css/Notfound.css'

export const Notfound: React.FC = () => {
  const { t } = useTranslation(["body"])

  const location  = useLocation()

  const navigate = useNavigate()

  return (
    <div className='notfound'>
      <h1>{t("body:notfound.notfoundname")}</h1>
      <p>{t("body:notfound.notfoundalert1")}</p>
    
      {location.pathname !== `/` || `arraycp` || `yupregister` || `formikregister` || `muitable` ? (<button type='submit' style={{width: '50%'}} onClick={() => navigate('/')}>{t("body:notfound.notfoundalert2")}</button>) : null}
    </div>
  )
}
