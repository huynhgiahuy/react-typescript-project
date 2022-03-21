import React, { useState, Suspense  } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Form } from './components/Form'
import { Navbar } from './components/Navbar'
import { Register } from './components/Register'
import { Register2 } from './components/Register2'
import { Arraycp } from './components/Arraycp'
import { Notfound } from './components/Notfound'
import { Muitable } from './components/Muitable'

export interface IState {
  infor: {
    name: string,
    age: number,
    email: string
  }[]
}

export interface IInvoiceListProps {
  invoiceData: {
    customerFirstName: string,
    customerLastName: string,
    invoices: {
      id: number,
      name: string,
      total: number,
      paymentStatus: string,
    }[]
  }
}

export const App: React.FC = () => {
  const [infor, setInfor] = useState<IState['infor']>([])
  const data1 = {
    customerFirstName: 'Văn A',
    customerLastName: 'Trần',
    invoices: [
      { id: 100, name: 'Invoice 001', total: 20000, paymentStatus: 'paid' },
      { id: 101, name: 'Invoice 002', total: 50000, paymentStatus: 'pending' },
      { id: 102, name: 'Invoice 003', total: 50000, paymentStatus: 'pending' },
      { id: 103, name: 'Invoice 004', total: 20000, paymentStatus: 'pending' },
      { id: 104, name: 'Invoice 005', total: 30000, paymentStatus: 'late' },
      { id: 105, name: 'Invoice 006', total: 20000, paymentStatus: 'late' }
    ],
  }

  return (
    <div>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Form infor={infor} setInfor={setInfor} />}></Route>
            <Route path='arraycp' element={<Arraycp invoiceData={data1} />}></Route>
            <Route path='yupregister' element={<Register />}></Route>
            <Route path='formikregister' element={<Register2 />}></Route>
            <Route path='muitable' element={<Muitable />}></Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}