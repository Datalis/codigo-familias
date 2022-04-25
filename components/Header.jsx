

import HeaderTitle from '../public/images/header_title.svg';
import Logo from '../public/images/logo.svg';
import { motion } from 'framer-motion';
import React, { useRef, useState, useMemo, useEffect, Suspense, startTransition } from 'react';
import { DebounceInput } from 'react-debounce-input';
import Article from './Article';
import useLunr from '../hooks/useLunr';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton } from 'react-share';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';
import useWindowSize from '../hooks/useWindowSize';
import Image from 'next/image'

//import Lottie from 'react-lottie';

//import animData from '../public/anim/header_anim_large.json';

import headerImg from '../public/images/header-2x.png';

//const Player = React.lazy(() => import('react-lottie-player'));

const SearchInput = ({ keywords, articles }) => {
    const [query, setQuery] = useState("");
    const [currentKeyword, setCurrentKeyword] = useState(null);

    const {
        results,
        onSearch
    } = useLunr(articles, {
        limit: 25
    });

    const handleKeywordChange = (keyword) => {
        if (currentKeyword && currentKeyword.name == keyword.name) {
            setQuery("");
            setCurrentKeyword(null);
        } else {
            setQuery(keyword.name);
            setCurrentKeyword(keyword);
        }
    }

    const handleQueryChange = (q) => {
        setQuery(q);
        if (currentKeyword != null) {
            setCurrentKeyword(null);
        }
    }

    useEffect(() => {
        onSearch(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])


    return (
        <div className='search'>
            <div className="search-container container center">
                <h3 className='text-green uppercase'>Encuentra términos, conceptos y contenidos <br /> del Código de las Familias</h3>
                <DebounceInput
                    type='search'
                    debounceTimeout={400}
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    className='search__input'
                    placeholder='Buscar por palabra o artículo' />
                <div className='search__tags mb-4'>
                    {
                        keywords.map((e, i) => (
                            <div key={i} className={`search__tags--tag ${e.name == currentKeyword?.name ? 'selected' : ''}`} onClick={() => handleKeywordChange(e)}>
                                {e.name}
                            </div>
                        ))
                    }
                </div>
            </div>
            <SearchResults results={results} keyword={currentKeyword} />
        </div>
    )
}


const SearchResults = ({ results, keyword }) => {
    //const [pageOffset, setPageOffset] = useState(0);

    const resultsContainerRef = useRef();
    const itemsPerPage = 4;

    const scrollTop = () => resultsContainerRef.current?.scrollIntoView();

    const handlePageChange = (page) => {
        //setPageOffset(offset);
        setCurrentPage(page);
        scrollTop();
    }

    useEffect(() => {
        setCurrentPage(0)
    }, [results])

    const [currentPage, setCurrentPage] = useState(0);

    const totalResults = useMemo(() => results.length || 0, [results]);

    const items = useMemo(() => results.slice(currentPage, currentPage + itemsPerPage), [results, currentPage]);
    const pageCount = useMemo(() => Math.ceil(results.length / itemsPerPage), [results, itemsPerPage]);

    return (
        <div ref={resultsContainerRef}>
            {
                !!items.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={`results py-8`}>
                        <div className="container">
                            {
                                !!keyword && (
                                    <div className='mt-2 mb-4 center'>
                                        <p className='font-medium keyword-desc'>{keyword?.description}</p>
                                    </div>
                                )
                            }
                            {
                                !!totalResults && (
                                    <div className="results__count">
                                        <span className='text-purple font-semi-bold'>{totalResults == 1 ? `1 resultado` : `${totalResults} resultados`}</span>
                                    </div>
                                )
                            }
                            <div className='results__items'>
                                {items.map(hit => (
                                    <div key={hit.ref}>
                                        <Article {...hit.item} matchData={hit.matchData} showComment={false}></Article>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="results__pagination">
                                <div className='pagination'>
                                    {
                                        pageCount > 1 && (
                                            [...Array(pageCount).keys()].map(e => (
                                                <a className={`page-link ${currentPage == e ? 'current' : ''}`} key={e} onClick={() => handlePageChange(e)}>{e + 1}</a>
                                            ))
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )
            }
        </div>
    )
}


const Header = ({ articles, keywords }) => {
    const viewport = useWindowSize();
    const [anim, setAnim] = useState();

    useEffect(() => {
        const loadAnim = async () => {
           const anim = await import('../public/anim/header_no_bg.json');
           setAnim(anim)
        }
        loadAnim();
    }, []);


    const showAnim = useMemo(() => {
        return viewport.width > 768 ? (
            <Lottie animationData={anim} play={true} rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }} />
        ) : (
            <Image priority src={headerImg} layout="fill" objectFit='cover' height="100vh" width="100vw" alt='' />
        )
    }, [viewport, anim]);

    return (
        <header className='header'>
            <div className='header__img'>
                {/*<Suspense fallback={
                <span>
                    <Image src='/images/header.png' style={{ right: 28, top: 41 }} layout="fill" objectFit='contain' alt='' />
                </span>}>
                    <Player animationData={anim} play={true} />
                </Suspense>*/}
               {showAnim}
            </div>
            <div className="container py-8">
                <div className="row">
                    <div className="col-12">
                        <div className="flex" style={{ alignItems: 'center' }}>
                            <div className='logo'>
                                <Logo />
                            </div>
                            <div className='ml-auto'>
                                <FacebookShareButton className='mr-2' url='https://codigo-de-familias.netlify.com'>
                                    <FacebookIcon round={true} size={32} />
                                </FacebookShareButton>
                                <TwitterShareButton className='mr-2' url='https://codigo-de-familias.netlify.com'>
                                    <TwitterIcon round={true} size={32} />
                                </TwitterShareButton>
                                <TelegramShareButton className='mr-2' url='https://codigo-de-familias.netlify.com'>
                                    <TelegramIcon round={true} size={32} />
                                </TelegramShareButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className='intro'>
                            <h1 style={{ visibility: 'hidden', height: 0, margin: 0 }}>
                                Nuevo código de las familias
                            </h1>
                            <HeaderTitle className="intro__image mt-8" />
                            <h2 className='intro__title font-normal mt-8'>Una cobertura para el debate informado</h2>
                            <p className='intro__message font-medium mt-8'>
                                El anteproyecto del Código de las Familias ha dividido la opinión pública cubana, generando polémicos debates. Los que se oponen muestran preocupación por la posible «limitación» de los derechos de los padres sobre la crianza de hijos e hijas, por el reconocimiento del matrimonio como la unión entre dos personas, por el peligro de que el Código sirva como basamento legal para la represión política a activistas y opositores, o por que se utilice como «lavado de cara» de un Gobierno autocrático.
                                <br />
                                <br />
                                Sin embargo, para varios grupos de la sociedad civil, el anteproyecto reconoce los derechos de las familias plurales que existen hoy en Cuba. En cualquier caso, el impacto que tendrá en la práctica este nuevo Código dependerá de las normas y leyes posteriores que lo acompañen.
                                <br />
                                <br />
                                ¿Y tú?¿Te has informado sobre el contenido del anteproyecto antes de decidir?

                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <SearchInput keywords={keywords} articles={articles} />
        </header>
    );
}

export default Header;