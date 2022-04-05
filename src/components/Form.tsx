import React, { useState, useRef, useEffect } from 'react'
import { IState as Props } from '../App'
import { Alert, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { useFormik } from 'formik'
import '../css/Form.css'

interface IProps {
  infor: Props['infor'],
  setInfor: React.Dispatch<React.SetStateAction<Props['infor']>>
}

export const Form: React.FC<IProps> = ({ infor, setInfor }: IProps) => {
  //const [input, setInput] = useState({ name: "", age: "", email: "" })

  const [open, setOpen] = useState(false)

  const inputFocus = useRef<HTMLInputElement>(null)

  const { t } = useTranslation(["body"])

  /*const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }*/

  /*const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfor([...infor, {
      name: input.name,
      age: Number(input.age),
      email: input.email
    }])
    setInput({ name: "", age: "", email: "" })
    setOpen(true)
    inputFocus.current!.focus()
  }*/

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false);
  }

  // Test Hook useRef
  useEffect(() => {
    inputFocus.current!.focus()
  }, [])

  const validationSchema = yup.object().shape({
    name: yup.string()
      .required(`${t("body:error.fullbamerequired")}`)
      .max(70, `${t("body:error.fullnamerequiredmax")}`),
    age: yup.number()
      .required(`${t("body:error.agerequired")}`)
      .min(0, `${t("body:error.agerequiredmin")}`)
      .max(100, `${t("body:error.agerequiredmax")}`),
    email: yup.string()
      .required(`${t("body:error.emailrequired")}`)
      .email(`${t("body:error.emailrequiredvalid")}`)
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      console.log(values)
      setOpen(true)
      inputFocus.current!.focus()
      formik.resetForm()
    }
  })

  return (
    <div className='form-container'>
      <h1>{t("infoname")}</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='text'
          name='name'
          id='name'
          ref={inputFocus}
          placeholder={t("body:formelement.inputname")}
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && Boolean(formik.errors.name) && <p>{formik.errors.name}</p>}
        <input
          type='number'
          name='age'
          id='age'
          placeholder={t("body:formelement.inputage")}
          value={formik.values.age}
          onChange={formik.handleChange}
        />
        {formik.touched.age && Boolean(formik.errors.age) && <p>{formik.errors.age}</p>}
        <input
          type='text'
          name='email'
          id='email'
          placeholder={t("body:formelement.inputemail")}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && Boolean(formik.errors.email) && <p>{formik.errors.email}</p>}

        <button
          type='submit'
        >
          {t("body:formelement.submit")}
        </button>

        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
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
      </form>

    </div>
  )
}
