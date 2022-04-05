import { useState, useRef } from 'react'
import * as Yup from 'yup'
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core'
import { Alert, Snackbar, InputAdornment, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import '../css/Register.css'

interface IInputs {
  fullname: string,
  username: string,
  email: string,
  password: string,
  passwordconfirm: string,
  gender?: string,
  role?: string,
  checkbox: boolean,
  showpassword: boolean
}

export const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [alertSubmit, setAlertSubmit] = useState(false)

  const [alertReset, setAlertReset] = useState(false)

  const inputFocus = useRef<HTMLInputElement>(null)

  const { t } = useTranslation(["body"])

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .required(`${t("body:error.fullbamerequired")}`)
      .max(70, `${t("body:error.fullnamerequiredmax")}`),
    username: Yup.string()
      .required(`${t("body:error.usernamerequired")}`)
      .min(8, `${t("body:error.usernamerequiredmin")}`)
      .max(20, `${t("body:error.usernamerequiredmax")}`),
    email: Yup.string()
      .required(`${t("body:error.emailrequired")}`)
      .email(`${t("body:error.emailrequiredvalid")}`),
    password: Yup.string()
      .required(`${t("body:error.passwordrequired")}`)
      .min(8, `${t("body:error.passwordrequiredmin")}`)
      .max(15, `${t("body:error.passwordrequiredmax")}`)
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        `${t("body:error.passwordrequiredmatch")}`
      ),
    passwordconfirm: Yup.string()
      .required(`${t("body:error.passwordconfirmrequired")}`)
      .oneOf([Yup.ref('password'), null], `${t("body:error.passwordconfirmrequiredmatch")}`),
    checkbox: Yup.bool()
      .required(`${t("body:error.checkboxconfirm")}`)
      .oneOf([true], `${t("body:error.checkboxconfirm")}`),
  })

  const { handleSubmit, reset, control, formState: { errors } } = useForm<IInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: "",
      checkbox: false,
      showpassword: false
    }
  })

  const handleSubmitData = (data: IInputs) => {
    console.log(data)
    setAlertSubmit(true)
    reset()
    inputFocus.current!.focus()
    window.scrollTo(0, 0)
  }

  const handleReset = () => {
    reset()
    setAlertReset(true)
    inputFocus.current!.focus()
  }

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertSubmit(false)
    setAlertReset(false)
  }

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  return (
    <div className='register'>
      <h1>{t("yupregistername")}</h1>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Controller
          name='fullname'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t("body:formelement.inputname")}
              variant='outlined'
              className='muifield'
              autoFocus
              inputRef={inputFocus}
              error={!!errors.fullname}
              helperText={errors.fullname ? errors.fullname.message : ""}
            />
          )}
        />
        <div className='gender-role'>
          <InputLabel className='label-no-mui'>{t("body:formelement.inputgender")}</InputLabel>
          <Controller
            name='gender'
            defaultValue=''
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                variant='outlined'
              >
                <MenuItem value={"male"}>{t("body:formelement.inputgendermale")}</MenuItem>
                <MenuItem value={"female"}>{t("body:formelement.inputgenderfemale")}</MenuItem>
                <MenuItem value={"other"}>{t("body:formelement.inputgenderother")}</MenuItem>
              </Select>
            )}
          />

          <InputLabel className='label-no-mui'>{t("body:formelement.inputrole")}</InputLabel>
          <Controller
            render={({ field }) => (
              <RadioGroup aria-label='role' {...field} row>
                <FormControlLabel
                  value="student"
                  control={<Radio />}
                  label={t("body:formelement.inputrolestudent")}
                />
                <FormControlLabel
                  value="employee"
                  control={<Radio />}
                  label={t("body:formelement.inputroleemployee")}
                />
                <FormControlLabel
                  value="officer"
                  control={<Radio />}
                  label={t("body:formelement.inputroleofficer")}
                />
                <FormControlLabel
                  value="freelancer"
                  control={<Radio />}
                  label={t("body:formelement.inputrolefreelancer")}
                />
              </RadioGroup>
            )}
            name='role'
            control={control}
          />
        </div>
        <label className='label-no-mui'></label>

        <Controller
          name='username'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t("body:formelement.inputusername")}
              variant='outlined'
              className='muifield'
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ""}
            />
          )}
        />
        <label className='label-no-mui'></label>

        <Controller
          name='email'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t("body:formelement.inputemail")}
              variant='outlined'
              className='muifield'
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />
          )}
        />
        <label className='label-no-mui'></label>

        <Controller
          name='password'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t("body:formelement.inputpassword")}
              variant='outlined'
              className='muifield'
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <label className='label-no-mui'></label>

        <Controller
          name='passwordconfirm'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label={t("body:formelement.inputpasswordconfirm")}
              variant='outlined'
              className='muifield'
              type={showPassword ? "text" : "password"}
              error={!!errors.passwordconfirm}
              helperText={errors.passwordconfirm ? errors.passwordconfirm.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
        <label className='label-no-mui'></label>

        <Controller
          render={({ field }) => (
            <Checkbox
              {...field}
            />
          )}
          name='checkbox'
          control={control}
        />{t("body:formelement.termconfirm")}
        {errors.checkbox?.message && <p>{errors.checkbox.message}</p>}

        <Button
          type='submit'
          value='Submit'
          className='btnSubmit'
        >
          {t("body:formelement.submit")}
        </Button>

        <Button
          type='button'
          variant='contained'
          color='secondary'
          className='btnReset'
          id='btnReset'
          onClick={handleReset}
        >
          {t("body:formelement.reset")}
        </Button>

        <Snackbar
          open={alertSubmit}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant='filled'
            sx={{
              width: '100%',
              marginTop: 6
            }}
          >
            {t("body:alert.alertsubmit")}
          </Alert>
        </Snackbar>

        <Snackbar
          open={alertReset}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={handleClose}
            severity="warning"
            variant='filled'
            sx={{
              width: '100%',
              marginTop: 6
            }}
          >
            {t("body:alert.alertreset")}
          </Alert>
        </Snackbar>
      </form>
    </div>
  )
}