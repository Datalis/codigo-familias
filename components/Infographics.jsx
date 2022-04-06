import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { motion, useMotionValue } from 'framer-motion';

import img1 from '../public/images/infographics/1.jpg';
import img2 from '../public/images/infographics/2.jpg';
import img3 from '../public/images/infographics/3.jpg';
import img4 from '../public/images/infographics/4.jpg';
import img5 from '../public/images/infographics/5.jpg';
import useWindowSize from '../hooks/useWindowSize';

const data = [
    <div key={1} style={{ margin: '1rem' }}>
        <Image src={img1} alt="" />
    </div>,
    <div key={1} style={{ margin: '1rem' }}>
        <Image src={img2} alt="" />
    </div>,
    <div key={1} style={{ margin: '1rem' }}>
        <Image src={img3} alt="" />
    </div>,
    <div key={1} style={{ margin: '1rem' }}>
        <Image src={img4} alt="" />
    </div>
]

const infographics = [
    img1,
    img2,
    img3,
    img4,
    img5,
]


const Infographics = () => {
    const { width } = useWindowSize();
    const containerRef = useRef();
    const [offset, setOffset] = useState();
    const [index, setIndex] = useState(0);  

    useEffect(() => {
        const containerWidth = containerRef.current?.clientWidth || 0;
        setOffset(containerWidth / 6);
    }, [width])

    return (
        <div className="infographics">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="uppercase mb-4 text-green font-semi-bold center">El código en imágenes</h3>
                        <div className="divider"></div>
                    </div>
                    <AliceCarousel 
                        activeIndex={0}
                        disableDotsControls={true} 
                        disableButtonsControls={true} 
                        items={data} 
                        responsive={{
                        0: {
                            items: 1
                        },
                        960: {
                            items: 4
                        }
                    }} />
                    <div className='infographics__carousel mt-8' ref={containerRef}>
                        <motion.div style={{
                            display: 'flex',
                            flexFlow: 'row',
                            
                        }}>
                            {infographics.map((e, i) => (
                                <motion.div style={{
                                    flex: "none",
                                    position: 'absolute',
                                    width: 400,
                                    height: 400,
                                    x: (i * offset),
                                    overflow: 'hidden',
                                    borderRadius: 18,
                                    zIndex: infographics.length - i,
                                    scale: index == i ? 1 : 0.9
                                }} key={i}>
                                    <Image src={e} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Infographics;