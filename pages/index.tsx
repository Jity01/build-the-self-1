import Link from 'next/link'
import Layout from '../components/layout'
import Button from '../components/button'
import Input from '../components/input'
import { getCategories } from '../lib/db-script'
import { GetStaticProps } from 'next'
import { ReactElement, useEffect } from 'react'
import {
  OpenInput,
  Info,
  RevealInput,
  HandleChange,
  HandleReset,
  ResetPath
} from '../types/state'
import {
  CategoryTemplate
} from '../types/db'

interface Props {
  categories: CategoryTemplate[]
  openInput: OpenInput
  info: Info
  revealInput: RevealInput
  handleChange: HandleChange
  handleReset: HandleReset
  resetPath: ResetPath
}

export default function Home ({
  categories,
  openInput,
  info,
  revealInput,
  handleChange,
  handleReset,
  resetPath
}: Props): ReactElement { // TODO: generate lists
  const handleEnter = async (): Promise<void> => {
    const { title, shortTitle, quote, sourceOfQuote } = info // TODO handle error - make sure they're filled out
    await fetch('api/create-category', { // TODO use react-query - loading sign
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ title, shortTitle, quote, sourceOfQuote })
    })
      .then(res => res.json())
      .then(res => categories.push(res)) // update categories
      .catch(e => console.log(e))
    handleReset()
  }
  useEffect(() => {
    resetPath()
  }, [])
  return (
    <Layout>
      <h2>Build the Self</h2>
      <p>A humanities education without the $50,000 price tag.</p>
      <h3>Writings by Category:</h3>
      <ul>
        {
          categories.map((category) => <li key={category.id}><Link href={`/categories/${category.id}`}>{category.title}</Link></li>)
        }
      </ul>
      {
        (Boolean(openInput)) &&
          <>
            <Input id="title" placeholder="Input New Category" onChange={handleChange} value={info.title} />
            <Input id="shortTitle" placeholder="Input Short Title" onChange={handleChange} value={info.shortTitle} />
            <Input id="quote" placeholder="Input Quote" onChange={handleChange} value={info.quote} />
            <Input id="sourceOfQuote" placeholder="Input Source Of Quote" onChange={handleChange} value={info.sourceOfQuote}/>
            <Button text="Enter" onClick={handleEnter} />
          </>
      }
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

export const getStaticProps: GetStaticProps = async () => {
  const categories = await getCategories()
  return { props: { categories } }
}
