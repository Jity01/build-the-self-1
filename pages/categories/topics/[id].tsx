import Layout from '../../../components/layout'
// import Button from '../../../components/button'
// import Input from '../../../components/input'
// import Link from 'next/link'
import { getEssaysByTopic, getTopicById, getTopics } from '../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'

export default function Topic ({ topic, essays }): React.ReactNode { // TODO type args
  return (
    <Layout>
      <h2>{topic.title}</h2>
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
