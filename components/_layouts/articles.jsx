
import Article from "../_components/article";

import ArrowLeft from '../../public/icons/arrow-left.svg';
import ArrowRight from '../../public/icons/arrow-right.svg';
import useWindowSize from '../../hooks/useWindowSize';

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, useTransform, useViewportScroll } from 'framer-motion'


const ArticleSlider = ({ articles = [] }) => {

    const swipeConfidenceThreshold = 10000;
    
    const containerRef = useRef();
    const size = useWindowSize();
    const { scrollY } = useViewportScroll();
    const offset = useTransform(scrollY, value => value * 0.2 * -1);

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

    const checkIsVisible = (i) => i == index;

    useEffect(() => {
        setCanGoNext(index < articles.length - 1);
        setCanGoPrev(index > 0);

        let slideOffset = 45;
        if (size.width > 1200) {
            slideOffset = 150;
        } else if (size.width > 700) {
            slideOffset = 75;
        }

        controller.start(i => {
            let x = 0;
            let scale = 1;
            let z = 1;
            if (i < index) {
                x = -slideOffset;
                scale = .8;
                z = 0;
            }
            if (i > index) {
                x = slideOffset;
                scale = .8
                z = 0
            }
            return { x, scale, zIndex: z }
        })
    }, [index, size]);

    return (
        <div className="articles" >
            <motion.div style={{y: offset}}>
                <div className="container">
                    <div className="container">
                        <div className="articles__intro">
                            <h3 className="center uppercase text-green font-semi-bold mb-5">Visita guiada por el código de familias</h3>
                            <p className="font-regular center mx">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        </div>
                        <motion.div className="articles__dots">
                            {
                                articles.map((e, i) => (
                                    <div key={i} onClick={() => setIndex(i)} className={`articles__dots--dot ${i == index ? 'current' : ''}`}>{i + 1}</div>
                                ))
                            }
                        </motion.div>
                        <div className="articles__range">
                            <input type="range" value={index} onChange={(e) => setIndex(e.target.value)} min={0} max={articles.length -1} step={1} />
                        </div>
                        <div className="flex mb-4">
                            <span className="ml-auto font-bold text-green">{articles.length} artículos</span>
                        </div>
                    </div>
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
                        {articles.map((e, i) => (
                            <motion.div layout className={`slide ${checkIsVisible(i) ? 'with-shadow' : ''}`}
                                key={i}
                                custom={i}
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
                                    <Article {...e}></Article>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="center">
                        <button type="button" className="articles__download">Descargar pdf</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default ArticleSlider;

/*const ArticleSlider = () => {

    
    const index = useRef(0);

    //const transition = useTransition();

    const animSlide = (i) => {
        let x = 0;
        let scale = 1;
        let opacity = 1;
        let z = 1;
        if (i > index.current) {
            x = 150;
            scale = 0.8;
            z = 0
        }
        if (i < index.current) {
            x = -150;
            scale = 0.8;
            z = 0
        }
        return { opacity, scale, x, z };
    }

    const [ref, { width }] = useMeasure();
    const [springs, api] = useSprings(articles.length, i => animSlide(i), [width])

    const bind = useDrag(({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
        console.log(mx, xDir, width)
        if (active && distance > width / 2) {
            index.current = clamp(index.current + (xDir > 0 ? -1 : 1), 0, articles.length - 1)
            cancel()
        }
        api.start(i => animSlide(i));
    });

    const showPrev = () => {
        if (index.current !== 0)
            index.current -= 1;
            api.start(i => animSlide(i));
    }

    const showNext = () => {
        if (index.current !== articles.length - 1)
            index.current += 1;
            api.start(i => animSlide(i));
    }

    return (
        <div className="article-slider">
            <div className="container">
                <h3 className="center uppercase text-green font-semi-bold">Visita guiada por el código de familias</h3>

                <div className="slider" ref={ref}>
                    <div className="slider-controls">
                        <span className="slider-control slider-control-prev" onClick={showPrev}>
                            <ArrowLeft></ArrowLeft>
                        </span>
                        <span className="slider-control slider-control-next" onClick={showNext}>
                            <ArrowRight></ArrowRight>
                        </span>
                    </div>
                    {
                        springs.map(({ opacity, scale, x, z }, i) => (
                            <animated.div {...bind()} key={i} className='slide' style={{ scale, x, zIndex: z }}>
                                <Article {...articles[i]}></Article>
                            </animated.div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ArticleSlider;*/