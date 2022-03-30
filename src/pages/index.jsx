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
  const jobType = query.jobType || '';
  const education = query.education || '';
  const experience = query.experience || '';
  const salary = query.salary || '';
  const [minSalary, maxSalary] = salary?.split('-');
  const queryString = new URLSearchParams();
  keyword && queryString.append('keyword', keyword);
  location && queryString.append('location', location);
  page && queryString.append('page', page);
  jobType && queryString.append('jobType', jobType);
  education && queryString.append('education', education);
  experience && queryString.append('experience', experience);
  minSalary && queryString.append('min_salary', minSalary);
  maxSalary && queryString.append('max_salary', maxSalary);
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/jobs?${queryString.toString()}`
  );
  const data = res.data;

  return {
    props: {
      data
    }
  }
}
