// npm import
import React from 'react';
// component import
import MainImg from '@/components/HomePage/MainImg';
import Info from '@/components/HomePage/Info';
import Solutions from '@/components/HomePage/Solutions';
// assets import
import '@/styles/Index.css';

function Index() {
    return (
        <>
            <MainImg/>
            <Info/>
            <Solutions/>
        </>
    );
}

export default Index;
