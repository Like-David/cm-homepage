// npm import
import React from 'react';
// component import
import IntroduceImg from '@/elements/About/IntroduceImg';
import Introduce from '@/elements/About/Introduce';
import Value from '@/elements/About/Value';
import CEO from '@/elements/About/CEO';
import History from '@/elements/About/History';
// assets import
import '@/styles/About.css';

function About() {
  return (
      <>
          <IntroduceImg/>
          <Introduce/>
          <Value/>
          <History/>
          <CEO/>
      </>
  );
}

export default About;