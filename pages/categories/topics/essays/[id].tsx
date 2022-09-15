import Layout from '../../../../components/layout'
import Button from '../../../../components/button'
import Metadata from '../../../../components/essays/metadata'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'
import { getAllEssays, getEssayById } from '../../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'

export default function Essay ({
  essay,
  contentHtml,
  path,
  metadataCount,
  updateMetadata,
  updatePath,
  recedePath
}): React.ReactNode { // TODO type args
  useEffect(() => {
    const text = 'essays/'.concat(essay.shortTitle)
    const link = '/categories/topics/essays'.concat(essay.id)
    if (path.length === 2) updatePath(text, link)
  }, [])

  return (
    <Layout>
      <>{ path.map((subPath, i) => <span key={i}> {'>'} <Link href={subPath[1]}>{subPath[0]}</Link></span>) }</>
      <h2>{essay.title}</h2>
      <p>{essay.date}</p>
      <p>•• {essay.age}</p>
      <Button text="Metadata" onClick={updateMetadata}/>
      { metadataCount % 2 !== 0
        ? (
            <Metadata
              source={essay.source}
              extraSources={essay.extraSources}
              pastEssays={essay.pastEssays}
              tags={essay.tags}
            />
          )
        : <div /> }
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const essays = await getAllEssays()
  const paths = essays.map(essay => ({ params: { id: essay.id.toString() } })) // TODO name the indexes differently? for readibility?
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const essay = await getEssayById(parseInt(params.id))
  const processedEssayContent = await remark()
    .use(html)
    .process(essay.content)
  const contentHtml = processedEssayContent.toString()
  return { props: { essay, contentHtml } }
}
