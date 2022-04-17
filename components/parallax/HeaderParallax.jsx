import Parallax from 'parallax-js';
import { useRef, useEffect } from 'react';

const parallaxLayers = [
    {
        img: '/images/parallax/header/7-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            filter: 'hue-rotate(300deg)'
        },
        containerStyles: {}
    },
   {
        img: '/images/parallax/header/6-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            filter: 'hue-rotate(340deg)'
        },
        containerStyles: {}
    },
    {
        img: '/images/parallax/header/5-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            filter: 'hue-rotate(340deg)'
        },
        containerStyles: {}
    },
    {
        img: '/images/parallax/header/4-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            filter: 'hue-rotate(340deg)'
            //scale: '1.2'
        },
        containerStyles: {}
    },
    {
        img: '/images/parallax/header/3-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
           // scale: '1.2'
            filter: 'hue-rotate(340deg)'
        },
        containerStyles: {}
    },
    {
        img: '/images/parallax/header/2-01.png',
        depth: 0.1,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            mixBlendMode: 'multiply',
            scale: '1.1'
        },
        containerStyles: {}
    },
    {
        img: '/images/parallax/header/1-01.png',
        depth: 0.2,
        layerStyles: {
            maxWidth: '100%',
            position: 'absolute',
            top: 0,
            left: 0
        },
        containerStyles: {}
    },
    
];

const HeaderParallax = () => {

    const sceneRef = useRef();

    useEffect(() => {
        /*new Parallax(sceneRef.current, {
            selector: '.layer'
        });*/
    }, [sceneRef])


    return (
        <div className="header-parallax">
            <div id="scene" ref={sceneRef}>
                {
                    parallaxLayers.map((e, i) => (
                        <div className='layer-item' key={i} style={{...e.containerStyles}}>
                            <img src={e.img} className="layer" style={{...e.layerStyles}} data-depth={e.depth} alt=""/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default HeaderParallax;