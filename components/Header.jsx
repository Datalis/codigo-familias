import Image from 'next/image';

import headerImg from '../public/images/header.png';
import headerImgLg from '../public/images/header_large.png';

import HeaderTitle from '../public/images/header_title.svg';
import Logo from '../public/images/logo.svg';
import debounce from 'lodash.debounce';

import { AnimatePresence, useTransform, useViewportScroll } from 'framer-motion';
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import useWindowSize from '../hooks/useWindowSize';
import { DebounceInput } from 'react-debounce-input';
import Article from './Article';
import useLunr from '../hooks/useLunr';
import HeaderParallax from './parallax/HeaderParallax';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import Lottie from 'react-lottie';

import animData from '../public/anim/header_anim_large.json';


const splitTerms = (query) => {
    return query.trim().split(" ").map(e => `+${e}`).join(" ");
}

const SearchInput = ({ keywords, onSearch }) => {
    const [query, setQuery] = useState("");
    const [currentKeyword, setCurrentKeyword] = useState(null);

    const handleKeywordChange = (keyword) => {
        if (currentKeyword && currentKeyword.name == keyword.name) {
            setCurrentKeyword(null);
            setQuery("");
        } else {
            setCurrentKeyword(keyword);
            setQuery(keyword.name);
        }
    }

    const handleQueryChange = (q) => {
        setCurrentKeyword(null);
        setQuery(q);
    }

    useEffect(() => {
        onSearch(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])


    return (
        <div className='search center'>
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
            {currentKeyword && (
                <motion.div className='m-0' style={{ overflow: 'hidden' }} exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .2 }}>
                    <p className='font-medium'>{currentKeyword?.description}</p>
                </motion.div>
            )}
        </div>
    )
}


const SearchResults = ({ results }) => {
    const [pageOffset, setPageOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const resultsContainerRef = useRef();
    const itemsPerPage = 4;

    const pageCount = useMemo(() => Math.ceil(results.length / itemsPerPage), [results])
    const resultItems = useMemo(() => results.slice(pageOffset, pageOffset + itemsPerPage), [pageOffset, results]);

    const scrollTop = () => resultsContainerRef.current?.scrollIntoView();

    const handlePageChange = (page) => {
        const offset = page * itemsPerPage % results.length;
        setPageOffset(offset);
        setCurrentPage(page);
        scrollTop();
    }

    return (
        <div ref={resultsContainerRef}>
            <div className={`results ${resultItems.length ? 'py-8' : ''}`}>
                <div className="container">
                    {
                        !!results.length && (
                            <div className="results__count">
                                <span className='text-purple'>{results.length} resultados</span>
                            </div>
                        )
                    }
                    <div className='results__items'>
                        {resultItems.map(hit => (
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
            </div>
        </div>
    )
}


const Header = ({ articles, keywords }) => {

    const animOptions = {
        loop: true,
        autoplay: true,
        animationData: animData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const {
        results,
        onSearch
    } = useLunr(articles, {
        limit: 50
    });

    const handleSearch = (query) => {
        const terms = query ? splitTerms(query) : null;
        onSearch(terms);
    }

    return (
        <header className='header'>
            <div className='header__img'>
                <Lottie options={animOptions}  isStopped={true}/>
            </div>
            <div className="container py-8">
                <div className="row">
                    <div className="col-12">
                        <div className="flex">
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
                            <h1 className='intro__image mt-8'>
                                <HeaderTitle />
                            </h1>
                            <h3 className='intro__title font-normal mt-8'>Una cobertura para el debate informado</h3>
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
                        <SearchInput keywords={keywords} onSearch={handleSearch} />
                    </div>
                </div>
            </div>
            <SearchResults results={results} />
        </header>
    );
}

export default Header;