import React, { useState, useEffect, Fragment } from "react";
import { motion, useAnimation } from 'framer-motion';
import inRange from 'lodash.inrange';
import Article from "./Article";
import useWindowSize from "../hooks/useWindowSize";
import { AutoSizer, Grid } from 'react-virtualized';
import 'react-virtualized/styles.css';

import ArrowLeft from '../public/icons/arrow-left.svg';
import ArrowRight from '../public/icons/arrow-right.svg';

const ArticleSlider = ({ articles }) => {
    const [index, setIndex] = useState(0);
    const [slideOffset, setSlideOffset] = useState(120);
    const viewport = useWindowSize();
    const controls = useAnimation();

    const swipeConfidenceThreshold = 10000;
    const canSlideRender = (i) => inRange(i, index - 5, index + 5);
    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

    const variants = {
        prev: {
            scale: 0.9,
            x: -slideOffset,
            zIndex: 0
        },
        current: {
            scale: 1,
            zIndex: 1,
            x: 0
        },
        next: {
            scale: 0.9,
            x: slideOffset,
            zIndex: 0
        }
    }

    const goNext = () => {
        if (index < articles.length) {
            setIndex(index + 1);
        }
    }

    const goPrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    const scrollToPos = (i) => {
        setIndex(i);
    }

    const onDragEnd = (e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
            goNext();
        } else if (swipe > swipeConfidenceThreshold) {
            goPrev();
        }
    }

    useEffect(() => {
        let slideOffset = 45;
        if (viewport.width > 1200) {
            slideOffset = 120;
        } else if (viewport.width > 700) {
            slideOffset = 75;
        }
        setSlideOffset(slideOffset);
        controls.start((i) => {
            if (i < index) {
                return "prev";
            } else if (i > index) {
                return "next";
            }
            return "current";
        });
    }, [viewport, index]);

    const dotRenderer = ({ columnIndex, style, key }) => {
        return (
            <div onClick={() => scrollToPos(columnIndex)} className={'dot ' + (columnIndex == index ? 'dot__current' : '')} style={style} key={key}>
                <span>{columnIndex + 1}</span>
            </div>
        );
    };

    return (
        <div className="articles-slider">
            <div className="container">
                <div className="articles-slider__intro">
                    <h3 className="center uppercase text-green font-semi-bold mb-5">Visita guiada por el código de familias</h3>
                    <p className="font-regular center mx">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
                <div className="articles-slider__dots">
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <Grid
                                height={48}
                                rowHeight={32}
                                rowCount={1}
                                columnCount={articles.length}
                                columnWidth={48}
                                cellRenderer={dotRenderer}
                                width={width}
                                scrollToColumn={index}
                            />
                        )}
                    </AutoSizer>

                </div>
                <div className="articles-slider__counter">
                    <h5 className="text-green mt-0">{articles.length} artículos</h5>
                </div>
                <div className="articles-slider__slider">
                    <div className="controls">
                        {
                            index > 0 && (
                                <span className="control control__prev" onClick={goPrev}>
                                    <ArrowLeft></ArrowLeft>
                                </span>
                            )
                        }
                        {
                            index < articles.length - 1 && (
                                <span className="control control__next" onClick={goNext}>
                                    <ArrowRight></ArrowRight>
                                </span>
                            )
                        }
                    </div>
                    {articles.map((article, i) => (
                        canSlideRender(i) && (
                            <motion.div layout className={'slide ' + (i == index ? 'slide__current' : '')}
                                key={i}
                                custom={i}
                                variants={variants}
                                animate={controls}
                                //initial="current"
                                transition={{
                                    type: 'spring',
                                    duration: 0.40
                                }}
                                drag='x'
                                dragElastic={0.2}
                                dragConstraints={{
                                    left: 0,
                                    right: 0
                                }}
                                dragSnapToOrigin={true}
                                onDragEnd={onDragEnd}
                            >
                                <Article {...article} />
                            </motion.div>
                        )
                    ))}
                </div>
                <div className="articles-slider__download">
                    <button className="button">Descargar PDF</button>
                </div>
            </div>
        </div>
    );
}

export default ArticleSlider;