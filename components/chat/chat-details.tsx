import Topbar from '@/components/chat/topbar';

type TChatDetailsProps = {};

const ChatDetails = async (props: TChatDetailsProps) => {
  return (
    <div className="chat-details">
      <Topbar></Topbar>
    </div>
  );
};

export default ChatDetails;
