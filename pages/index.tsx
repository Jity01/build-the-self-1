import { useState } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import Button from '../components/button'
import Input from '../components/input'
import { getCategories } from '../lib/db-script'
import { GetStaticProps } from 'next'

export default function Home ({ data }): React.ReactNode { // TODO: generate lists, type args
  const [openInput, setOpenInput] = useState(false)
  const [title, setTitle] = useState('')
  const [shortTitle, setShortTitle] = useState('')

  const revealInput = () => setOpenInput(true)
  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleShortTitleChange = (e) => setShortTitle(e.target.value)

  const handleEnter = async () => {
    await fetch('api/create-category', { // TODO use react-query
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({'title': title, 'shortTitle': shortTitle})
    })
      .then(res => res.json())
      .then(res => data.push(res)) // update mapped data
      .catch(e => console.log(e))

    setOpenInput(false)
    setTitle('')
    setShortTitle('')
  }

  return (
    <Layout>
      <h2>Build the Self</h2>
      <p>A humanities education without the $50,000 price tag.</p>
      <h3>Writings by Category:</h3>
      <ul>
        { // make sure shortTitle is unique in prisma schema (for key & url)
          data.map((category: {id: number, title: string, shortTitle: string}) => <li key={category.id}><Link href={"/categories/" + category.id}>{category.title}</Link></li>)
        } 
      </ul>
      { 
        openInput
        &&
          <div>
            <Input placeholder="Input New Category" onChange={handleTitleChange} value={title} />
            <Input placeholder="Input Short Title" onChange={handleShortTitleChange} value={shortTitle} />
            <Button text="Enter" onClick={handleEnter} />
          </div>}
      <Button text="Add More (5)" onClick={revealInput}/> 
      {/* TODO add restraint on dev.db */}
      <h3>Other Writings</h3>
      <ul>
        <li>SWE writings</li>
        <li>Physics writings</li>
        <li>Mathematics writings</li>
      </ul>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => { // remake the db, it is FUCKED!
  const fc = await getCategories();
  return { props: {data: fc} }
}
