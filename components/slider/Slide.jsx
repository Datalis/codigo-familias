import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";

const Slide = ({i, onDragEnd, currentIndex, children }) => {
    const SLIDE_SHADOW = '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)';

    const props = useMemo(() => {
        const shouldRender = Math.abs(i - currentIndex) < 3;
        const current = i == currentIndex;
        const direction = i - currentIndex < 0 ? -1 : 1;
        return {
            display: shouldRender ? 'flex' : 'none',
            zIndex: current ? 1 : 'auto',
            x: current ? 0 : direction * 80,
            boxShadow: current ? SLIDE_SHADOW : '0 0 0 0 rgba(0,0,0,0)',
            scale: current ? 1 : 0.9
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex])

    return (
        <motion.div
            style={{
                width: "100%",
                height: "100%",
                flex: "none",
                position: 'absolute',
                contentVisibility: 'auto'
            }}
            //className={`slide ${isActive ? 'slide__active' : ''}`}
            animate={{
                ...props,
            }}
            className="slide"
            drag="x"
            dragElastic={0.1}
            dragConstraints={{
                left: 0,
                right: 0
            }}
            onDragEnd={onDragEnd}
        >
            {children}
        </motion.div>
    );
};

export default Slide;
