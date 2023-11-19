import {GetServerSideProps} from "next";
import {getToken} from "next-auth/jwt";

const Authentication = () => {
  return (
    <>
      <h1>Loading</h1>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async({req}) => {
  const token = await getToken({req});
  const isAuthenticated = !!token;

  console.log(token)
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    }
  }

  if(isAuthenticated && token?.level == 1){
    return {
      redirect: {
        destination: "/admin",
        permanent: false
      }
    }
  }

  if(isAuthenticated && token?.level == 4){
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default Authentication;
