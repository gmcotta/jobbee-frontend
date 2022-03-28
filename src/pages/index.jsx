import axios from 'axios';

import Layout from '../components/layout/Layout';
import Home from '../components/Home';

export default function Index({ data }) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const keyword = query.keyword || '';
  const location = query.location || '';
  const page = query.page || '';
  const queryString = new URLSearchParams();
  keyword && queryString.append('keyword', keyword);
  location && queryString.append('location', location);
  page && queryString.append('page', page);
  const res = await axios.get(
    `${process.env.API_URL}/api/jobs?${queryString.toString()}`
  );
  const data = res.data;

  return {
    props: {
      data
    }
  }
}
