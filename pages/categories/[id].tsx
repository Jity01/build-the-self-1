import Layout from '../../components/layout'
import { getCategories, getTopicsByCategory, getCategoryTitleById } from '../../lib/db-script';

export default function Button({ topics, categoryTitle }) { // TODO type args
  return (
    <Layout />
  );
}


export async function getStaticPaths() {
  const categories = await getCategories()
  const paths = categories.map(category => ({ params: { id: category.id }}))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const topics = await getTopicsByCategory(params.id)
  const categoryTitle = await getCategoryTitleById(params.id)
  return { props: { topics, categoryTitle } }
}