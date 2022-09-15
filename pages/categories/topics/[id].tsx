import Layout from '../../../components/layout'
import Button from '../../../components/button'
import Link from 'next/link'
import { getEssaysByTopic, getTopicById, getTopics } from '../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'

export default function Topic ({ topic, essays, path, updatePath, updateTopicIdForAddingAnEssay, recedePath }): React.ReactNode { // TODO type args
  useEffect(() => {
    const text = 'topics/'.concat(topic.shortTitle)
    const link = '/categories/topics/'.concat(topic.id)
    if (path.length < 2) updatePath(text, link) // only set if not the initial sub-path
    if (path.length > 2) recedePath([path[0], path[1]])
    updateTopicIdForAddingAnEssay(topic.id)
    // path.length == 2, keep the same
  }, [])
  const inputTopicId = (): void => {
    // updateTopicIdForAddingAnEssay(topic.id) - more control but less convenient for the user?
  }
  return (
    <Layout>
      <>{ path.map((el, i) => <span key={i}> {'>'} <Link href={el[1]}>{el[0]}</Link></span>) }</>
      <h2>{topic.title}</h2>
      <ol>
        {
          essays.map((essay) =>
            <div key={essay.id}>
            <li><Link href={'/categories/topics/essays/'.concat(essay.id)}>{essay.title}</Link></li>
            <p>tag tag tag tag</p>
            </div>
          )
        }
      </ol>
      {/* TODO ADD RESTRAINTS W DEV.DB */}
      <Link href="/categories/topics/add-essay"><Button text="Add More (15)" onClick={inputTopicId}/></Link>
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
