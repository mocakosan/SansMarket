import getCurrentUser from "../actions/getCurrentUser";
import ChatClient from "./ChatClient";

const chatPage = async () => {
  const currentUser = await getCurrentUser();
  return <ChatClient currentUser={currentUser} />;
};

export default chatPage;
