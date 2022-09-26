import Layout from '../../../../components/layout'
import Button from '../../../../components/button'
import Metadata from '../../../../components/essays/metadata'
import Link from 'next/link'
import { remark } from 'remark'
import html from 'remark-html'
import { getAllEssays, getEssayById } from '../../../../lib/db-script'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useEffect } from 'react'
import {
  Path,
  MetadataState,
  AddToPath,
  RecedePathTo,
  UpdateMetadataState
} from '../../../../types/state'
import {
  EssayTemplate
} from '../../../../types/db'

interface Props { // TODO: extract?
  essay: EssayTemplate
  contentHtml: string
  path: Path
  metadataState: MetadataState
  updateMetadataState: UpdateMetadataState
  addToPath: AddToPath
  recedePathTo: RecedePathTo
};
export default function Essay ({
  essay,
  contentHtml,
  path,
  metadataState,
  updateMetadataState,
  addToPath,
  recedePathTo
}: Props): React.ReactNode {
  useEffect(() => {
    const text = `essays/${essay.shortTitle}`
    const link = `/categories/topics/essays/${essay.id}`
    if (path.length === 2) addToPath(text, link)
    // TODO: make dynamic
  }, [])

  return (
    <Layout>
      <>{ path.map((subPath, i) => <span key={i}> {'>'} <Link href={subPath[1]}>{subPath[0]}</Link></span>) }</>
      <h2>{essay.title}</h2>
      <p>{essay.date}</p>
      <p>•• {essay.age}</p>
      <Button text="Metadata" onClick={updateMetadataState}/>
      { metadataState % 2 !== 0 && (
            <Metadata
              source={essay.source}
              extraSources={essay.extraSources}
              pastEssays={essay.pastEssays}
              tags={essay.tags}
            />
      ) }
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
