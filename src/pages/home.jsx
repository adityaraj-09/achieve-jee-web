
import React from 'react'

import SHeader from '../components/s_header';
import Header from '../components/header/header';
import Slider_link from '../components/home/slider_link';
import Courses from '../components/home/courses';
import Features from '../components/home/features';
import Legacies from '../components/home/legacies';

const HomePage = () => {
  return (
    <>
    <SHeader/>
    <Header/>
    <Slider_link/>
    <Courses/>
    <Features/>
    <Legacies/>
    </>
  )
}

export default HomePage