import Image from "next/image";
import { useMemo } from "react";
import Slider from "react-slick";

import ArrowLeft from "../public/icons/arrow-left-colored.svg";
import ArrowRight from "../public/icons/arrow-right-colored.svg";

const SlidePrev = ({ className, style, onClick }) => {
    return (
        <ArrowLeft className={className} style={{
            ...style,
        }} onClick={onClick} />
    );
}

const SlideNext = ({ className, style, onClick }) => {
    return (
        <ArrowRight className={className} style={{
            ...style,
        }} onClick={onClick} />
    );
}


const RelatedArticles = ({ relatedPosts }) => {


    const posts = useMemo(() => {
        return relatedPosts.map((e) => {
            const { id, title, feature_image, excerpt, slug } = e;
            return {
                id,
                title,
                feature_image,
                excerpt,
                slug
            }
        })
    }, [relatedPosts]);


    const handleOnMouseDown = (e) => {
        e.preventDefault() // stops weird link dragging effect
    }

    const handleOnClick = (e) => {
        e.stopPropagation()
    }


    return (
        <div className="related-articles">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="center uppercase font-semi-bold text-green">Artículos relacionados</h3>
                    </div>
                </div>
                <Slider className="row"
                    lazyLoad="ondemand"
                    slidesToShow={2}
                    slidesToScroll={2}
                    responsive={[
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                initialSlide: 1
                            }
                        },
                    ]}
                    easing='ease-in-out'
                    arrows={true}
                    draggable={false}
                    nextArrow={<SlideNext />} prevArrow={<SlidePrev />}>
                    {posts.map((e, i) => (
                        <a href={`https://eltoque.com/${e.slug}`} target="_blank" rel="noreferrer" className="related-articles__item" key={i}
                            onMouseDown={e => handleOnMouseDown(e)}
                            onClick={e => handleOnClick(e)}>
                            <div className="content">
                                <div className="image">
                                    <Image layout="fill" className="image" objectFit="cover" objectPosition="top" src={`https://api.eltoque.com${e.feature_image.url}`} alt={e.title} />
                                </div>
                                <span className="title font-bold">{e.title}</span>
                                <p className="excerpt font-regular">{e.excerpt}</p>
                            </div>
                        </a>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default RelatedArticles;