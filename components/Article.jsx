
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

    const textRef = useRef();

    const viewport = useWindowSize();
    const [collapsed, setCollapsed] = useState(true);
    const [showMore, setShowMore] = useState(false);

    const truncateLimit = useMemo(() => {
        if (viewport.width > 560) return 400;
        return 200;
    }, [viewport]);


    const textLines = useMemo(() => {
        const _h = textRef.current?.offsetHeight;
        const _fs = textRef.current?.computedStyleMap().get('font-size').value || 16;
        const _lh = textRef.current?.computedStyleMap().get('line-height').value || 1.4;
        const _lines = Math.round(_h / (_fs * _lh));
        return _lines;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textRef.current]);

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
                <p
                    ref={textRef}
                    className={`article__text ${textLines > 5 ? (collapsed ? 'collapsed' : 'expanded') : 'regular'}`}
                    >
                    {ReactHtmlParser(highlighter(texto, 'texto', matchData?.metadata))}
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