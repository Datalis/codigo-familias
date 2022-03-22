import { wrap, interpolate } from 'popmotion'
import { motion, useAnimation } from 'framer-motion'
import React, { useRef } from 'react';

import ArrowLeft from '../../public/icons/arrow-left.svg';
import ArrowRight from '../../public/icons/arrow-right.svg';
import { useEffect, useState } from 'react';

const Slider = ({ children }) => {

    const swipeConfidenceThreshold = 10000;

    const [index, setIndex] = useState(0);

    const [canGoNext, setCanGoNext] = useState(true);
    const [canGoPrev, setCanGoPrev] = useState(false);

    const controller = useAnimation();

    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const showNext = () => {
        setIndex(index + 1);
    }

    const showPrev = () => {
        setIndex(index - 1);
    }

    useEffect(() => {
        setCanGoNext(index < slides.length - 1);
        setCanGoPrev(index > 0);
        controller.start(i => {
            let x = 0;
            let scale = 1;
            let z = 1;
            if (i < index) {
                x = -150;
                scale = .8;
                z = 0;
            }
            if (i > index) {
                x = 150;
                scale = .8
                z = 0
            }
            return { x, scale, zIndex: z }
        })
    }, [index]);

    const slides = React.Children.map(children, (child, index) => {
        return (
            <motion.div layout className='slide'
                key={index}
                custom={index}
                animate={controller}
                drag='x'
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                        showNext();
                    } else if (swipe > swipeConfidenceThreshold) {
                        showPrev();
                    }
                }}
                whileDrag={{ scale: 1.01 }}
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                dragSnapToOrigin={true}>
                <div className='slide-content'>
                    {React.cloneElement(child)}
                </div>
            </motion.div>
        );
    });

    return (
        <div className='slider'>
            <div className="slider-controls">
                {
                    canGoPrev && (
                        <span className="slider-control slider-control-prev" onClick={showPrev}>
                            <ArrowLeft></ArrowLeft>
                        </span>
                    )
                }
                {
                    canGoNext && (
                        <span className="slider-control slider-control-next" onClick={showNext}>
                            <ArrowRight></ArrowRight>
                        </span>
                    )
                }
            </div>
            {slides}
        </div>
    );
}

export default Slider;