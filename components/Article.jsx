
import React, { useState } from 'react'
import { motion } from 'framer-motion';
import ReactHtmlParser from 'react-html-parser';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { useCallback } from 'react';

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
    comentarioIndex,
    comentarioTotal,
    matchData,
    showComment = true
}) => {

    const viewport = useWindowSize();
    const [collapsed, setCollapsed] = useState(true);

    const truncateLimit = useMemo(() => {
        if (viewport.width > 560) return 400;
        return 200;
    }, [viewport]);

    const showMore = useMemo(() => {
        return texto.length > truncateLimit;
    }, [texto, truncateLimit]);

    const truncateText = useCallback((text) => {
        //if (text.length < 500) return text;
        const _temp = text.substring(0, truncateLimit);
        const _end = _temp.substring(0, _temp.lastIndexOf(' ')) + '...';
        return _end;
    }, [truncateLimit])


    return (
        <article className="article" id={_id}>
            <header className='article__header'>
                <h6 className='heading font-bold text-purple my-0 uppercase'>Título {titulo}</h6>
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
                            //display: '-webkit-box'
                        },
                        expanded: {
                            opacity: [0, 1],
                            height: 'auto',
                            //display: 'block'
                        }
                    }}
                    initial="collapsed"
                    animate={collapsed ? "collapsed" : "expanded"}>
                    {ReactHtmlParser(highlighter(showMore ? (collapsed ? truncateText(texto) : texto) : texto, 'texto', matchData?.metadata))}
                </motion.p>
                {
                    showMore && (<motion.div className='toggle-more' layout="position">
                        <motion.button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Ver más' : 'Ver menos'}</motion.button>
                    </motion.div>)
                }
            </div>

            {showComment && (
                <footer className='article__footer'>
                    <span className='article__comments'>
                        {ReactHtmlParser(highlighter(comentario, 'comentario', matchData?.metadata))}
                    </span>
                    {
                        !!comentario && (
                            <span className="article__comments_data">
                                <em>Notas</em> <strong>{comentarioIndex + 1} / {comentarioTotal}</strong>
                            </span>
                        )
                    }
                </footer>
            )}
        </article>
    );
}

export default Article;