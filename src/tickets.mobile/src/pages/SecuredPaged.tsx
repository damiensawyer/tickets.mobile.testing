import { useParams } from 'react-router';

const Page: React.FC = () => {
    
  const { name } = useParams<{ name: string; }>();
  
  return (
    <div>secured {name}</div>
  );
};

export default Page;
