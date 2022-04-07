
import React, { useDebugValue, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import ReactHtmlParser from 'react-html-parser';

const Article = ({
    _id,
    titulo,
    capitulo,
    seccion,
    articulo,
    texto,
    comentario,
    matches = []
}) => {

    const [collapsed, setCollapsed] = useState(true);


    const highlight = (value, indices = [], i = 1) => {
        const pair = indices[indices.length - i];
        return !pair ? value : (
            <>
                {highlight(value.substring(0, pair[0]), indices, i + 1)}
                <mark>{value.substring(pair[0], pair[1] + 1)}</mark>
                {value.substring(pair[1] + 1)}
            </>
        );
    };

    const unquote = (text) => {
        return text.replace(/^"(.+(?="$))"$/, '$1');
    }

    const textMatches = matches.find(m => m.key == 'texto');
    const titleMatches = matches.find(m => m.key == 'articulo');

    const truncate = (text = "") => {
        if (text.length < 260) return text;
        const _temp = text.substring(0, 260);
        const _end = _temp.substring(0, _temp.lastIndexOf(' ')) + '...';
        return _end;
    }

    return (
        <article className="article" id={_id}>
            <header className='article__header'>
                <h6 className='heading font-bold text-purple my-0 uppercase'>{titulo}</h6>
                {!!capitulo && (
                    <>
                        <span className='separator font-bold mx-4'>/</span>
                        <h6 className='heading font-bold text-purple my-0 uppercase'>{capitulo}</h6>
                    </>
                )
                }
                {!!seccion && (
                    <>
                        <span className='separator font-bold mx-4'>/</span>
                        <h6 className='heading font-bold text-purple my-0 uppercase'>{seccion}</h6>
                    </>
                )
                }
            </header>
            <h3 className='article__title font-bold mb-2 mt-4'>
                {highlight(titleMatches?.value || articulo, titleMatches?.indices)}
            </h3>

            <div className="show-more-less">
                <motion.p
                    className='article__text'
                    variants={{
                        collapsed: {
                            opacity: [0,1],
                            height: 'auto',
                            display: '-webkit-box'
                        },
                        expanded: {
                            opacity: [0,1],
                            height: 'auto',
                            display: 'block',
                            transition: {
                                display: {
                                    //delay: 0.2
                                }
                            }
                        }
                    }}
                    initial="collapsed"
                    animate={collapsed ? "collapsed" : "expanded"}>
                    {texto}
                </motion.p>
                <motion.div className='toggle-more' layout="position">
                    <motion.button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Ver más' : 'Ver menos'}</motion.button>
                </motion.div>
            </div>

            <footer className='article__footer'>
                <span className='article__comments'>
                    {ReactHtmlParser(comentario)}
                </span>
            </footer>
        </article>
    );
}

export default Article;