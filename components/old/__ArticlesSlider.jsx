import React, { useState, useEffect, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import Article from "./Article";
import useWindowSize from "../hooks/useWindowSize";
import { AutoSizer, Grid } from "react-virtualized";
import "react-virtualized/styles.css";

import ArrowLeft from "../public/icons/arrow-left.svg";
import ArrowRight from "../public/icons/arrow-right.svg";
import inRange from "lodash.inrange";

const X = ({ articles }) => {
  const swipeConfidenceThreshold = 10000;
  const slideRenderOffset = 5;

  const [index, setIndex] = useState(0);
  const [slideOffset, setSlideOffset] = useState(45);
  const [slideRange, setSlideRange] = useState({
    from: 0,
    to: slideRenderOffset,
  });
  const { width } = useWindowSize();

  const slideAnimation = useAnimation();
  slideAnimation.start((i) => {
    if (i < index) {
      return "prev";
    } else if (i > index) {
      return "next";
    }
    return "current";
  });

  /** Optimize slide rendering */
  const slideItems = useCallback(() => {
    const from = index < slideRenderOffset ? 0 : index - slideRenderOffset;
    const to =
      index + slideRenderOffset > articles.length
        ? articles.length
        : index + slideRenderOffset;
    return articles.slice(from, to);
  }, [index, articles]);

  const slideVariants = {
    prev: {
      scale: 0.9,
      x: -slideOffset,
      zIndex: "auto",
    },
    current: {
      scale: 1,
      x: 0,
      zIndex: 1,
    },
    next: {
      scale: 0.9,
      x: slideOffset,
      zIndex: "auto",
    },
    transition: {
      zIndex: {
        delay: 0.8,
      },
    },
  };

  const goNext = () => {
    if (index < articles.length) {
      const nextItems = articles.slice(index + 1);
      const nextCommented = nextItems.filter((e) => !!e.comentario);
      const nextIndex = nextCommented.length
        ? articles.findIndex((e) => e._id == nextCommented[0]._id)
        : 0;
      setIndex(index + 1);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const onDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset) * velocity;
    if (swipe < -swipeConfidenceThreshold) {
      goNext();
    } else if (swipe > swipeConfidenceThreshold) {
      goPrev();
    }
  };

  useEffect(() => {
    slideAnimation.start((i) => {
      if (i < index) {
        return "prev";
      } else if (i > index) {
        return "next";
      }
      return "current";
    });
    if (width > 1200) {
      setSlideOffset(120);
    } else if (width > 700) {
      setSlideOffset(75);
    } else {
      setSlideOffset(45);
    }
  }, [width, index, slideAnimation]);

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

  const SlideItem = React.memo(({index, children}) => {
    return (
      <div className="slide">
        {React.cloneElement(children)}
      </div>
    );
  });

  SlideItem.displayName = "slideItem"

  return (
    <div className="articles-slider">
      <div className="container">
        <div className="articles-slider__intro">
          <h3 className="center uppercase text-green font-semi-bold mb-5">
            Visita guiada por el código de familias
          </h3>
          <p className="font-regular center mx">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
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
            {index > 0 && (
              <span className="control control__prev" onClick={goPrev}>
                <ArrowLeft></ArrowLeft>
              </span>
            )}
            {index < articles.length - 1 && (
              <span className="control control__next" onClick={goNext}>
                <ArrowRight></ArrowRight>
              </span>
            )}
          </div>
          {articles.map((e, i) => (
            <motion.div
              custom={e._id}
              key={e._id}
              style={{
                display: inRange(i, 0, 50) ? 'flex' : 'none'
              }}
              className={"slide " + (i == index ? "slide__current" : "")}
              variants={slideVariants}
              animate={slideAnimation}
            >
              <Article {...e} />
            </motion.div>
          ))}
          {/*articles.map(
              (article, i) =>
                i < 10 && ( 
                  <motion.div
                    className={"slide " + (i == index ? "slide__current" : "")}
                    key={i}
                    custom={i}
                    variants={slideVariants}
                    animate={controls}
                    initial={{
                      scale: 0.9,
                    }}
                    transition={{
                      type: "spring",
                      damping: 20,
                      stiffness: 80,
                      duration: 0.75,
                      zIndex: {
                        duration: 0.5,
                      },
                    }}
                    //exit={{ opacity: 0, scale: 0 }}
                    drag="x"
                    dragElastic={0.2}
                    dragConstraints={{
                      left: 0,
                      right: 0,
                    }}z
                    dragSnapToOrigin={true}
                    onDragEnd={onDragEnd}
                    layout
                  >
                    <Article {...article} />
                  </motion.div>
                )
                )*/}
        </div>
        <div className="articles-slider__download">
          <button className="button">Descargar PDF</button>
        </div>
      </div>
    </div>
  );
};

export default X;
