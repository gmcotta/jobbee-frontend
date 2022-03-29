import axios from "axios";
import JobDetails from "../../components/job/JobDetails";
import Layout from "../../components/layout/Layout";
import NotFound from "../../components/layout/NotFound";

export default function JobDetailsPage({ job, candidates, error }) {
  if (error === 'Not found.') {
    return (
      <Layout title="Jobbee - Page not found"><NotFound /></Layout>
    );
  }
  return (
    <Layout title={`Jobbee - ${job.title}`}>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.id}/`);
    const job = res.data.job;
    const candidates = res.data.candidates;
    return {
      props: {
        job,
        candidates
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
