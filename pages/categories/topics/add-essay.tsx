import Layout from '../../../components/layout'
import Button from '../../../components/button'
import Input from '../../../components/input'
import Link from 'next/link'
import {
  Info,
  Path,
  EssayTopic,
  HandleChange,
  HandleTextArea,
  HandleReset,
  HandleSelect,
  UpdateEssayTopic
} from '../../../types/state'
import { ReactElement } from 'react'

interface Props {
  path: Path
  info: Info
  essayTopic: EssayTopic
  handleChange: HandleChange
  handleTextArea: HandleTextArea
  handleSelect: HandleSelect
  handleReset: HandleReset
  updateEssayTopic: UpdateEssayTopic
};
export default function EssayForm ({ // TODO turn repo into private - smhhhhhh
  path,
  info,
  essayTopic,
  handleChange,
  handleTextArea,
  handleSelect,
  handleReset,
  updateEssayTopic
}: Props): ReactElement { // TODO order args (uniformly)
  const tagChoices = ['RS-E', 'AN-E', 'INS']
  const stringifyTags = (tags: string[]): string => {
    let value = tags[0]
    for (let i = 1; i < tags.length; i++) {
      value += '&'
      value += tags[i]
    }
    return value
  }
  const handleEnter = async () => { // TODO react-query use
    const { title, shortTitle, content, source, extraSources, pastEssays, tags } = info
    const stringifiedTags = stringifyTags(tags)
    await fetch('/api/create-essay', { // TODO USE QUERY? so that on the url, you are notified of what topic you are on.
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        title,
        shortTitle,
        content,
        source,
        extraSources,
        pastEssays,
        stringifiedTags,
        essayTopic
      })
    })
      .then(res => res.status === 200)
      .catch(e => console.log(e))
    handleReset() // TODO: INCLUDE ESSAY RESETING ?
    updateEssayTopic(0)
  }

  return (
    <Layout>
      <>{ path.map((el, i) => <span key={i}> {'>'} <Link href={el[1]}>{el[0]}</Link></span>) }</>
      <h2>Alright, let&apos;s do this.</h2>
      <p>&emsp;Some basic questions</p>
      <div>
        <ul>
          <li>reading source</li>
          <li>extra reading source(s)</li>
          <li>past essay(s)</li>
          <li>tag(s)</li>
        </ul>
        <div>
          <Input id="title" placeholder="input title here" onChange={handleChange} value={info.title} />
          <Input id="shortTitle" placeholder="input short title here" onChange={handleChange} value={info.shortTitle} />
          <Input id="source" placeholder="input name here" onChange={handleChange} value={info.source}/>
          <Input id="extraSources" placeholder="separate (names - w/out authors) by comma" onChange={handleChange} value={info.extraSources}/>
          <Input id="pastEssays" placeholder="separate (links) by comma" onChange={handleChange} value={info.pastEssays}/>
        </div>
      </div>
      <div><textarea id="content" placeholder="Input Essay Here" onChange={handleTextArea} value={info.content} /></div>
      <div><select id="tags" multiple onChange={handleSelect} value={info.tags} size={5}>
        { tagChoices.map((tag, i) => <option key={i}>{tag}</option>)}
      </select></div>
      <Button text="Enter" onClick={handleEnter}/>
      <div><Link href={`/categories/topics/${essayTopic}`}>&larr;Back To Topics</Link></div>
      {/* TODO fix link here */}
    </Layout>
  )
}
