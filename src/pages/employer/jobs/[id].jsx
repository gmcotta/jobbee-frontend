import axios from "axios";
import UpdateJob from "../../../components/job/UpdateJob";
import Layout from "../../../components/layout/Layout";
import NotFound from "../../../components/layout/NotFound";
import { isAuthenticated } from "../../../utils/isAuthenticated";

export default function JobDetailsPage({ job, accessToken, error }) {
  if (error === 'Not found.') {
    return (
      <Layout title="Jobbee - Page not found"><NotFound /></Layout>
    );
  }
  return (
    <Layout title={`Jobbee - ${job.title} - Edit`}>
      <UpdateJob job={job} accessToken={accessToken} />
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
      `${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${params.id}/`
    );
    const job = res.data.job;
    return {
      props: {
        job,
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
