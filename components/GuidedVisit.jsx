import Article from "./Article";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { AutoSizer, Grid } from "react-virtualized";

import ArrowLeft from "../public/icons/arrow-left.svg";
import ArrowRight from "../public/icons/arrow-right.svg";
import useWindowSize from "../hooks/useWindowSize";

const Slide = ({ i, currentIndex, children, onDragEnd }) => {
    const SLIDE_SHADOW = '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)';
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const shouldRender = useMemo(() => Math.abs(i - currentIndex) < 5, [currentIndex]);

    const { width } = useWindowSize();

    const props = useMemo(() => {
        const isActive = i == currentIndex;
        const direction = i - currentIndex < 0 ? -1 : 1;
        let offset = 35;
        if (width > 560) {
            offset = 70;
        }
        if (width > 960) {
            offset = 100;
        }
        return {
            scale: isActive ? 1 : 0.9,
            zIndex: isActive ? 1 : 'auto',
            x: isActive ? 0 : offset * direction,
            display: shouldRender ? 'flex' : 'none',
            boxShadow: isActive ? SLIDE_SHADOW : '0 0 5px 2px rgba(0,0,0,0)',
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, width])

    return (
        shouldRender && (
            <motion.div className="slide"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
                }}
                animate={{
                    ...props
                }}
                drag="x"
                dragConstraints={{
                    left: 0,
                    right: 0
                }}
                dragElastic={0.2}
                dragSnapToOrigin={true}
                onDragEnd={onDragEnd}>
                {children}
            </motion.div>
        )
    )
}

const GuidedVisit = ({ articles }) => {
    const [index, setIndex] = useState(1);

    const handleNext = () => {
        if (index + 1 !== articles.length) {
            setIndex(index + 1)
        }
    }

    const handleNextComment = () => {
        const _next = articles.slice(index + 1);
        const _nextCommented = _next.find(e => !!e.comentario);
        const _index = articles.findIndex(e => e._id == _nextCommented._id);
        setIndex(_index);
    }

    const handlePrevCommented = () => {
        if (index == 0) return;
        const _prev = articles.slice(0, index - 1);
        const _prevCommented = _prev.reverse().find(e => !!e.comentario);
        const _index = _prevCommented ? articles.findIndex(e => e._id == _prevCommented._id) : index - 1;
        setIndex(_index);
    }

    const handlePrev = () => {
        if (index != 0) {
            setIndex(index - 1)
        }
    }

    const handleDragEnd = (e, { offset, velocity }) => {
        const swipe = Math.abs(offset.x) * velocity.x;

        if (swipe < -10000) {
            //handleNext();
            handleNextComment();
        } else if (swipe > 10000) {
            //handlePrev();
            handlePrevCommented();
        }
    }

    return (
        <section className="guided-visit">
            <div className="container">
                <div className="guided-visit__intro">
                    <h3 className="center uppercase text-green font-bold mb-5">
                        Visita guiada por el código de familias
                    </h3>
                    <p className="font-medium center mx">
                        El proyecto del Código de las Familias cuenta con 471 artículos, segmentados en 11 títulos. Desde <em>elTOQUE</em> queremos contribuir a facilitar su comprensión con una visita comentada sobre los principales cambios y aportes del texto.
                        <br />
                        <br />
                        Con esta herramienta podrás avanzar por 114 comentarios en los cuales encontrarás elementos relevantes de la propuesta jurídica. Si te interesa buscar un artículo en específico, los puedes encontrar todos enumerados al inicio.
                    </p>
                </div>
                <div className="guided-visit__dots">
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <Grid
                                height={48}
                                rowHeight={32}
                                rowCount={1}
                                columnCount={articles.length}
                                columnWidth={48}
                                cellRenderer={({ columnIndex, style, key }) => {
                                    return (
                                        <div
                                            onClick={() => setIndex(columnIndex)}
                                            className={"dot " + (columnIndex == index ? "dot__current" : "")}
                                            style={style}
                                            key={key}
                                        >
                                            <span>{columnIndex + 1}</span>
                                        </div>
                                    );
                                }}
                                width={width}
                                scrollToColumn={index}
                            />
                        )}
                    </AutoSizer>
                </div>
                <div className="guided-visit__counter">
                    <h5 className="text-green mt-0">{articles.length} artículos</h5>
                </div>
                <div className="guided-visit__slider">
                    <div className="controls">
                        {index > 0 && (
                            <span className="control control__prev" >
                                <ArrowLeft onClick={handlePrevCommented}></ArrowLeft>
                            </span>
                        )}
                        {index < articles.length - 1 && (
                            <span className="control control__next" >
                                <ArrowRight onClick={handleNextComment}></ArrowRight>
                            </span>
                        )}
                    </div>
                    <div className="track">
                        <motion.div
                            style={{
                                display: 'block',
                                position: 'relative',
                                width: '100%'
                            }}>
                            {
                                articles.map((e, i) => (
                                    <Slide key={e._id} i={i} currentIndex={index} onDragEnd={handleDragEnd}>
                                        <Article {...e} />
                                    </Slide>
                                ))
                            }
                        </motion.div>
                    </div>
                    {/*<Slider>
                        {articles.map(e => (
                            <Article {...e} key={e._id} />
                        ))}
                        </Slider>*/}
                </div>
                <div className="guided-visit__download">
                    <button className="button">Descargar PDF</button>
                </div>
            </div>
        </section>
    );
}

export default GuidedVisit;