import Layout from '../../components/layout'
import Button from '../../components/button'
import Input from '../../components/input'
import Link from 'next/link'
import { getCategories, getTopicsByCategory, getCategoryById } from '../../lib/db-script'

export default function Category({ topics, category, openInput, info, revealInput, handleChange, handleReset }) { // TODO type args
  const handleEnter = () => { // TODO react-query use
    fetch('/api/create-topic', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({'title': title, 'shortTitle': shortTitle, 'categoryId': category.id})
    })
      .then(res => res.json())
      .then(res => topics.push(res)) // update mapped data
      .catch(e => console.log(e))
    
    handleReset()
  }

  return (
    <Layout>
      <h2>{category.title}</h2>
      <p>{category.quote}</p>
      <p><em>{category.sourceOfQuote}</em></p> 
      <h3>Writings By Topic</h3>
      <ul>
        {
          topics.map((topic) => <li key={topic.id}><Link href={"/topics/" + topic.id}>{topic.title}</Link></li>)
        }
      </ul>
      {
        openInput
          &&
          <div>
            <Input id="title" placeholder="Input Topic Here" onChange={handleChange} value={info.title} />
            <Input id="shortTitle" placeholder="Input Short Title" onChange={handleChange} value={info.shortTitle} />
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