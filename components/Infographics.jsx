import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ArrowLeft from "../public/icons/arrow-left.svg";
import ArrowRight from "../public/icons/arrow-right.svg";
import { AnimatePresence, motion } from "framer-motion";

import group1_1 from "../public/images/infographics/1/1.jpg";
import group1_2 from "../public/images/infographics/1/2.jpg";
import group1_3 from "../public/images/infographics/1/3.jpg";
import group1_4 from "../public/images/infographics/1/4.jpg";
import group1_5 from "../public/images/infographics/1/5.jpg";

import group2_1 from "../public/images/infographics/2/1.jpg";
import group2_2 from "../public/images/infographics/2/2.jpg";
import group2_3 from "../public/images/infographics/2/3.jpg";
import group2_4 from "../public/images/infographics/2/4.jpg";

import group3_1 from "../public/images/infographics/3/1.jpg";
import group3_2 from "../public/images/infographics/3/2.jpg";
import group3_3 from "../public/images/infographics/3/3.jpg";
import group3_4 from "../public/images/infographics/3/4.jpg";
import group3_5 from "../public/images/infographics/3/5.jpg";

import useWindowSize from "../hooks/useWindowSize";

import intro1 from '../public/images/infographics/1/0.jpg';
import intro2 from '../public/images/infographics/2/0.jpg';
import intro3 from '../public/images/infographics/3/0.jpg';


const group1 = [
  intro1,
  group1_1,
  group1_2,
  group1_3,
  group1_4,
  group1_5,
]

const group2 = [
  intro2,
  group2_1,
  group2_2,
  group2_3,
  group2_4,
]

const group3 = [
  intro3,
  group3_1,
  group3_2,
  group3_3,
  group3_4,
  group3_5,
]

const intros = [
  intro1,
  intro2,
  intro3
]

const groups = [
  group1,
  group2,
  group3
]

