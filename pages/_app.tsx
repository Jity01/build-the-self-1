import '../styles/global.css'
import { useState } from 'react'
// import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: any) { // TODO: type props
  const [openInput, setOpenInput] = useState(false)
  const [info, setInfo] = useState({
    title: '', shortTitle: '', quote: '', sourceOfQuote: ''
  })

  const revealInput = () => setOpenInput(true)
  const handleChange = (e) => {
    const { id, value } = e.target
    setInfo({...info, [id]: value})
  }
  const handleReset = () => {
    setOpenInput(false)
    setInfo({
      title: '', shortTitle: '', quote: '', sourceOfQuote: ''
    })
  }

  return (
    <Component
      {...pageProps}
      openInput={openInput}
      info={info}
      revealInput={revealInput}
      handleChange={handleChange}
      handleReset={handleReset}
   />)
}
