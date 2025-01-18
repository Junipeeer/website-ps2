import Cube from '../components/Cube'
import {motion as m} from 'framer-motion'

const Home = () => {
  return (
    <m.div 
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="page"
    >
      <Cube />
    </m.div>
  );
};

export default Home;