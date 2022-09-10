import '../styles/global.css'
import { useState } from 'react'
// import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: any) { // TODO: type props
  const [openInput, setOpenInput] = useState(false)
  const [info, setInfo] = useState({
    title: '', shortTitle: '', quote: '', sourceOfQuote: ''
  })
  const [path, setPath] = useState([])

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
  const updatePath = (currentPage) => setPath(...path, currentPage)

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
   />)
}
