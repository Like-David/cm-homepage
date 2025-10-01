import React from 'react';
import Image from 'react-bootstrap/Image';
import BusinessImg from '@/assets/images/HomePage/Business.jpg';
import '@/styles/Index.css';
import CounterDisplay from './CounterDisplay';
import { InView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// Placeholder images for the center overlay
import Image1 from '@/assets/images/HomePage/Bnk.png'; // Replace with actual image paths
import Image3 from '@/assets/images/HomePage/Kiup.png'; // Replace with actual image paths


function Business() {
    const overlayImages = [Image1, Image3]; // Add more images here

    return (
        <InView triggerOnce={'true'}>
            {({ inView, ref }) => (
                <div ref={ref} className={`animate-container ${inView ? 'animate-in' : ''}`}>
                    <div className="business-title-overlay">
                        <span role="img" aria-label="briefcase">💼</span> Our Business
                    </div>
                    <div className="business-container">
                        <Image src={BusinessImg} className="business-image" />
                        <div className="overlay-content-wrapper">
                            <CounterDisplay emoji="🚀" text="Our Achievements" endCount={12345} />
                            <div className="center-overlay-image-container">
                                <Swiper
                                    spaceBetween={0}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    className="centerOverlaySwiper"
                                >
                                    {overlayImages.map((img, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={img} alt={`Overlay Image ${index + 1}`} className="center-overlay-image" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <CounterDisplay emoji="🤝" text="Happy Clients" endCount={9876} />
                        </div>
                    </div>
                </div>
            )}
        </InView>
    );
}

export default Business;