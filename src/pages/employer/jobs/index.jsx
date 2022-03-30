import Layout from "../../../components/layout/Layout";
import MyJobs from "../../../components/job/MyJobs";

import { isAuthenticated } from "../../../utils/isAuthenticated";
import axios from "axios";

export default function MyJobsPage({ jobs }) {
  return (
    <Layout title="Jobbee - My Jobs">
      <MyJobs jobs={jobs} />
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const accessToken = req.cookies.access;
  const user = await isAuthenticated(accessToken);
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/me/jobs/`, 
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );
  const jobs = res.data;
  console.log(jobs);
  return {
    props: {
      jobs,
    }
  }
}
