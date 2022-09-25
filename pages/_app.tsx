import '../styles/global.css'
import { useState } from 'react'
import { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): React.ReactElement {
  const [openInput, setOpenInput] = useState(false)
  const [info, setInfo] = useState({
    title: '',
    shortTitle: '',
    quote: '',
    sourceOfQuote: '',
    content: '',
    source: '',
    extraSources: '',
    pastEssays: '',
    tags: []
  })
  const [path, setPath] = useState([['', '']]) // [ [text, url] ]
  const [essayTopic, setEssayTopic] = useState(0)
  const [metadataState, setMetadataState] = useState(0)

  const revealInput = (): void => setOpenInput(true)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target
    setInfo({ ...info, [id]: value })
  }
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { id, options } = e.target
    const value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) value.push(options[i].value)
    }
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
      source: '',
      extraSources: '',
      pastEssays: '',
      tags: []
    })
  }
  const addToPath = (text: string, url: string): void => setPath([...path, [text, url]])
  const resetPath = (): void => setPath([['', '']])
  const recedePath = (newPath: string[][]): void => setPath(newPath)
  const updateEssayTopic = (topicId: number): void => setEssayTopic(topicId)
  const updateMetadataState = (): void => setMetadataState(metadataState + 1)

  return (
    <Component
      {...pageProps}
      openInput={openInput}
      metadataState={metadataState}
      info={info}
      path={path}
      essayTopic={essayTopic}
      revealInput={revealInput}
      updateMetadataState={updateMetadataState}
      handleChange={handleChange}
      handleSelect={handleSelect}
      handleReset={handleReset}
      addToPath={addToPath}
      resetPath={resetPath}
      recedePath={recedePath}
      updateEssayTopic={updateEssayTopic}
   />)
}