const Infographics = () => {
  const viewport = useWindowSize();

  const introRef = useRef();
  const carouselRef = useRef();

  const [carouselItemOffset, setCarouselItemOffset] = useState(0);
  const [introItemWidth, setIntroItemWidth] = useState(300);
  const [carouselItemWidth, setCarouselItemWidth] = useState(300);
  //const [introDragOffset, setIntroDragOffset] = useState(0);

  const [currentGroup, setCurrentGroup] = useState(null);
  const [currentItem, setCurrentItem] = useState(0);

  const [isSmallScreen, setIsSmallScreen] = useState(true);
  const [enableIntroDrag, setEnableIntroDrag] = useState(false);

  const calculateItemZIndex = (index) => {
    const max = groups[currentGroup].length;
    if (currentItem == index) return max;
    if (index > currentItem) return max - index;
    else if (index < currentItem) return max - (max - index);
  }

  const handleToggleGroup = (i) => {
    if (i == currentGroup) {
      setCurrentGroup(null);
    } else {
      setCurrentGroup(i);
    }
    setCurrentItem(0);
  }

  useEffect(() => {
    if (viewport.width > 501) {
      setIsSmallScreen(false);
    } else {
      setIsSmallScreen(true);
    }

    if (viewport.width > 501) {
      setCarouselItemWidth(500);
      const currentGroupLength = groups[currentGroup]?.length || 0;
      setCarouselItemOffset((carouselRef.current?.clientWidth / currentGroupLength) - (500 / (currentGroupLength + 1)));
    } else {
      setCarouselItemWidth(carouselRef.current?.clientWidth);
      setCarouselItemOffset(0);
    }

    if (viewport.width > 960) {
      setIntroItemWidth(300);
      //setIntroDragOffset(viewport.width - introRef.current?.clientWidth );
    } else if (viewport.width > 501) {
      setIntroItemWidth((viewport.width || 0) / 3);
      //setIntroDragOffset(viewport.width / 3);
    } else {
      setIntroItemWidth(150);
      //setIntroDragOffset(viewport.width - 150);
    }

    if (viewport.width > 501) {
      setEnableIntroDrag(false);
    } else {
      setEnableIntroDrag(true);
    }
  }, [viewport, currentGroup]);

  const handlePrevItem = () => {
    if (currentItem !== 0) {
      setCurrentItem(--currentItem);
    }
  }

  const handleNextItem = () => {
    const currentGroupLength = groups[currentGroup]?.length || 0;
    if (currentItem !== currentGroupLength - 1) {
      setCurrentItem(++currentItem);
    }
  }

  return (
    <div className="infographics">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="uppercase text-green font-semi-bold center">
              El código en imágenes
            </h3>
            <div className="divider"></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="infographics__intro" ref={introRef}>
          <motion.div
            className="infographics__container"
            drag={enableIntroDrag ? 'x' : false}
            dragConstraints={introRef}
            dragElastic={0.2}
            style={{
              x: 0,
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'nowrap',
              minWidth: 'min-content',
            }}>
            {intros.map((e, i) => (
              <motion.div
                className={`infographics__intro--item`}
                style={{
                  flex: 'none',
                  width: introItemWidth,
                  height: introItemWidth,
                  cursor: 'pointer'
                }}
                animate={{
                  scale: currentGroup == i ? 1 : 0.85
                }}
                key={i}
                onClick={() => handleToggleGroup(i)}>
                <motion.div className="image" animate={{
                  scale: currentGroup == i ? 0.90 : 1,
                  borderRadius: 20,
                  overflow: 'hidden',
                  height: '100%',
                  position: 'relative'
                }}>
                  <Image src={e} alt="" layout="fill" objectFit="contain" priority />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <motion.div
            className="infographics__carousel"
            ref={carouselRef}
            animate={{
              height: currentGroup == null ? 0 : carouselItemWidth,
              marginTop: currentGroup == null ? 0 : '3rem'
            }}>
            <AnimatePresence>
              {
                currentGroup !== null && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    style={{
                      display: "flex",
                      flexFlow: "row",
                      position: 'relative',
                      height: '100%'
                    }}
                  >
                    <div className="infographics__carousel--controls">
                      <div className="control control-left">
                        {currentItem !== 0 && (<ArrowLeft onClick={handlePrevItem}></ArrowLeft>)}
                      </div>
                      <div className="control control-right">
                        {currentItem !== (groups[currentGroup]?.length || 0) - 1 && (<ArrowRight onClick={handleNextItem}></ArrowRight>)}
                      </div>
                    </div>
                    {groups[currentGroup].map((e, i) => (
                      <motion.div
                        className={`infographics__carousel--item group-${currentGroup}`}
                        key={`${currentGroup}-${i}`}
                        exit={{ opacity: 0 }}
                        style={{
                          flex: "none",
                          position: "absolute",
                          width: carouselItemWidth,
                          height: carouselItemWidth,
                          borderRadius: 24,
                          overflow: "hidden",
                          x: i * carouselItemOffset,
                          cursor: 'pointer'
                        }}
                        animate={{
                          zIndex: calculateItemZIndex(i),
                          scale: currentItem == i ? 1 : 0.95,
                        }}
                        drag={isSmallScreen ? 'x' : false}
                        dragElastic={0.2}
                        dragConstraints={carouselRef}
                        onDragEnd={(e, { offset, velocity }) => {
                          const swipe = Math.abs(offset.x) * velocity.x;
                          if (swipe < -10000) {
                            if (currentItem < groups[currentGroup].length - 1) {
                              setCurrentItem(++currentItem);
                            }
                          } else if (swipe > 10000) {
                            if (currentItem > 0) {
                              setCurrentItem(--currentItem);
                            }
                          }
                        }}
                        onClick={() => setCurrentItem(i)}>
                        <Image src={e} alt="" layout="fill" objectFit="contain" priority />
                      </motion.div>
                    ))}
                  </motion.div>
                )
              }
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Infographics;
