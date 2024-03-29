
import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser';
import { useRef } from 'react';
import { useMemo } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const highlight = (pos, value, i = 1) => {
    const pair = pos[pos.length - i];
    return !pair ? value :
        `${highlight(pos, value.substring(0, pair[0]), i + 1)}<mark>${value.substring(pair[0], pair[0] + pair[1])}</mark>${value.substring(pair[0] + pair[1])}`;
}

const highlightJSX = (pos, value, i = 1) => {
    const pair = pos[pos.length - i];
    return !pair ? value : (
        <>
            {highlightJSX(pos, value.substring(0, pair[0]), i + 1)}
            <mark>{value.substring(pair[0], pair[0] + pair[1])}</mark>
            {value.substring(pair[0] + pair[1])}
        </>
    )
}

const highlighter = (text, field, metadata) => {
    if (metadata) {
        const positions = [];
        Object.keys(metadata).forEach(term => {
            const data = metadata[term][field];
            const pos = data?.position || [];
            positions.push(...pos);
        });
        return highlightJSX(positions, text);
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

    const textRef = useRef();

    const viewport = useWindowSize();
    const [collapsed, setCollapsed] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const truncateLimit = useMemo(() => {
        if (viewport.width > 560) return 400;
        return 200;
    }, [viewport]);


    const textLines = useMemo(() => {
        if (textRef.current) {
            const _h = textRef.current?.offsetHeight;
        const _elStyle = typeof window !== "undefined" ? window?.getComputedStyle(textRef.current) : null;
        const _fs = +_elStyle?.getPropertyValue('font-size') || 16;
        const _lh = +_elStyle?.getPropertyValue('line-height') || 1.4;
        const _lines = Math.round(_h / (_fs * _lh));
        return _lines;
        }
        return 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textRef.current]);

    return (
        <article className="article" id={_id}>
            <header className='article__header'>
                <small className='heading font-bold text-purple my-0 uppercase'>Título {titulo}</small>
                {!!capitulo && (
                    <>
                        <span className='separator font-bold mx-4'>/</span>
                        <small className='heading font-bold text-purple my-0 uppercase'>{capitulo}</small>
                    </>
                )
                }
                {!!seccion && (
                    <>
                        <span className='separator font-bold mx-4'>/</span>
                        <small className='heading font-bold text-purple my-0 uppercase'>{seccion}</small>
                    </>
                )
                }
            </header>

            <h3 className='article__title font-bold mb-2 mt-4'>
                {highlighter(articulo, 'articulo', matchData?.metadata)}
            </h3>

            <div className="show-more-less">
                <p
                    ref={textRef}
                    className={`article__text ${textLines > 5 ? (collapsed ? 'collapsed' : 'expanded') : 'expanded'}`}
                >
                    {highlighter(texto, 'texto', matchData?.metadata)}
                </p>
                {
                    textLines > 5 && (
                        <div className='toggle-more' layout="position">
                            <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Ver más' : 'Ver menos'}</button>
                        </div>)
                }
            </div>

            {showComment && (
                <footer className='article__footer'>
                    <span className='article__comments'>
                        {ReactHtmlParser(comentario)}
                    </span>
                    {
                        !!comentario && (
                            <span className="article__comments_data">
                                <em>Comentario</em> <strong>{comentarioIndex + 1} / {comentarioTotal}</strong>
                            </span>
                        )
                    }
                </footer>
            )}
        </article>
    );
}

export default Article;