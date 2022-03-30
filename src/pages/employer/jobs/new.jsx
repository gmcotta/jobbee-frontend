import Layout from "../../../components/layout/Layout";
import NewJob from "../../../components/job/NewJob";

import { isAuthenticated } from "../../../utils/isAuthenticated";

export default function NewJobPage({ accessToken }) {
  return (
    <Layout title="Jobbee - Post a New Job">
      <NewJob accessToken={accessToken} />
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
  return {
    props: {
      accessToken
    }
  }
}
