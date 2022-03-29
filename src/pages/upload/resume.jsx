import Layout from "../../components/layout/Layout";
import UploadResume from "../../components/user/UploadResume";

import { isAuthenticated } from "../../utils/isAuthenticated";

export default function UploadResumePage({ accessToken }) {
  return (
    <Layout title="Jobbee - Upload Your Resume">
      <UploadResume accessToken={accessToken} />
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
