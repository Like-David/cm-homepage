// npm import
import React from 'react';
// component import
import MainImg from '@/elements/Index/MainImg';
import Info from '@/elements/Index/Info';
import Solutions from '@/elements/Index/Solutions';
import Partners from '@/elements/Index/Partners';
// assets import
import '@/styles/Index.css';

function Index() {
    return (
        <>
            <MainImg/>
            <Info/>
            <Solutions/>
            <Partners/>
        </>
    );
}

export default Index;
