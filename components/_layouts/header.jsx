import Image from 'next/image';

import headerImg from '../../public/images/header.png';
import headerImgLg from '../../public/images/header_large.png';

import headerTitle from '../../public/images/header_title.png';
import logo from '../../public/images/logo.png';

import { useTransform, useViewportScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Article from '../_components/article';
import ArticleList from './article-list';
import useWindowSize from '../../hooks/useWindowSize';


const Header = () => {
    const size = useWindowSize();
    const [offset, setOffset] = useState();
    const [headerBg, setHeaderBg] = useState(headerImg);

    const { scrollY } = useViewportScroll();

    const ref = useRef(null);

    const y = useTransform(scrollY, [offset, offset + 3], [0, -1], {
        clamp: false,
    });

    useEffect(() => {
        if (size.width > 560) {
            setHeaderBg(headerImgLg);
        } else {
            setHeaderBg(headerImg);
        }
    }, [size])

    useEffect(() => {
        const el = ref.current;
        setOffset(el.offsetTop);
    }, [ref]);

    return (
        <header className='header' ref={ref}>
            <div className="header__img">
                <Image src={headerBg} alt='' />
            </div>
            <motion.div style={{y}}>
                <div className="container pb-8">
                    <div className='logo'>
                        <Image src={logo} alt='elTOQUE logo' />
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='intro'>
                                <div className='intro__image mt-8'>
                                    <Image src={headerTitle} layout='responsive' alt='Nuevo código de familia' />
                                </div>
                                <h3 className='intro__title font-normal mt-8'>Una cobertura para el debate informado</h3>
                                <h5 className='intro__message font-medium mt-8'>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

                                </h5>
                            </div>
                            <div className='search center'>
                                <h3 className='text-green uppercase'>Lorem ipsum dolor sit amet,</h3>
                                <input className='search__input' placeholder='Buscar por palabra o artículo' />
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
                <div className="results">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ArticleList></ArticleList>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </header>
    );
}

export default Header;