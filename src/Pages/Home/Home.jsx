import React from 'react';
import ParallaxBanner from '../Shared/ParallaxBanner';
import PetCategories from '../../components/PetCategories';
import Banner from '../../components/Banner';
import LatestPets from '../../components/LatestPets';

const Home = () => {
    return (
        <div className='pt-20'>
            <Banner></Banner>
            <LatestPets></LatestPets>
            <PetCategories></PetCategories>
           <ParallaxBanner></ParallaxBanner>
        </div>
    );
};

export default Home;