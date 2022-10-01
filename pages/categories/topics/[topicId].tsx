import Layout from '../../../components/layout'
import Button from '../../../components/button'
import Link from 'next/link'
import { getEssaysByTopic, getTopicById, getTopics } from '../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect, useState, ReactElement } from 'react'
import {
  Path,
  AddToPath,
  RecedePathTo,
  UpdateEssayTopic,
  Info,
  HandleChange,
  HandleSelect,
  HandleTextArea,
  HandleReset
} from '../../../types/state'
import {
  TopicTemplate,
  EssayTemplate
} from '../../../types/db'
import AddEssay from '../../../components/add-essay'

interface Props {
  info: Info
  topic: TopicTemplate
  essays: EssayTemplate[]
  path: Path
  handleChange: HandleChange
  handleSelect: HandleSelect
  handleTextArea: HandleTextArea
  handleReset: HandleReset
  addToPath: AddToPath
  recedePathTo: RecedePathTo
  updateEssayTopic: UpdateEssayTopic
};

export default function Topic ({
  info,
  topic,
  essays,
  path,
  handleChange,
  handleTextArea,
  handleSelect,
  handleReset,
  addToPath,
  updateEssayTopic,
  recedePathTo
}: Props): ReactElement {
  const [openPrompt, setOpenPrompt] = useState(false)
  const [closePrompt, setClosePrompt] = useState(false)
  const revealPrompt = (): void => setOpenPrompt(true)
  const removePrompt = (): void => setClosePrompt(true)
  useEffect(() => {
    const text = `topics/${topic.shortTitle}`
    const link = `/categories/topics/${topic.id}`
    if (path.length < 2) addToPath(text, link) // only add if not the initial sub-path
    if (path.length > 2) recedePathTo([path[0], path[1]])
    updateEssayTopic(topic.id)
  }, [])
  return (
    <Layout>
      <>{ path.map((el, i) => <span key={i}> {'>'} <Link href={el[1]}>{el[0]}</Link></span>) }</>
      <h2>{topic.title}</h2>
      <ol>
        {
          essays.map((essay) =>
            <div key={essay.id}>
            <li><Link href={`/categories/topics/essays/${essay.id}`}>{essay.title}</Link></li>
            </div>
          )
        }
      </ol>
      {/* TODO ADD RESTRAINTS W DEV.DB */}
      <Button text="Add More (15)" onClick={revealPrompt} />
      { openPrompt && !closePrompt &&
        <>
          <AddEssay
            topicId={topic.id}
            info={info}
            handleChange={handleChange}
            handleTextArea={handleTextArea}
            handleSelect={handleSelect}
            handleReset={handleReset} />
          <Button text="close" onClick={removePrompt} />
        </>}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await getTopics()
  const paths = topics.map(topic => ({ params: { topicId: topic.id.toString() } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => { // TODO: damn..
  if (params !== undefined) {
    const topic = await getTopicById(parseInt(params.topicId as string))
    const essays = await getEssaysByTopic(parseInt(params.topicId as string))
    return { props: { topic, essays } }
  }
  return { props: {} }
}
