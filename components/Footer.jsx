import Image from "next/image";
//import Lottie from 'react-lottie';

import cvLogo from "../public/images/logo_cv.png";
import etjLogo from "../public/images/logo_etqj.png";
import footerImg from "../public/images/footer.png";

//import animData from '../public/anim/footer_anim_large.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__img">
                {/*<Lottie options={animOptions} isStopped={true} />*/}
                <Image
                    src={footerImg}
                    layout="fill"
                    objectFit="contain"
                    height="100%"
                    width="50vw"
                    alt=""
                    priority
                />
            </div>
            <div className="footer__content container">
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6 col-12-sm flex flex-column">
                        <div className="center">
                            <h3 className="uppercase font-semi-bold">
                                Créditos
                            </h3>
                        </div>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Contenidos:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <a href="https://eltoque.com/proyectos/juridico">
                                    <h4 className="font-semi-bold my-1">
                                        elTOQUE Jurídico
                                    </h4>
                                </a>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Edición:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Mónica Rivero
                                </h4>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Diseño:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Wendy Valladares
                                </h4>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Arquitectura de información:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Jessica Dominguez
                                </h4>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Gestión de audiencias y de infografías:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Yery Menéndez
                                </h4>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Desarrollo web:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <a href="https://datalis.dev">
                                    <h4 className="font-semi-bold my-1">
                                        Datalis
                                    </h4>
                                </a>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Procesamiento de datos:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <a href="https://eltoque.com/proyectos/eltoque-defacto-verificacion-datos">
                                    <h4 className="font-semi-bold my-1">
                                        DeFacto
                                    </h4>
                                </a>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Gestión de redes sociales:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Elianys Justiniani
                                </h4>
                            </dd>
                        </dl>
                        <dl className="my-0 credit-row">
                            <dt className="col-6-sm right my-0">
                                <h4 className="font-semi-bold text-purple my-1">
                                    Coordinación general:
                                </h4>
                            </dt>
                            <dd className="col-6-sm my-0">
                                <h4 className="font-semi-bold my-1">
                                    Ana Lidia García
                                </h4>
                            </dd>
                        </dl>
                        <div className="row mt-8">
                            <div className="col-6 col-6-sm">
                                <div className="logo center">
                                    <Image
                                        src={etjLogo}
                                        width={200}
                                        height={100}
                                        objectFit="contain"
                                        alt="elTOQUE logo"
                                        priority
                                    />
                                </div>
                            </div>
                            <div className="col-6 col-6-sm">
                                <div className="logo center">
                                    <Image
                                        src={cvLogo}
                                        width={200}
                                        height={100}
                                        objectFit="contain"
                                        alt="elTOQUE logo"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
