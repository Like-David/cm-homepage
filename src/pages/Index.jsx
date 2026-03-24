// npm import
import React from 'react';
// component import
import IndexImg from '@/elements/Index/IndexImg';
import Info from '@/elements/Index/Info';
import Solutions from '@/elements/Index/Solutions';
import Partners from '@/elements/Index/Partners';
import ServiceCenter from '@/elements/Index/ServiceCenter';
// assets import
import '@/styles/Index.css';
// import '@/styles/Index.mobile.css';

function Index() {
    return (
        <>
            <IndexImg/>
            <Info/>
            <Solutions/>
            <Partners/>
            <ServiceCenter/>
        </>
    );
}

export default Index;
