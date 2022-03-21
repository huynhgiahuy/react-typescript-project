import React, { useState, useMemo, useRef, useEffect } from 'react'
import { IState as Props } from '../App'
import { Alert, Snackbar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import '../css/Form.css'

interface IProps {
  infor: Props['infor'],
  setInfor: React.Dispatch<React.SetStateAction<Props['infor']>>
}

export const Form: React.FC<IProps> = ({infor, setInfor}: IProps) => {
  const [input, setInput] = useState({ name: "", age: "", email: "" })

  const [open, setOpen] = useState(false)

  const inputFocus = useRef<HTMLInputElement>(null)

  const { t } = useTranslation(["body"])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfor([...infor, {
      name: input.name,
      age: Number(input.age),
      email: input.email
    }])
    setInput({ name: "", age: "", email: "" })
    setOpen(true)
    inputFocus.current!.focus()
  }

  const handleClose = (e?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false);
  }

  const renderList = () => {
    return (
      infor.map(peopleInfo => {
        return (
          <div className='list-item' key={peopleInfo.name}>
            {peopleInfo.name} - {peopleInfo.age} - {peopleInfo.email}
          </div>
        )
      })
    )
  }

  //const total = infor.reduce((result, ppl) => {
  //console.log('Tính toán lại')
  //return result + ppl.age
  //}, 0)

  // Test Hook useMemo
  const total = useMemo(() => {
    const result = infor.reduce((result, ppl) => {
      console.log('Tính toán lại')
      return result + ppl.age
    }, 0)
    return result
  }, [infor])

  // Test Hook useRef
  //useEffect(() => {
    //renders.current = renders.current+1 
  //})

  // Test Hook useRef
  useEffect(() => {
    inputFocus.current!.focus()
  }, [])

  return (
    <div className='form-container'>
      <h1>{t("infoname")}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          id='name'
          ref={inputFocus}
          placeholder={t("body:formelement.inputname")}
          onChange={handleChange}
          value={input.name}
          required
        />
        <input
          type='number'
          name='age'
          id='age'
          placeholder={t("body:formelement.inputage")}
          onChange={handleChange}
          value={input.age}
          required
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder={t("body:formelement.inputemail")}
          onChange={handleChange}
          value={input.email}
          required
        />

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

      <h1></h1>
      <h2>{t("totalage")} = {total} </h2>
      {renderList()}

    </div>
  )
}
