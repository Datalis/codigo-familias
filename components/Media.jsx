

import Image from 'next/image';

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css';
import { motion, AnimatePresence } from 'framer-motion';

import PlayIcon from '../public/icons/play.svg';
import StopIcon from '../public/icons/stop.svg';
import LoadingIcon from '../public/icons/loading.svg';
import { useState, useRef } from 'react';

const Media = ({ audios }) => {

    const [currentAudio, setCurrentAudio] = useState(null);
    const [isLoading, setIsLoading] = useState(-1);

    const audioRef = useRef();

    const handleClickNext = () => {
        if (currentAudio !== audios.length - 1) {
            setCurrentAudio(++currentAudio);
        } else {
            setCurrentAudio(0);
        }
    }

    const handleClickPrevious = () => {
        if (currentAudio !== 0) {
            setCurrentAudio(--currentAudio);
        } else {
            setCurrentAudio(audios.length - 1);
        }
    }

    const handleToggleAudio = (i) => {
        if (currentAudio == i) {
            setCurrentAudio(null);
        } else {
            setCurrentAudio(i);
        }
    }

    return (
        <div className="media">
            <div className="container">
                <div className="row">
                    <div className="col-12 center">
                        <h3 className=" text-green uppercase font-bold">Videos y Audios</h3>
                        <span className="font-medium">Escucha los audios más polémicos de esta cobertura</span>
                    </div>
                </div>
                <div className="media__list mt-8">
                    {
                        audios.map((e, i) => (
                            <div className="media__list--item" key={i}>
                                <div className={`overlay ${currentAudio == i ? 'active' : ''}`}>
                                    <span className='play-btn' onClick={() => handleToggleAudio(i)}>
                                        <AnimatePresence initial={false}>
                                            {
                                                i == isLoading ? (
                                                    <motion.div className='stop-icon' exit={{ scale: 0, opacity: 0 }}>
                                                        <LoadingIcon />
                                                    </motion.div>
                                                ) : (
                                                    currentAudio == i ? (
                                                        <motion.div className='stop-icon' exit={{ scale: 0, opacity: 0 }}>
                                                            <StopIcon />
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div className='play-icon' exit={{ scale: 0, opacity: 0 }}>
                                                            <PlayIcon />
                                                        </motion.div>
                                                    )
                                                )
                                            }
                                            {/*
                                                currentAudio == i ? (
                                                    <motion.div className='stop-icon' exit={{ scale: 0, opacity: 0 }}>
                                                        <StopIcon />
                                                    </motion.div>
                                                ) : (
                                                    <motion.div className='play-icon' exit={{ scale: 0, opacity: 0 }}>
                                                        <PlayIcon />
                                                    </motion.div>
                                                )
                                                */}
                                        </AnimatePresence>
                                    </span>
                                </div>
                                <Image src={e.cover} layout="fill" objectFit='cover' objectPosition='center' alt='' />
                            </div>
                        ))
                    }
                    <motion.div style={{ opacity: 0 }} animate={{ opacity: currentAudio !== null ? 1 : 0 }} className="media__player">
                        <AudioPlayer
                            className='player'
                            ref={audioRef}
                            preload='auto'
                            onEnded={handleClickNext}
                            autoPlayAfterSrcChange={true}
                            showSkipControls={true}
                            showJumpControls={false}
                            showDownloadProgress={true}
                            onLoadStart={(e) => {
                                setIsLoading(currentAudio)
                            }}
                            onLoadedData={(e) => {
                                setIsLoading(-1)
                            }}
                            customAdditionalControls={[]}
                            customVolumeControls={[

                            ]}
                            src={currentAudio !== null ? audios[currentAudio].source : ""}
                            onClickPrevious={handleClickPrevious}
                            onClickNext={handleClickNext} />
                    </motion.div>
                </div>
            </div>

        </div>
    );
}

export default Media;