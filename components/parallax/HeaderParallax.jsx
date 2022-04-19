import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const HeaderParallax = () => {

    const sceneRef = useRef();

    return (
        <div className="header-parallax">
            <div id="scene" ref={sceneRef} style={{ mixBlendMode: 'multiply' }}>
                <motion.img style={{
                    maxWidth: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                }}
                    whileInView={{
                        scale: [1, 1.08, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 25,
                        repeatDelay: 1
                    }}
                    src='/images/parallax/header/6-01.png' />
                <motion.img style={{
                    maxWidth: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                }}
                whileInView={{
                        scale: [1, 1.12, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 20,
                        repeatDelay: 2
                    }}
                    src='/images/parallax/header/5-01.png' />
                <motion.img style={{
                    maxWidth: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                }}
                whileInView={{
                        scale: [1, 1.11, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        repeatDelay: 1
                    }}
                    src='/images/parallax/header/4-01.png' />
                <motion.img style={{
                    maxWidth: '100%',
                    position: 'absolute',
                    mixBlendMode: 'multiply',
                }}
                whileInView={{
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 15
                    }}
                    src='/images/parallax/header/3-01.png' />
                <img style={{
                    maxWidth: '100%',
                    position: 'absolute',
                    scale: 1.25,
                    mixBlendMode: 'multiply',
                }} src='/images/parallax/header/2-01.png' />
                <motion.img
                    whileInView={{
                        scale: [1, 1.08, 1],
                        //rotate: [0, 10, 0]
                    }}
                    transition={{
                        ease: 'linear',
                        repeat: Infinity,
                        duration: 20,
                        repeatType: 'loop'
                    }}
                    style={{
                        maxWidth: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }} src='/images/parallax/header/1-01-small.png' />

            </div>
        </div>
    );
}

export default HeaderParallax;