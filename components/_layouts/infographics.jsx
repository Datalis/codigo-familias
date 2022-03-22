import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';
import Image from 'next/image';



import img1 from '../../public/images/infographics/1.jpg';
import img2 from '../../public/images/infographics/2.jpg';
import img3 from '../../public/images/infographics/3.jpg';
import img4 from '../../public/images/infographics/4.jpg';
import img5 from '../../public/images/infographics/5.jpg';
import Carousel from '../_components/carousel';



const Infographics = () => {

    return (
        <div className="infographics">
            <div className="container">
                <div className="row">
                    <Carousel>
                        <Image src={img1} />
                        <Image src={img2} />
                        <Image src={img3} />
                        <Image src={img4} />
                        <Image src={img5} />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Infographics;