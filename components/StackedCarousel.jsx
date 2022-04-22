import React, { useCallback, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

import ArrowLeft from "../public/icons/arrow-left.svg";
import ArrowRight from "../public/icons/arrow-right.svg";
import { useAnimation } from "framer-motion";
import { AutoSizer } from 'react-virtualized';
import { Grid } from 'react-virtualized';
import Article from "./Article";

const setSlideStatus = (indexes, index) => {
  if (indexes.current === index) {
    return "active";
  } else if (indexes.next === index) {
    return `next`;
  } else if (indexes.prev === index) {
    return `prev`;
  }
  return `inactive`;
};

const shouldRender = (indexes, index) => {
  if (index == indexes.prev || index == indexes.prev - 1 || index === indexes.current || index === indexes.next || index === indexes.next + 1) return true;
  return false;
}

const StackedCarousel = ({ children, data }) => {

  //const items = React.Children.toArray(children);
  const comments = useMemo(
    () => data.filter((e) => !!e.comentario),
    [data]
  );

  const _items = useMemo(
    () =>
      data.map((e) => {
        return {
          ...e,
          comentarioIndex: comments.findIndex((i) => i._id == e._id),
          comentarioTotal: comments.length,
        };
      }),
    [data, comments]
  );

  const items = _items.map(e => (<Article {...e} key={e._id} />));

  const controls = useAnimation();

  const [indexes, setIndexes] = useState({
    prev: 0,
    current: 1,
    next: 2,
  });

  useEffect(() => {
    controls.start(
      (i) => {
        const isActive = i == indexes.current;
        const isPrev = i == indexes.prev;
        const isNext = i == indexes.next;

        const direction = i - indexes.current < 0 ? -1 : 1;

        let x = 0;
        let zIndex = 1;
        let opacity = 0;
        let display = 'flex';
        let boxShadow = '0 0 0 rgba(0, 0, 0, 0)';
        let scale = .9;

        if (isActive) {
          x = 0;
          zIndex = 3;
          display = 'flex';
          boxShadow = '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)';
          scale = 1;
          opacity = 1;
        } else if (isNext) {
          x = 100;
          zIndex = 2;
          display = 'flex';
          boxShadow = '0 10px 5px rgba(0, 0, 0, 0.1)';
          scale = .9;
          opacity = .8;
        } else if (isPrev) {
          x = -100;
          zIndex = 2;
          display = 'flex';
          boxShadow = '0 10px 5px rgba(0, 0, 0, 0.1)';
          scale = .9;
          opacity = .8;
        } else {
          x = direction * 200;
        }

        return {
          x,
          zIndex,
          opacity,
          display,
          scale,
          boxShadow
        }
      },
      {
        duration: 0.25,
        ease: "easeInOut",
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes.current]);

  const handleNext = useCallback(() => {

    const toIndex = getNextComment();
    handleToIndex(toIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes.current]);

  const handlePrev = useCallback(() => {
    const index = getPrevComment();
    handleToIndex(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes.current]);

  const handleToIndex = useCallback((index) => {
    setIndexes((prevState) => {
      return {
        prev: index - 1,
        current: index,
        next: index + 1
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexes.current]);

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;

    if (swipe < -10000) {
        handleNext();
    } else if (swipe > 10000) {
        handlePrev();
    }
}

  const getNextComment = () => {
    const _next = data.slice(indexes.current + 1);
    const _nextCommented = _next.find((e) => !!e.comentario);
    const _index = data.findIndex((e) => e._id == _nextCommented._id);
    return _index;
  };

  const getPrevComment = () => {
    const _prev = data.slice(0, indexes.current - 1);
    const _prevCommented = _prev.reverse().find((e) => !!e.comentario);
    const _index = _prevCommented
      ? data.findIndex((e) => e._id == _prevCommented._id)
      : indexes.current - 1;
    return _index;
  };

  return (
    <div className="stacked-carousel">
      <div className="dots">
        <AutoSizer disableHeight>
          {({ width }) => (
            <Grid
              height={48}
              rowHeight={32}
              rowCount={1}
              columnCount={items.length}
              columnWidth={48}
              cellRenderer={({ columnIndex, style, key }) => {
                return (
                  <div
                    onClick={() => handleToIndex(columnIndex)}
                    className={
                      "dot" + (columnIndex == indexes.current ? " dot__current" : "")
                    }
                    style={style}
                    key={key}
                  >
                    <span>{columnIndex + 1}</span>
                  </div>
                );
              }}
              width={width}
              scrollToColumn={indexes.current}
            />
          )}
        </AutoSizer>
      </div>
      <div className="guided-visit__counter">
          <h5 className="text-green mt-0">{items.length} artículos</h5>
        </div>
      <div className="controls">
        {indexes.current > 0 && (
          <span className="control control__prev">
            <ArrowLeft onClick={handlePrev}></ArrowLeft>
          </span>
        )}
        {indexes.current < items.length - 1 && (
          <span className="control control__next">
            <ArrowRight onClick={handleNext}></ArrowRight>
          </span>
        )}
      </div>
      <motion.ul className="track" layout>
        {items.map(
          (e, i) =>
            shouldRender(indexes, i) && (
              <motion.li
                layoutId={e._id}
                custom={i}
                key={`${e._id}-${i}`}
                className={`slide`}
                animate={controls}
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                dragElastic={0.2}
                dragSnapToOrigin={true}
                onDragEnd={handleDragEnd}
              >
                {e}
              </motion.li>
            )
        )}
      </motion.ul>
    </div>
  );
};

export default StackedCarousel;
