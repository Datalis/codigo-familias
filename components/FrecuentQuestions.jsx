import Collapsible from "./Collapsible";

import SendIcon from '../public/icons/send.svg';

const FrequentQuestions = () => {
    return (
        <div className="frequent-questions">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="uppercase mb-4 text-purple font-bold">Preguntas frecuentes</h3>
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">
                        <div className="flex flex-column">
                            <Collapsible title="Pregunta Frecuente #1">
                                <p className="font-regular my-1">Lorem ipsum dolor sit amet consectetur adipiscing elit, tortor fames interdum condimentum platea nascetur, ante ac accumsan rutrum eget cum. Ullamcorper molestie tempus fermentum venenatis aliquet nullam sociosqu viverra platea, pharetra commodo leo sed ultricies hac feugiat vestibulum. Nunc nisl praesent nibh semper auctor porta senectus, vivamus porttitor aptent massa quam vehicula mattis, enim integer justo erat sagittis laoreet.</p>
                            </Collapsible>
                            <Collapsible title="Pregunta Frecuente #2">
                                <p className="font-regular my-1">Lorem ipsum dolor sit amet consectetur adipiscing elit, tortor fames interdum condimentum platea nascetur, ante ac accumsan rutrum eget cum. Ullamcorper molestie tempus fermentum venenatis aliquet nullam sociosqu viverra platea, pharetra commodo leo sed ultricies hac feugiat vestibulum. Nunc nisl praesent nibh semper auctor porta senectus, vivamus porttitor aptent massa quam vehicula mattis, enim integer justo erat sagittis laoreet.</p>
                            </Collapsible>
                            <Collapsible title="Pregunta Frecuente #3">
                                <p className="font-regular my-1">Lorem ipsum dolor sit amet consectetur adipiscing elit, tortor fames interdum condimentum platea nascetur, ante ac accumsan rutrum eget cum. Ullamcorper molestie tempus fermentum venenatis aliquet nullam sociosqu viverra platea, pharetra commodo leo sed ultricies hac feugiat vestibulum. Nunc nisl praesent nibh semper auctor porta senectus, vivamus porttitor aptent massa quam vehicula mattis, enim integer justo erat sagittis laoreet.</p>
                            </Collapsible>
                        </div>
                    </div>
                    <div className="col-6">
                        <form id="contactForm" noValidate className="flex flex-column">
                            <h4 className="text-orange mt-2">¿Tienes alguna pregunta?</h4>
                            <input className="form-control" placeholder="Nombre" />
                            <input className="form-control" placeholder="Correo electrónico" />
                            <div className="textarea-container">
                                <textarea className="form-control" placeholder="Deja tu comentario" rows={8}></textarea>
                                <div className="send-icon">
                                    <SendIcon></SendIcon>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrequentQuestions;