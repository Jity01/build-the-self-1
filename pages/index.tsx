import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import Button from '../components/button'
import Input from '../components/input'
import { listCategories } from '../lib/db-script'
import { GetStaticProps } from 'next'

export default function Home ({ data }): React.ReactNode { // TODO: generate lists, type args
  const [openInput, setOpenInput] = useState(false)
  const [newCategory, setNewCategory] = useState('')

  const revealInput = () => setOpenInput(true)
  const handleChange = (e) => setNewCategory(e.target.value)

  useEffect(() => {
    console.log(openInput, newCategory)
  }, [openInput, newCategory])

  return (
    <Layout>
      <h2>Build the Self</h2>
      <p>A humanities education without the $50,000 price tag.</p>
      <h3>Writings by Category:</h3>
      <ul>
        { // make sure shortTitle is unique in prisma schema (for key & url)
          data.map((category, i) => <li key={i}>{category.title}</li>)
        } 
      </ul>
      { openInput && <Input placeholder="Input New Category" onChange={handleChange} value={newCategory} />}
      <Button text="Add More (5)" onClick={revealInput}/>
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
  const fc = await listCategories();
  return { props: {data: fc} }
}
