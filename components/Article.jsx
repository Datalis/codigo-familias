
import React, { useDebugValue, useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';
import Highlighter from 'react-highlight-words';

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

    const textRef = useRef();
    const controls = useAnimation();

    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        controls.start({
            height: collapsed ? textRef.current?.offsetHeight : 'auto'
        })
    }, [collapsed])


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

    const textMatches = matches.find(m => m.key == 'texto');
    const titleMatches = matches.find(m => m.key == 'articulo');

    const truncate = (text = "") => {
        if (text.length < 500) return text;
        const _temp = text.substring(0, 500);
        const _end = _temp.substring(0, _temp.lastIndexOf(' ')) + '...';
        return _end;
    }

    return (
        <article className="article" id={_id}>
            <header className='article__header'>
                <h6 className='heading font-bold text-purple my-0 uppercase'>{titulo}</h6>
                <span className='separator font-bold mx-4'>/</span>
                <h6 className='heading font-bold text-purple my-0 uppercase'>{capitulo || '-'}</h6>
                <span className='separator font-bold mx-4'>/</span>
                <h6 className='heading font-bold text-purple my-0 uppercase'>{seccion || '-'}</h6>
            </header>
            <h3 className='article__title mb-2 mt-4'>
                {highlight(titleMatches?.value || articulo, titleMatches?.indices)}
            </h3>
            <motion.p ref={textRef} animate={controls} initial={{height:'auto'}} className={collapsed ? `text-truncate` : ''}>
                {highlight(textMatches?.value || texto, textMatches?.indices)}
            </motion.p>
            <motion.div className='article__toggle-more'>
                <motion.button className='button' onClick={() => setCollapsed(!collapsed)}>{collapsed ? 'Ver más' : 'Ver menos'}</motion.button>
            </motion.div>
            <footer className='article__footer'>
                <span className='article__comments' dangerouslySetInnerHTML={{__html: comentario}}></span>
            </footer>
        </article>
    );
}

export default Article;