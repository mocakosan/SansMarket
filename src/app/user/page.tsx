import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import getCurrentUser from "../actions/getCurrentUser";

const UserPage = async () => {
  //const session = await getServerSession(authOptions);
  const userData = await getCurrentUser();
  return <div>로그인된 유저만 볼 수 있는 페이지입니다</div>;
};

export default UserPage;
