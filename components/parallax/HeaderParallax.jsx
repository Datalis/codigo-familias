import Parallax from 'parallax-js';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const parallaxLayers = [
    {
        src: "/images/parallax/header/6-01.png",
        depth: 0.3,
        styles: {
            maxWidth: '100%',
            mixBlendMode: 'multiply',
            filter: 'saturate(0.9)'
        }
    },
    {
        src: "/images/parallax/header/5-01.png",
        depth: 0.25,
        styles: {
            maxWidth: '100%',
            mixBlendMode: 'multiply',
            filter: 'saturate(0.9)'
        }
    },
    {
        src: "/images/parallax/header/4-01.png",
        depth: 0.2,
        styles: {
            maxWidth: '100%',
            mixBlendMode: 'multiply',
            filter: 'saturate(0.9)'
        }
    },
    {
        src: "/images/parallax/header/3-01.png",
        depth: 0.12,
        styles: {
            maxWidth: '100%',
            mixBlendMode: 'multiply',
            filter: 'saturate(0.9)',
        }
    },
    {
        src: "/images/parallax/header/2-01.png",
        depth: 0.6,
        styles: {
            maxWidth: '100%'
        }
    },
    {
        src: "/images/parallax/header/1-01.png",
        depth: 0.5,
        styles: {
            maxWidth: '100%'
        }
    },

];

const Layer = React.memo(({ src, depth, styles }) => {
    return (
        <img className='layer' data-depth={depth} src={src} style={styles} alt="" />
    );
});

Layer.displayName = "Layer";

const HeaderParallax = () => {

    const sceneRef = useRef();

    useEffect(() => {
    }, [])


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
                        duration: 25
                    }}
                    src='/images/parallax/header/6-01.png' />
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
                        duration: 25
                    }}
                    src='/images/parallax/header/5-01.png' />
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
                        duration: 25
                    }}
                    src='/images/parallax/header/4-01.png' />
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
                        duration: 25
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
                        //x: [0, -10, 0],
                        //y: [0, -5, 0],
                        rotate: [0, 10, 0]
                    }}
                    transition={{
                        ease: 'linear',
                        repeat: Infinity,

                        duration: 50,
                        repeatType: 'reverse'
                    }}
                    style={{
                        maxWidth: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }} src='/images/parallax/header/1-01.png' />

            </div>
        </div>
    );
}

export default HeaderParallax;