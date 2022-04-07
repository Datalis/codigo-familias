import Image from 'next/image';

import headerImg from '../public/images/header.png';
import headerImgLg from '../public/images/header_large.png';

import headerTitle from '../public/images/header_title.png';
import logo from '../public/images/logo.png';

import { AnimatePresence, useTransform, useViewportScroll } from 'framer-motion';
import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';
import { DebounceInput } from 'react-debounce-input';
import useFuse from '../hooks/useFuse';
import Article from './Article';
import ReactPaginate from 'react-paginate';


const Header = ({ articles }) => {
    const viewport = useWindowSize();
    const [headerBg, setHeaderBg] = useState(headerImgLg);
    const [pageOffset, setPageOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const searchContentRef = useRef();

    const itemsPerPage = 5;

    const {
        hits,
        onSearch,
    } = useFuse(articles, {
        matchAllOnEmptyQuery: false,
        includeMatches: true,
        limit: 50,
        ignoreFieldNorm: true,
        minMatchCharLength: 4,
        keys: ['articulo', 'texto']
    });

    const scrollToSearch = () => searchContentRef.current?.scrollIntoView();

    const items = useCallback(() => hits.slice(pageOffset, pageOffset + itemsPerPage), [pageOffset, hits]);
    const pageCount = useCallback(() => Math.ceil(hits.length / itemsPerPage), [hits])

    const handlePageChange = (page) => {
        const offset = page * itemsPerPage % hits.length;
        setPageOffset(offset);
        setCurrentPage(page);
        scrollToSearch();
    }

    const bgImage = useCallback(() => {
        if (viewport.width > 560) return headerImgLg;
        return headerImg;
    }, [viewport])

    const { scrollY } = useViewportScroll();
    const ref = useRef(null);

    const y = useTransform(scrollY, [(ref.current?.offsetTop || 0), (ref.current?.offsetTop || 0) + 3], [0, 1], {
        clamp: false,
    })

    //const { scrollY } = useViewportScroll();

    
    /*const offset = useCallback(() => ref.current.offsetTop, [ref]);
    const y = useTransform(scrollY, [offset, offset + 3], [0, -1], {
        clamp: false,
    });*/

    /*useEffect(() => {
        if (size.width > 560) {
            setHeaderBg(headerImgLg);
        } else {
            setHeaderBg(headerImg);
        }
    }, [size])*/

    return (
        <header className='header' ref={ref}>
            <motion.div className="header__img" style={{y}}>
                <Image src={bgImage()} alt='' />
            </motion.div>
            <motion.div>
                <div className="container pb-8">
                    <div className='logo'>
                        <Image src={logo} alt='elTOQUE logo' />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='intro'>
                                <h1 className='intro__image mt-8'>
                                    <Image src={headerTitle} layout='responsive' alt='Nuevo código de familia' />
                                </h1>
                                <h3 className='intro__title font-normal mt-8'>Una cobertura para el debate informado</h3>
                                <h5 className='intro__message font-medium mt-8'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                                </h5>
                            </div>
                            <div className='search center'>
                                <h3 className='text-green uppercase'>Lorem ipsum dolor sit amet,</h3>
                                <DebounceInput minLength={1} debounceTimeout={400} className='search__input' onChange={(e) => onSearch(e.target.value)} placeholder='Buscar por palabra o artículo' />
                                <div className='search__tags'>
                                    <div className='search__tags--tag'>
                                        Familia
                                    </div>
                                    <div className='search__tags--tag'>
                                        Matrimonio
                                    </div>
                                    <div className='search__tags--tag'>
                                        Matrimonio
                                    </div>
                                    <div className='search__tags--tag'>
                                        Matrimonio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={searchContentRef}>
                    <AnimatePresence>
                        <div className={`results ${items().length ? 'py-8' : ''}`}>
                            <div className="container">
                                <motion.div className='results__items' initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}>
                                    {items().map(hit => (
                                        <motion.div key={hit.refIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                            <Article {...hit.item} matches={hit.matches}></Article>
                                            <div className="divider"></div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <div className="results__pagination">
                                    <div className='pagination'>
                                        {
                                            [...Array(pageCount()).keys()].map(e => (
                                                <a className={`page-link ${currentPage == e ? 'current' : ''}`} key={e} onClick={() => handlePageChange(e)}>{e + 1}</a>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </header>
    );
}

export default Header;