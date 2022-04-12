
import React, { useDebugValue, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import ReactHtmlParser from 'react-html-parser';

const highlight = (pos, value, i = 1) => {
    const pair = pos[pos.length - i];
    return !pair ? value : 
        `${highlight(pos, value.substring(0, pair[0]), i + 1)}<mark>${value.substring(pair[0], pair[0] + pair[1])}</mark>${value.substring(pair[0] + pair[1])}`;
}

const highlighter = (text, field, metadata) => {
    if (metadata) {
        const positions = [];
        Object.keys(metadata).forEach(term => {
            const data = metadata[term][field];
            const pos = data?.position || [];
            positions.push(...pos);
        });
        return highlight(positions, text);
    }
    return text;
}

const Article = ({
    _id,
    titulo,
    capitulo,
    seccion,
    articulo,
    texto,
    comentario,
    matchData
}) => {

    const [collapsed, setCollapsed] = useState(true);

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
                {ReactHtmlParser(highlighter(articulo, 'articulo', matchData?.metadata))}
            </h3>

            <div className="show-more-less">
                <motion.p
                    className='article__text'
                    variants={{
                        collapsed: {
                            opacity: [0, 1],
                            height: 'auto',
                            display: '-webkit-box'
                        },
                        expanded: {
                            opacity: [0, 1],
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
                    {ReactHtmlParser(highlighter(texto, 'texto', matchData?.metadata))}
                </motion.p>
                <motion.div className='toggle-more' layout="position">
                    <motion.button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Ver más' : 'Ver menos'}</motion.button>
                </motion.div>
            </div>

            <footer className='article__footer'>
                <span className='article__comments'>
                    {ReactHtmlParser(highlighter(comentario, 'comentario', matchData?.metadata))}
                </span>
            </footer>
        </article>
    );
}

export default Article;