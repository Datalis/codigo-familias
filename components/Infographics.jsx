import Image from 'next/image';
import React, { useRef } from 'react';
import { ResponsiveContainer, StackedCarousel } from 'react-stacked-center-carousel';

import ArrowLeft from '../public/icons/arrow-left.svg';
import ArrowRight from '../public/icons/arrow-right.svg';

const data = [
    {
        cover: '/images/infographics/1.jpg',
        title: ''
    },
    {
        cover: '/images/infographics/2.jpg',
        title: ''
    },
    {
        cover: '/images/infographics/3.jpg',
        title: ''
    },
    {
        cover: '/images/infographics/4.jpg',
        title: ''
    },
    {
        cover: '/images/infographics/5.jpg',
        title: ''
    }
]


const Infographics = () => {

    const ref = useRef();

    return (
        <div className="infographics">
            <div className="container">
                <div className="row">
                    <div className="infographics__controls">
                        <div className='control control-prev'>
                            <span onClick={() => ref.current?.goBack()}>
                                <ArrowLeft></ArrowLeft>
                            </span>
                        </div>
                        <div className='control control-next'>
                            <span onClick={() => ref.current?.goNext()}>
                                <ArrowRight></ArrowRight>
                            </span>
                        </div>
                    </div>
                    <div className='infographics__carousel'>
                        <ResponsiveContainer carouselRef={ref} render={(parentWidth, carouselRef) => {
                            let currentVisibleSlide = 5;
                            let slideWidth = 600;
                            if (parentWidth <= 700) {
                                currentVisibleSlide = 3;
                                slideWidth = 400;
                            } else if (parentWidth < 500) {
                                //currentVisibleSlide = 1;
                                slideWidth = 400;
                            }
                            console.log(parentWidth);
                            return (
                                <StackedCarousel
                                    ref={carouselRef}
                                    data={data}
                                    carouselWidth={parentWidth}
                                    slideWidth={slideWidth}
                                    slideComponent={Slide}
                                    maxVisibleSlide={5}
                                    currentVisibleSlide={currentVisibleSlide}
                                    useGrabCursor={true}
                                />
                            )
                        }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Slide = React.memo(
    function (props) {
        const { data, dataIndex } = props;
        const { cover } = data[dataIndex];
        return (
            <div className='item'>
                <Image
                    layout='fill'
                    objectFit='contain'
                    objectPosition='center'
                    //style={{ height: '100%', width: '100%', borderRadius: 10 }}
                    draggable={false}
                    src={cover}
                />
            </div>
        );
    }
);

export default Infographics;