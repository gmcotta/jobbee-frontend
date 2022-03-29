import axios from "axios";
import Layout from "../../components/layout/Layout";
import JobsApplied from "../../components/job/JobsApplied";

import { isAuthenticated } from "../../utils/isAuthenticated";

export default function JobsAppliedPage({ jobs }) {
  console.log(jobs);
  return (
    <Layout title="Jobbee - My Applied Jobs">
      <JobsApplied jobs={jobs} />
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/me/jobs/applied/`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const jobs = res.data;
  return {
    props: {
      jobs
    }
  }
}
