import axios from "axios";
import JobDetails from "../../components/job/JobDetails";
import Layout from "../../components/layout/Layout";
import NotFound from "../../components/layout/NotFound";

export default function JobDetailsPage({ job, candidates, error, accessToken }) {
  if (error === 'Not found.') {
    return (
      <Layout title="Jobbee - Page not found"><NotFound /></Layout>
    );
  }
  return (
    <Layout title={`Jobbee - ${job.title}`}>
      <JobDetails job={job} candidates={candidates} accessToken={accessToken} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.id}/`);
    const job = res.data.job;
    const candidates = res.data.candidates;
    const accessToken = req.cookies.access || '';
    return {
      props: {
        job,
        candidates,
        accessToken
      }
    }
  } catch (err) {
    return {
      props: {
        error: err.response.data.detail
      }
    }
  }
}
