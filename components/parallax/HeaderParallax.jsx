import React, { useRef } from 'react';
import Lottie from 'react-lottie';
import useWindowSize from '../../hooks/useWindowSize';
import animationData from '../../public/anim/header_anim_large.json'

const HeaderParallax = () => {

    const sceneRef = useRef();
    const viewport = useWindowSize();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div className="header-anim" >
            <Lottie id="scene" options={defaultOptions} width={1400} height={1400} isStopped={true}>

            </Lottie>
        </div >
    );
}

export default HeaderParallax;