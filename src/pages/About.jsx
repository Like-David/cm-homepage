// npm import
import React from 'react';
// component import
import IntroduceImg from '@/elements/About/IntroduceImg';
import Introduce from '@/elements/About/Introduce';
// assets import
import '@/styles/About.css';

function About() {
  return (
      <>
          <IntroduceImg/>
          <Introduce/>
      </>
  );
}

export default About;