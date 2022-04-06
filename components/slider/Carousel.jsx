import { animate, useMotionValue, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AutoSizer, Grid } from "react-virtualized";
import Slide from "./Slide";

import ArrowLeft from "../../public/icons/arrow-left.svg";
import ArrowRight from "../../public/icons/arrow-right.svg";

// eslint-disable-next-line react/display-name
const Container = React.forwardRef((props, ref) => (
    <div
        ref={ref}
        style={{
            position: "relative",
            width: "100%",
            height: "100%",
            //overflowX: "hidden",
            display: "flex",
            flexFlow: "column"
        }}
    >
        {props.children}
    </div>
));

const Carousel = ({
    children,
    loop = true,
}) => {
    const containerRef = useRef(null);
    const [index, setIndex] = useState(0);

    const handleEndDrag = (e, dragProps) => {
        const clientWidth = containerRef.current?.clientWidth || 0
        const { offset } = dragProps;
        if (offset.x > clientWidth / 4) {
            handlePrev()
        } else if (offset.x < -clientWidth / 4) {
            handleNext()
        }
    }

    const childrens = React.Children.toArray(children);

    const handleNext = () => {
        const idx = loop ? 0 : index;
        setIndex(index + 1 === childrens.length ? idx : index + 1)
    }

    const handlePrev = () => {
        const idx = loop ? childrens.length - 1 : 0;
        setIndex(index - 1 < 0 ? idx : index - 1)
    }

    const handleIndexChange = (idx) => {
        setIndex(idx);
    }

    const dotRenderer = ({ columnIndex, style, key }) => {
        return (
            <div
                onClick={() => handleIndexChange(columnIndex)}
                className={"dot " + (columnIndex == index ? "dot__current" : "")}
                style={style}
                key={key}
            >
                <span>{columnIndex + 1}</span>
            </div>
        );
    };

    return (
        <Container ref={containerRef}>
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

            <div className="counter mt-5">
                <span className="text-green mt-0 font-bold">{childrens.length} artículos</span>
            </div>

            <motion.div className="carousel mt-2" layout>
                <div className="controls">
                    {index > 0 && (
                        <span className="control control__prev" onClick={handlePrev}>
                            <ArrowLeft></ArrowLeft>
                        </span>
                    )}
                    {index < childrens.length - 1 && (
                        <span className="control control__next" onClick={handleNext}>
                            <ArrowRight></ArrowRight>
                        </span>
                    )}
                </div>
                {childrens.map((child, i) => (
                    <Slide onDragEnd={handleEndDrag} i={i} key={child.key} currentIndex={index} >
                        {child}
                    </Slide>
                ))}
            </motion.div>

            {/*childrens.map((child, i) => (
                    <Slide onDragEnd={handleEndDrag} i={i} key={child.key} currentIndex={index} >
                        {child}
                    </Slide>
                ))*/}
        </Container>
    );
};

export default Carousel;
