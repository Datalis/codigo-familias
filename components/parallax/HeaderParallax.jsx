import Parallax from 'parallax-js';
import React, { useRef, useEffect } from 'react';

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

const Layer = React.memo(({src, depth, styles}) => {
    return (
        <img className='layer' data-depth={depth} src={src} style={styles} alt="" />
    );
})

const HeaderParallax = () => {

    const sceneRef = useRef();

    useEffect(() => {
        new Parallax(sceneRef.current, {
            selector: '.layer',
            //relativeInput: true,
            //hoverOnly: true
        });
    }, [])


    return (
        <div className="header-parallax">
            <div id="scene" ref={sceneRef} style={{mixBlendMode: 'multiply'}}>
                {
                    parallaxLayers.map((e, i) => (
                        <Layer {...e} key={i} />
                    ))
                }
            </div>
        </div>
    );
}

export default HeaderParallax;