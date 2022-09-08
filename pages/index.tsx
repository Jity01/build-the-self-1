import Layout from '../components/layout'
import Button from '../components/button'
import { listCategories } from '../lib/db-script'
import { GetStaticProps } from 'next'

export default function Home (): React.ReactNode { // TODO: make list dynamic, type args
  return (
    <Layout>
      <h2>Build the Self</h2>
      <p>A humanities education without the $50,000 price tag.</p>
      <h3>Writings by Category:</h3>
      <ul>
        <li>how to communicate effectively</li>
        <li>how to behave effectively</li>
        <li>how to reason effectively</li>
      </ul>
      <Button text="Add More (5)" />
      <h3>Other Writings</h3>
      <ul>
        <li>SWE writings</li>
        <li>Physics writings</li>
        <li>Mathematics writings</li>
      </ul>
      <Button text="Add More" />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => { // remake the db, it is FUCKED!
  const fc = await listCategories();
  console.log('')
  return { props: {data: fc} }
}
