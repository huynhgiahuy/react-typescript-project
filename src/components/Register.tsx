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
import { Alert, Snackbar } from '@mui/material'
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
  checkbox: boolean
}

export const Register: React.FC = () => {
  const [alertSubmit, setAlertSubmit] = useState(false)

  const [alertReset, setAlertReset] = useState(false)

  const inputFocus = useRef<HTMLInputElement>(null)

  const { t } = useTranslation(["body"])

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required!'),
    username: Yup.string()
      .required('Username is required!')
      .min(6, 'Username must be at least 6 characters')
      .max(20, 'Username must be at most 20 characters'),
    email: Yup.string()
      .required('Email is required!')
      .email('Email must be a valid email'),
    password: Yup.string()
      .required('Password is required!')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must be at most 40 characters'),
    passwordconfirm: Yup.string()
      .required('Confirm password is required!')
      .oneOf([Yup.ref('password'), null], 'Confirm password not match'),
    checkbox: Yup.bool()
      .required("You must accept the terms and conditions!")
      .oneOf([true], "You must accept the terms and conditions!"),
  })

  const { handleSubmit, reset, control, formState: { errors } } = useForm<IInputs>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role: "",
      checkbox: false
    }
  })

  const handleSubmitData = (data: IInputs) => {
    console.log(data)
    setAlertSubmit(true)
    reset()
    inputFocus.current!.focus()
    window.scrollTo(0,0)
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
              type='password'
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
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
              type='password'
              error={!!errors.passwordconfirm}
              helperText={errors.passwordconfirm ? errors.passwordconfirm.message : ""}
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