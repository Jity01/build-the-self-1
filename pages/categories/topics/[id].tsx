import Layout from '../../../components/layout'
import Button from '../../../components/button'
import Link from 'next/link'
import { getEssaysByTopic, getTopicById, getTopics } from '../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import {
  Path,
  AddToPath,
  RecedePathTo,
  UpdateEssayTopic
} from '../../../types/state'
import {
  TopicTemplate,
  EssayTemplate
} from '../../../types/db'

interface Props {
  topic: TopicTemplate
  essays: EssayTemplate[]
  path: Path
  addToPath: AddToPath
  recedePathTo: RecedePathTo
  updateEssayTopic: UpdateEssayTopic
};

export default function Topic ({
  topic,
  essays,
  path,
  addToPath,
  updateEssayTopic,
  recedePathTo
}: Props): React.ReactNode {
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
            <p>tag tag tag tag</p> {/* TODO: make dynamic */}
            </div>
          )
        }
      </ol>
      {/* TODO ADD RESTRAINTS W DEV.DB */}
      {/* TODO: input topic id through the url */}
      <Link href="/categories/topics/add-essay"><Button text="Add More (15)" onClick={() => {}}/></Link>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const topics = await getTopics()
  const paths = topics.map(topic => ({ params: { id: topic.id.toString() } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const topic = await getTopicById(parseInt(params.id))
  const essays = await getEssaysByTopic(parseInt(params.id))
  return { props: { topic, essays } }
}
