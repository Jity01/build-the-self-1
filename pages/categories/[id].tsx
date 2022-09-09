import Layout from '../../components/layout'
import Button from '../../components/button'
import Input from '../../components/input'
import Link from 'next/link'
import { useState } from 'react'
import { getCategories, getTopicsByCategory, getCategoryById } from '../../lib/db-script'

export default function Category({ topics, category }) { // TODO type args
  const [openInput, setOpenInput] = useState(false)
  const [topicTitle, setTopicTitle] = useState('') // TODO abstract into an object
  const [shortTitle, setShortTitle] = useState('') // TODO name pathTitle ??

  const revealInput = () => setOpenInput(true)
  const handleTitleChange = (e) => setTopicTitle(e.target.value)
  const handleShortTitleChange = (e) => setShortTitle(e.target.value)
  const handleEnter = () => { // TODO react-query use
    fetch('/api/create-topic', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({'title': title, 'shortTitle': shortTitle, 'categoryId': category.id})
    })
      .then(res => res.json())
      .then(res => topics.push(res)) // update mapped data
      .catch(e => console.log(e))
    
    setOpenInput(false)
    setShortTitle('')
    setTopicTitle('')
  }

  return (
    <Layout>
      <h2>{category.title}</h2>
      {/* TODO adjust schema - quote on category instead of topics
        <p>{category.quote}<p>
        <p><em>{category.sourceOfQuote}</em><p> 
      */}
      <h3>Writings By Topic</h3>
      <ul>
        {
          topics.map((topic: { id: number, title: string, shortTitle: string, categoryId: number }) => <li key={topic.id}><Link href={"/topics/" + topic.id}>{topic.title}</Link></li>)
        }
      </ul>
      {
        openInput
          && 
          <div>
            <Input placeholder="Input Topic Here" onChange={handleTitleChange} value={topicTitle} />
            <Input placeholder="Input Short Title" onChange={handleShortTitleChange} value={shortTitle} />
            <Button text="Enter" onClick={handleEnter} />
          </div>
      }
      <Button text="Add more (7)" onClick={revealInput()} />
    </Layout> 
  );
}


export async function getStaticPaths() {
  const categories = await getCategories()
  const paths = categories.map(category => ({ params: { id: category.id.toString() }}))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const topics = await getTopicsByCategory(parseInt(params.id))
  const category = await getCategoryById(parseInt(params.id))
  return { props: { topics, category } }
}