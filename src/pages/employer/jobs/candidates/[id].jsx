import axios from "axios";
import JobCandidates from "../../../../components/job/JobCandidates";
import Layout from "../../../../components/layout/Layout";
import NotFound from "../../../../components/layout/NotFound";
import { isAuthenticated } from "../../../../utils/isAuthenticated";

export default function JobDetailsPage({ candidatesApplied, error }) {
  if (error === 'Not found.') {
    return (
      <Layout title="Jobbee - Page not found"><NotFound /></Layout>
    );
  }
  return (
    <Layout title={`Jobbee - Candidates`}>
      <JobCandidates candidatesApplied={candidatesApplied} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const accessToken = req.cookies.access;
    const user = await isAuthenticated(accessToken);
    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        }
      }
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.id}/candidates/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    const candidatesApplied = res.data;
    return {
      props: {
        candidatesApplied,
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
