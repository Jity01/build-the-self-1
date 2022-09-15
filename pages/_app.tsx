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
    source: '',
    extraSources: '',
    pastEssays: '',
    tags: []
  })
  const [path, setPath] = useState([]) // TODO [text, link]
  const [topicIdForAddingAnEssay, setTopicIdForAddingAnEssay] = useState(0)
  const [metadataCount, setMetadataCount] = useState(0)

  const revealInput = (): void => setOpenInput(true)
  const updateMetadata = (): void => setMetadataCount(metadataCount + 1)
  const handleChange = (e): void => {
    const { id } = e.target
    if (id === 'tags') {
      const { options } = e.target
      const value = []
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) value.push(options[i].value)
      }
      setInfo({ ...info, [id]: value })
    } else {
      const { value } = e.target
      setInfo({ ...info, [id]: value })
    }
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
  const updatePath = (text: string, link: string): void => setPath([...path, [text, link]]) // 'add to path' TODO
  const resetPath = (): void => setPath([])
  const recedePath = (newPath): void => setPath(newPath)
  const updateTopicIdForAddingAnEssay = (topicId: number): void => setTopicIdForAddingAnEssay(topicId)
  return (
    <Component
      {...pageProps}
      openInput={openInput}
      metadataCount={metadataCount}
      info={info}
      path={path}
      topicIdForAddingAnEssay={topicIdForAddingAnEssay}
      revealInput={revealInput}
      updateMetadata={updateMetadata}
      handleChange={handleChange}
      handleReset={handleReset}
      updatePath={updatePath}
      resetPath={resetPath}
      recedePath={recedePath}
      updateTopicIdForAddingAnEssay={updateTopicIdForAddingAnEssay}
   />)
}
