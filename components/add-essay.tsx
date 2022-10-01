import Layout from './layout'
import Button from './button'
import Input from './input'
import {
  Info,
  HandleChange,
  HandleTextArea,
  HandleReset,
  HandleSelect
} from '../types/state'
import { ReactElement } from 'react'

interface Props {
  topicId: number
  info: Info
  handleChange: HandleChange
  handleTextArea: HandleTextArea
  handleSelect: HandleSelect
  handleReset: HandleReset
};

export default function EssayForm ({ // TODO turn repo into private - smhhhhhh
  topicId,
  info,
  handleChange,
  handleTextArea,
  handleSelect,
  handleReset
}: Props): ReactElement { // TODO order args (uniformly)
  const tagChoices = ['scenario', 'analysis', 'insight', 'question']
  const stringifyTags = (tags: string[]): string => {
    let value = tags[0]
    for (let i = 1; i < tags.length; i++) {
      value += '&'
      value += tags[i]
    }
    return value
  }
  const handleEnter = async (): Promise<any> => { // TODO react-query use
    const { title, shortTitle, content, source, extraSources, pastEssays, tags } = info
    const stringifiedTags = stringifyTags(tags)
    await fetch('/api/create-essay', {
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
        topicId
      })
    })
      .then(res => res.status === 200)
      .catch(e => console.log(e))
    handleReset()
  }

  return (
    <Layout>
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
          <Input id="source" placeholder="input source here" onChange={handleChange} value={info.source}/>
          <Input id="extraSources" placeholder="input extra sources" onChange={handleChange} value={info.extraSources}/>
          <Input id="pastEssays" placeholder="input pass essay names" onChange={handleChange} value={info.pastEssays} />
        </div>
      </div>
      <div><textarea id="content" placeholder="Input Essay Here" onChange={handleTextArea} value={info.content} /></div>
      <div><select id="tags" multiple onChange={handleSelect} value={info.tags} size={4}>
        { tagChoices.map((tag, i) => <option key={i}>{tag}</option>)}
      </select></div>
      <Button text="Enter" onClick={handleEnter}/>
    </Layout>
  )
}
