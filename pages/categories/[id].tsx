import Layout from '../../components/layout'
import { getCategories, getTopicsByCategory, getCategoryTitleById } from '../../lib/db-script';

export default function Button({ topics, categoryTitle }) { // TODO type args
  return (
    <Layout>
      <h2>{categoryTitle}</h2>
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
  const categoryTitle = await getCategoryTitleById(parseInt(params.id))
  return { props: { topics, categoryTitle } }
}