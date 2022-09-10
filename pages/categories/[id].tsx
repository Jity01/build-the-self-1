import Layout from '../../components/layout'
import Button from '../../components/button'
import Input from '../../components/input'
import Link from 'next/link'
import { getCategories, getTopicsByCategory, getCategoryById } from '../../lib/db-script'
import { useEffect } from 'react'

export default function Category({
  topics,
  category,
  openInput,
  info,
  path,
  revealInput,
  handleChange,
  handleReset,
  updatePath
}): React.ReactNode { // TODO type args
  const handleEnter = async () => { // TODO react-query use
    const { title, shortTitle } = info
    await fetch('/api/create-topic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ title, shortTitle, categoryId: category.id })
    })
      .then(async res => await res.json())
      .then(res => topics.push(res)) // update mapped data
      .catch(e => console.log(e))
    handleReset()
  }
  useEffect(() => {
    const text = 'categories/'.concat(category.shortTitle)
    const link = '/categories/'.concat(category.id)
    updatePath(text, link)
  }, [])

  return (
    <Layout>
      <>{ path.map((el, i) => <span key={i}> {'>'} <Link href={el[1]}>{el[0]}</Link></span>) }</>
      <h2>{category.title}</h2>
      <p>{category.quote}</p>
      <p><em>{category.sourceOfQuote}</em></p>
      <h3>Writings By Topic</h3>
      <ul>
        {
          topics.map((topic) => <li key={topic.id}><Link href={'/topics/'.concat(topic.id)}>{topic.title}</Link></li>)
        }
      </ul>
      {
        Boolean(openInput) && // TODO not really needed after typing..
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

export async function getStaticPaths() {
  const categories = await getCategories()
  const paths = categories.map(category => ({ params: { id: category.id.toString() } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const topics = await getTopicsByCategory(parseInt(params.id))
  const category = await getCategoryById(parseInt(params.id))
  return { props: { topics, category } }
}
