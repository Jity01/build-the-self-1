import '../styles/global.css'
import { useState } from 'react'
// import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: any) { // TODO: type props
  const [openInput, setOpenInput] = useState(false)
  const [info, setInfo] = useState({
    title: '', shortTitle: '', quote: '', sourceOfQuote: ''
  })
  const [path, setPath] = useState([])

  const revealInput = (): void => setOpenInput(true)
  const handleChange = (e): void => {
    const { id, value } = e.target
    setInfo({ ...info, [id]: value })
  }
  const handleReset = (): void => {
    setOpenInput(false)
    setInfo({
      title: '', shortTitle: '', quote: '', sourceOfQuote: ''
    })
  }
  const updatePath = (currentPage: string): void => setPath([...path, currentPage])
  const resetPath = (): void => setPath([])

  return (
    <Component
      {...pageProps}
      openInput={openInput}
      info={info}
      path={path}
      revealInput={revealInput}
      handleChange={handleChange}
      handleReset={handleReset}
      updatePath={updatePath}
      resetPath={resetPath}
   />)
}
