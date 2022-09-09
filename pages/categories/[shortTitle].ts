import Layout from '../../components/layout'
import { getCategories, getTopicsInCategory } from '../../lib/db-script';

export default function Button({ topics }) { // TODO type args
  return (
    <Layout>
      
    </Layout>
  );
}

export async function getStaticPaths() {
  const categories = await getCategories()
  const paths = categories.map(category => ({ params: { shortTitle: category.shortTitle }}))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const topics = await getTopicsInCategory(params.shortTitle)
  const category = await findCategoryByShortTitle(params.shortTitle)
  return { props: { topics, category } }
}