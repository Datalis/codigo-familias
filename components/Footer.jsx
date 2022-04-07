import Image from 'next/image';

import footerImg from '../public/images/footer.png';
import footerLogo from '../public/images/logo_variant.png';

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="footer__content container">
                <div className="row">
                    <div className="col-6"></div>
                    <div className="col-6 col-12-sm">
                        <div className='center'>
                            <h3 className='uppercase font-semi-bold'>Créditos</h3>
                        </div>
                        <dl className='row my-8'>
                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Contenido:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>

                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Diseño:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>

                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Programación:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>

                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Contenido:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>

                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Contenido:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>

                            <dt className='col-6-sm right my-0'>
                                <h4 className='font-semi-bold text-purple my-1'>Contenido:</h4>
                            </dt>
                            <dd className='col-6-sm my-0'>
                                <h4 className='font-semi-bold my-1'>Nombre Apellido</h4>
                            </dd>
                        </dl>
                        <div className='logo center'>
                            <Image src={footerLogo} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer__img">
                <Image src={footerImg}></Image>
            </div>
        </footer>
    );
}

export default Footer;