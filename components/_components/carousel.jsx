import { motion, motionValue, useAnimation, useMotionValue, useTransform } from 'framer-motion'
import clamp from 'lodash.clamp';
import React, { useState, useEffect } from 'react';
import useWindowSize from '../../hooks/useWindowSize';


const Carousel = ({ children }) => {
    const [index, setIndex] = useState(0);
    const size = useWindowSize();
    const controls = useAnimation();


    useEffect(() => {
        controls.start((i) => {
            const diff = i - index;
            const z = 1;
            let x = 0;
            if (size.width > 700) {
                x = diff * 50;
            }
            return {
                x,
                zIndex: 5 - Math.abs(diff),
                scale: i == index ? 1.1 : 1
            }
        });
    }, [index, size]);

    const slides = React.Children.map(children, (e, i) => (
        <motion.div className='carousel__item' custom={i} animate={controls}>
            {React.cloneElement(e)}
        </motion.div>
    ))

    return (
        <div className='carousel-container'>
            <motion.div className='carousel'>
                {slides}
            </motion.div>
            <div className="range">
                <input type="range" onChange={(e) => setIndex(e.target.value)} value={index} min={0} max={slides.length - 1} step={1}/>
            </div>
        </div>
    );
}

export default Carousel;