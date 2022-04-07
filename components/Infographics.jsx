import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import img1 from "../public/images/infographics/1.jpg";
import img2 from "../public/images/infographics/2.jpg";
import img3 from "../public/images/infographics/3.jpg";
import img4 from "../public/images/infographics/4.jpg";
import img5 from "../public/images/infographics/5.jpg";

import useWindowSize from "../hooks/useWindowSize";
import useMeasure from "react-use-measure";

const infographics = [img1, img2, img3, img4, img5];

const Infographics = () => {
  const viewport = useWindowSize();
  const containerRef = useRef();
  const [offset, setOffset] = useState();
  const [index, setIndex] = useState(0);

  const [topicIndex, setTopicIndex] = useState(0);

  const [topicsRef, topicsDimensions] = useMeasure();

  const topicsContainerRef = useRef();

  const topics = [
    {
      title: "Some topic",
      img: "/images/infographics/1.jpg",
    },
    {
      title: "Some topic",
      img: "/images/infographics/3.jpg",
    },
    {
      title: "Some topic",
      img: "/images/infographics/4.jpg",
    },
  ];

  useEffect(() => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    setOffset(containerWidth / 6);
  }, [viewport]);

  return (
    <div className="infographics">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 className="uppercase mb-4 text-green font-semi-bold center">
              El código en imágenes
            </h3>
            <div className="divider"></div>
          </div>
        </div>
        <div className="row">
          <div className="infographics__topics">
            {topics.map((e, i) => (
              <motion.div
                layout
                onClick={() => setIndex(i)}
                key={i}
                animate={{
                  scale: index == i ? 1 : 0.95,
                }}
                className={`infographics__topics--item ${
                  index == i ? "active" : ""
                }`}
              >
                <div className="overlay">   </div>
                <Image
                  src={e.img}
                  width={200}
                  height={200}
                  layout="fill"
                  alt=""
                />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="row">
          <div className="infographics__carousel" ref={containerRef}>
            <motion.div
              style={{
                display: "flex",
                flexFlow: "row",
              }}
            >
              {infographics.map((e, i) => (
                <motion.div
                  style={{
                    flex: "none",
                    position: "absolute",
                    width: 500,
                    height: 500,
                  }}
                  animate={{
                    x: i * 120,
                    boxShadow:
                      index == i
                        ? "0 62.5px 125px -25px rgb(127 98 178 / 72%), 0 37.5px 75px -37.5px rgb(0 0 0 / 60%)"
                        : "0 62.5px 125px -25px rgb(50 50 73 / 50%), 0 37.5px 75px -37.5px rgb(0 0 0 / 60%)",
                    overflow: "hidden",
                    borderRadius: 24,
                    zIndex: index == i ? (infographics.length + 1) : infographics.length - i,
                    scale: index == i ? 1 : 0.9,
                  }}
                  key={i}
                >
                  <Image src={e} alt="" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infographics;
