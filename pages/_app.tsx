import '../styles/global.css'
import { useState } from 'react'
// import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: any) { // TODO: type props
  const [openInput, setOpenInput] = useState(false)
  const [info, setInfo] = useState({
    title: '',
    shortTitle: '',
    quote: '',
    sourceOfQuote: '',
    content: '',
    date: '',
    age: '',
    source: '',
    extraSources: '',
    pastEssays: '',
    tags: ''
  })
  const [path, setPath] = useState([]) // TODO [text, link]

  const revealInput = (): void => setOpenInput(true)
  const handleChange = (e): void => {
    const { id, value } = e.target
    setInfo({ ...info, [id]: value })
  }
  const handleReset = (): void => {
    setOpenInput(false)
    setInfo({
      title: '',
      shortTitle: '',
      quote: '',
      sourceOfQuote: '',
      content: '',
      date: '',
      age: '',
      source: '',
      extraSources: '',
      pastEssays: '',
      tags: ''
    })
  }
  const updatePath = (text: string, link: string): void => setPath([...path, [text, link]]) // 'add to path' TODO
  const resetPath = (): void => setPath([])
  const recedePath = (newPath): void => setPath([newPath])

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
      recedePath={recedePath}
   />)
}
