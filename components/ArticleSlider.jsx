import Article from "./Article";
import Carousel from "./slider/Carousel";

const ArticleSlider = ({ articles }) => {
    return (
        <div className="articles-slider">
            <div className="container">
                <div className="articles-slider__intro">
                    <h3 className="center uppercase text-green font-semi-bold mb-5">
                        Visita guiada por el código de familias
                    </h3>
                    <p className="font-regular center mx">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur.
                    </p>
                </div>
                <div className="articles-slider__slider">
                    <Carousel>
                        {
                            articles.map((item, i) => (
                                <Article {...item} key={item._id}></Article>
                            ))
                        }
                    </Carousel>
                </div>
                <div className="articles-slider__download">
                    <button className="button">Descargar PDF</button>
                </div>
            </div>
        </div>
    );
}

export default ArticleSlider;