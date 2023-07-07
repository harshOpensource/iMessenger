import { Session } from "next-auth";

interface FeedProps {
  session: Session;
}

const Feed: React.FC<FeedProps> = ({}) => {
  return <div>Feed</div>;
};

export default Feed;
