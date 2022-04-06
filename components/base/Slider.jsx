import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

import ArrowLeft from "../../public/icons/arrow-left.svg";
import ArrowRight from "../../public/icons/arrow-right.svg";
import { AutoSizer, Grid } from "react-virtualized";

// eslint-disable-next-line react/display-name
const SliderContainer = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexFlow: "column"
        }}
    >
        {props.children}
    </div>
));

const Slide = ({ x, idx, currentIdx, children }) => {
    const SLIDE_SHADOW = '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)';

    const isCurrent = idx == currentIdx;
    const isVisible = Math.abs(idx - currentIdx) < 5;
    
    const styles = useMemo(() => {
        return {
            scale: isCurrent ? 1 : 0.9,
            boxShadow: isCurrent ? SLIDE_SHADOW : '0 0 5px 2px rgba(0,0,0,0.05)',
            zIndex: isCurrent ? 1 : 'auto',
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIdx])

    return (
        <motion.div
            className="slide"
            style={{
                width: "100%",
                height: "100%",
                flex: "none",
                contentVisibility: 'auto',
                x,
            }}
            animate={{
                ...styles,
            }}>
            {children}
        </motion.div>
    );
}

// eslint-disable-next-line react/display-name
const _Slide = React.memo(({ x, onDragEnd, idx, currentIdx, offset, children }) => {
    const SLIDE_SHADOW = '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)';


    //const shouldRender = useMemo(() => Math.abs(idx - currentIdx) < 5, [currentIdx]);

    return (
        <motion.div
            className="slide"
            style={{
                width: "100%",
                height: "100%",
                flex: "none",
                contentVisibility: 'auto',
                x,
            }}
            animate={{
                scale: isCurrent ? 1 : 0.9,
                boxShadow: isCurrent ? SLIDE_SHADOW : '0 0 5px 2px rgba(0,0,0,0.1)',
                zIndex: isCurrent ? 1 : 'auto',
                //opacity: isVisible ? 1 : 0,
                //display: shouldRender ? 'flex' : 'none'
            }}
            onDragEnd={onDragEnd}>
            {children}
        </motion.div>
    );
});

const transition = {
    type: "spring",
    bounce: 0,
}

const swipeConfidenceThreshold = 1000;

const Slider = ({ children }) => {

    const slidesOffset = 100;

    const x = useMotionValue(0);

    const sliderRef = useRef();
    const [index, setIndex] = useState(0);

    const childrens = React.Children.toArray(children);

    const calculateNewX = () =>
        -index * (sliderRef.current?.clientWidth || 0)

    const handleEndDrag = (e, { offset, velocity }) => {
        const clientWidth = sliderRef.current?.clientWidth || 0;
        const swipe = Math.abs(offset.x) * velocity.x;

        console.log(swipe);

        console.log(offset.x);

        if (offset.x > clientWidth / 4) {
            handlePrev()
        } else if (offset.x < -clientWidth / 4) {
            handleNext()
        }

        /*console.log(swipe);

        if (offset.x > clientWidth / 4) {
            handlePrev()
        } else if (offset.x < -clientWidth / 4) {
            handleNext()
        } else {
            animate(x, calculateNewX(), transition)
        }*/
    }

    const handleNext = () => {
        if (index + 1 !== childrens.length) {
            setIndex(index + 1)
        }

    }

    const handlePrev = () => {
        if (index != 0) {
            setIndex(index - 1)
        }
    }

    const dotRenderer = ({ columnIndex, style, key }) => {
        return (
            <div
                onClick={() => setIndex(columnIndex)}
                className={"dot " + (columnIndex == index ? "dot__current" : "")}
                style={style}
                key={key}
            >
                <span>{columnIndex + 1}</span>
            </div>
        );
    };

    useEffect(() => {
        const controls = animate(x, calculateNewX(), transition);
        return controls.stop;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    return (
        <SliderContainer ref={sliderRef}>
            <div className="slider__container">

                <div className="dots">
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <Grid
                                height={48}
                                rowHeight={32}
                                rowCount={1}
                                columnCount={childrens.length}
                                columnWidth={48}
                                cellRenderer={dotRenderer}
                                width={width}
                                scrollToColumn={index}
                            />
                        )}
                    </AutoSizer>
                </div>

                <div className="counter">
                    <h5 className="text-green mt-0">{childrens.length} artículos</h5>
                </div>
                <div className="slides">
                    <div className="controls">
                        {index > 0 && (
                            <span className="control control__prev" onClick={handlePrev}>
                                <ArrowLeft></ArrowLeft>
                            </span>
                        )}
                        {index < childrens.length - 1 && (
                            <span className="control control__next" >
                                <ArrowRight onClick={handleNext}></ArrowRight>
                            </span>
                        )}
                    </div>
                    <motion.div
                        drag="x"
                        dragElastic={0.1}
                        dragConstraints={{
                            left: 0,
                            right: 0
                        }}
                        onDragEnd={handleEndDrag}
                        style={{
                            display: 'flex',
                            width: '100%',
                            height: '100%'
                        }}>
                        {
                            childrens.map((e, i) => (
                                <Slide onDragEnd={handleEndDrag} key={e.key} x={x} idx={i} currentIdx={index} offset={slidesOffset}>
                                    {e}
                                </Slide>
                            ))
                        }
                    </motion.div>
                </div>
            </div>
        </SliderContainer>
    );
}

export default Slider;