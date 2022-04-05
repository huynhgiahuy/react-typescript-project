import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import { TextField, Button } from '@material-ui/core'
import { Alert, Snackbar } from '@mui/material'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import '../css/Register.css'

export const Register2: React.FC = () => {
    const [alertOpen, setAlertOpen] = useState(false)

    const inputFocus = useRef<HTMLInputElement>(null)

    const { t } = useTranslation(["body"])

    const validationSchema = yup.object().shape({
        fullname: yup.string()
            .required(`${t("body:error.fullbamerequired")}`)
            .min(3, `${t("body:error.fullnamerequiredmin")}`)
            .max(70, `${t("body:error.fullnamerequiredmax")}`),
        username: yup.string()
            .required(`${t("body:error.usernamerequired")}`)
            .min(6, `${t("body:error.usernamerequiredmin")}`)
            .max(20, `${t("body:error.usernamerequiredmax")}`),
        email: yup.string()
            .required(`${t("body:error.emailrequired")}`)
            .email(`${t("body:error.emailrequiredvalid")}`),
    })

    const formik = useFormik({
        initialValues: {
            fullname: '',
            username: '',
            email: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
            setAlertOpen(true)
            inputFocus.current!.focus()
            formik.resetForm()
        }
    })

    const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        setAlertOpen(false)
    }

    return (
        <div className='signin'>
            <h1>{t("formikregistername")}</h1>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id='fullname'
                    name='fullname'
                    label={t("body:formelement.inputname")}
                    variant='standard'
                    className='muifield'
                    autoFocus
                    inputRef={inputFocus}
                    value={formik.values.fullname}
                    onChange={formik.handleChange}
                    error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                    helperText={formik.touched.fullname && formik.errors.fullname}
                />

                <label className='label-no-mui'></label>
                <TextField
                    id='username'
                    name='username'
                    label={t("body:formelement.inputusername")}
                    variant='standard'
                    className='muifield'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <label className='label-no-mui'></label>
                <TextField
                    id='email'
                    name='email'
                    label={t("body:formelement.inputemail")}
                    variant='standard'
                    className='muifield'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <Button
                    type='submit'
                    variant='outlined'
                    color='primary'
                >
                    {t("body:formelement.submit")}
                </Button>

                <Snackbar
                    open={alertOpen}
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