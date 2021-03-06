import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";

import { isAuthenticated } from "../../utils/isAuthenticated";

export default function UpdateProfilePage({ accessToken }) {
  return (
    <Layout title="Jobbee - Update User Profile">
      <UpdateProfile accessToken={accessToken} />
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
