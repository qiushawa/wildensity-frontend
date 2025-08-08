import React from 'react';
import AreaMap from '../components/MapComponents/AreaMap';
const Home: React.FC = () => {
  return (
    <>
    <div className='h-[500px] '>
  <AreaMap />
    </div>
    
      <h1>野生動物密度觀測</h1>
      <p>保護瀕危物種及其棲息地</p>
    </>
  );
};

export default Home;