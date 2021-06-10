import { useParams } from 'react-router';
import {PageName} from "../app/ticketsCore";

const Page: React.FC = () => {
    
  const { name } = useParams<{ name: PageName; }>();
  
  return (
    <div>secured {name}</div>
  );
};

export default Page;
