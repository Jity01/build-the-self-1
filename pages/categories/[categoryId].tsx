import Layout from '../../components/layout'
import Button from '../../components/button'
import Input from '../../components/input'
import Link from 'next/link'
import { getCategories, getTopicsByCategory, getCategoryById } from '../../lib/db-script'
import { ReactElement, useEffect } from 'react'
import {
  OpenInput,
  Info,
  Path,
  RevealInput,
  HandleChange,
  HandleReset,
  AddToPath,
  RecedePathTo
} from '../../types/state'
import {
  TopicTemplate,
  CategoryTemplate
} from '../../types/db'
import { GetStaticPaths, GetStaticProps } from 'next'

interface Props { // TODO: just extract this..
  topics: TopicTemplate[]
  category: CategoryTemplate
  openInput: OpenInput
  info: Info
  path: Path
  revealInput: RevealInput
  handleChange: HandleChange
  handleReset: HandleReset
  addToPath: AddToPath
  recedePathTo: RecedePathTo
}

export default function Category ({
  topics,
  category,
  openInput,
  info,
  path,
  revealInput,
  handleChange,
  handleReset,
  addToPath,
  recedePathTo
}: Props): ReactElement {
  const addTopicToDatabase = async (): Promise<void> => { // TODO: add validation.. im literally an idiot; i can put anything in here.
    // TODO: fix promise typing..
    const { title, shortTitle } = info
    await fetch('/api/create-topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ title, shortTitle, categoryId: category.id })
    })
      .then(async res => await res.json())
      .catch(e => console.log(e))
  }
  const handleEnter = async (): Promise<void> => {
    await addTopicToDatabase()
    handleReset()
  }

  useEffect(() => {
    const text = `categories/${category.shortTitle}`
    const link = `/categories/${category.id}`
    const isInitialPath = path.length === 0
    const containsTopicPath = path.length > 1
    console.log('here', path)
    if (isInitialPath) { // set initial path
      addToPath(text, link)
    } else if (containsTopicPath) { // reset to inital path
      recedePathTo([path[0]])
    }
  }, [])

  return (
    <Layout>
      <>{ path.map((subPath, i) => <span key={i}> {'>'} <Link href={subPath[1]}>{subPath[0]}</Link></span>) }</>
      <h2>{category.title}</h2>
      <p>{category.quote}</p>
      <p><em>{category.sourceOfQuote}</em></p>
      <h3>Writings By Topic</h3>
      <ul>
        {
          topics.map((topic) => <li key={topic.id}><Link href={`/categories/topics/${topic.id}`}>{topic.title}</Link></li>)
        }
      </ul>
      {
        openInput &&
          <>
            <Input id="title" placeholder="Input Topic Here" onChange={handleChange} value={info.title} />
            <Input id="shortTitle" placeholder="Input Short Title" onChange={handleChange} value={info.shortTitle} />
            <Button text="Enter" onClick={handleEnter} />
          </>
      }
      <Button text="Add more (7)" onClick={revealInput} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories()
  const paths = categories.map(category => ({ params: { categoryId: category.id.toString() } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => { // TODO: useQuery HERE
  if (params !== undefined) { // TODO: TBC.. lol
    const topics = await getTopicsByCategory(parseInt(params.categoryId as string))
    const category = await getCategoryById(parseInt(params.categoryId as string))
    return { props: { topics, category } }
  }
  return { props: {} }
}
