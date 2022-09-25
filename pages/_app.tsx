import '../styles/global.css'
import { ReactElement, useState } from 'react'
import { AppProps } from 'next/app'
import {
  RevealInput,
  HandleChange,
  HandleSelect,
  HandleReset,
  AddToPath,
  ResetPath,
  RecedePathTo,
  UpdateEssayTopic,
  UpdateMetadataState
} from '../types/state.interface'

export default function App ({ Component, pageProps }: AppProps): ReactElement {
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

  const revealInput: RevealInput = () => setOpenInput(true)
  const handleChange: HandleChange = (e) => {
    const { id, value } = e.target
    setInfo({ ...info, [id]: value })
  }
  const handleSelect: HandleSelect = (e) => {
    const { id, options } = e.target
    const value = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) value.push(options[i].value)
    }
    setInfo({ ...info, [id]: value })
  }
  const handleReset: HandleReset = () => {
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
  const addToPath: AddToPath = (text, url) => setPath([...path, [text, url]])
  const resetPath: ResetPath = () => setPath([['', '']])
  const recedePathTo: RecedePathTo = (newPath) => setPath(newPath)
  const updateEssayTopic: UpdateEssayTopic = (topicId) => setEssayTopic(topicId)
  const updateMetadataState: UpdateMetadataState = () => setMetadataState(metadataState + 1)

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
      recedePathTo={recedePathTo}
      updateEssayTopic={updateEssayTopic}
   />)
}
