import Collapsible from "./Collapsible";
import { motion } from 'framer-motion';

import SendIcon from '../public/icons/send.svg';
import LoadingIcon from '../public/icons/loading.svg';
import { useState } from "react";
import * as yup from 'yup';
import { useFormik } from "formik";

const schema = yup.object().shape({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().email("El correo electrónico no es válido").required('El correo electrónico es requerido'),
    message: yup.string().required('El mensaje no debe quedar en blanco')
})

const initialValues = {
    name: '',
    email: '',
    message: ''
}

const FrequentQuestions = () => {

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = ({ name, email, message }) => {
        const payload = {
            authorId: "_",
            authorName: name,
            authorEmail: email,
            content: message,
            threadOf: null, // si es la respuesta a otro comentario el id del comentario padre
            related: [{
                refId: "625ad9e1c28905001ce0eda0", // id del conetenido a comentar
                ref: "especial",
                field: "comments"
            }]
        }
        const url = "https://api.eltoque.datalis.dev/comments/especial:625ad9e1c28905001ce0eda0";
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }
        setLoading(true);
        fetch(url, reqOptions).then((res) => {
            if (res.status == 200) {
                resetForm(initialValues);
                setSuccess(true);
            }
            setLoading(false);
        })
    }

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        submitForm,
        resetForm
    } = useFormik({
        initialValues,
        validationSchema: schema,
        onSubmit
    })




    return (
        <div className="frequent-questions">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="uppercase mb-4 text-purple font-semi-bold">Preguntas frecuentes</h3>
                        <div className="divider"></div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-7">
                        <div className="flex flex-column" id="questions">
                            <Collapsible title={<span>¿La responsabilidad parental me quita derechos sobre mis hijas e hijos?</span>}>
                                <p className="font-regular my-1">
                                    La sustitución de la denominación «patria potestad» por «responsabilidad parental» en el proyecto del Código de las Familias implica más que un cambio de nombre. Implica que Cuba ha decidido asumir algunos de los compromisos internacionales derivados de su ratificación de la <a href="https://www.google.com/url?q=https://www.un.org/es/events/childrenday/pdf/derechos.pdf&amp;sa=D&amp;source=editors&amp;ust=1650176354792263&amp;usg=AOvVaw1w21cKqpnrBMyQohC6PT2E">Convención Internacional de los Derechos del Niño</a>
                                    <br />
                                    <br />
                                    La responsabilidad parental no defiende la obediencia indiscutible de los hijos a los padres y madres, sino que persigue la conformación de una relación paterno/materno filial que —sin eliminar la capacidad de contención de padres y madres sobre sus hijos— coloque en el centro la escucha y el reconocimiento del menor de edad como un sujeto de derecho y no como alguien que solo está obligado a obedecer.
                                    <br />
                                    <br />
                                    En ese sentido, al incluir el concepto de responsabilidad parental, el proyecto no elimina la capacidad disciplinaria o de contención de los progenitores o representantes legales sobre los hijos e hijas. Más bien prohíbe que esa contención se exprese en forma de castigos corporales, de tratos humillantes o «cualquier otro tipo de violencia, abuso o formas inapropiadas de disciplina». Esta prohibición rompe con la lógica que ha sostenido el Código de Familia vigente en su artículo 86 en el cual establece que los «padres están facultados para reprender y corregir adecuada y moderadamente a los hijos bajo su patria potestad».
                                </p>
                            </Collapsible>
                            <Collapsible title={<span>¿El Código dice que los niños y niñas son libres de hacer lo que quieran sin contar con sus padres?</span>}>
                                <p className="font-regular my-1">
                                    La autonomía progresiva es un principio que introdujo la <a href="https://www.google.com/url?q=https://www.un.org/es/events/childrenday/pdf/derechos.pdf&amp;sa=D&amp;source=editors&amp;ust=1650176354793294&amp;usg=AOvVaw0jk8VNdcm3dVg9TFk3TUrv">Convención sobre los Derechos del Niño</a> de la cual Cuba es signataria desde 1991.
                                    <br />
                                    <br />
                                    Desde que el Código de Procesos entrara en vigor el primero de enero de 2021 y sin necesidad de que se apruebe el nuevo Código de las Familias, las niñas y niños cubanos tienen derecho a ser escuchados en un Tribunal de acuerdo con su capacidad/autonomía progresiva.
                                    <br />
                                    <br />
                                    El Código de las Familias reconoce en nuestra normativa interna los derechos consagrados en la Convención, pero también establece el alcance y los límites para su ejercicio.
                                    <br />
                                    <br />
                                    Por ejemplo, el proyecto del Código de las Familias establece en su artículo 110 que «la niña, el niño o adolescente, si tiene edad y grado de madurez suficiente», puede intervenir en el proceso de su adopción con la asistencia de un abogado.
                                    <br />
                                    <br />
                                    Es probable que en otras normas ajenas al Código de las Familias que se promulguen en un futuro, como la ley de identidad o del Registro del Estado Civil, se establezcan otras limitaciones basadas en la edad que redundarán en restricciones a los menores de edad para el ejercicio de determinados derechos.
                                </p>
                            </Collapsible>
                            <Collapsible title={<span>¿Podré educar a mi hijo o hija con castigos corporales?</span>}>
                                <p className="font-regular my-1">
                                    No. Las niñas, niños y adolescentes tienen derecho a recibir orientación y educación de las personas adultas responsables de su crianza sin que, en modo alguno, se autorice a estos el uso del castigo corporal en cualquiera de sus formas, el trato humillante o el empleo de cualquier otro tipo de violencia, abuso o formas inapropiadas de disciplina, incluida la negligencia y la desatención o todo hecho que les lesione o menoscabe física, moral o psíquicamente. (Artículo 146. Capítulo I. Sección Primera. Título V)
                                </p>
                            </Collapsible>
                            <Collapsible title={<span>¿Permite la nueva norma la adopción de menores?</span>}>
                                <p className="font-regular my-1">
                                    Sí. La adopción es una forma de integración familiar que tiene por objeto garantizar el derecho de niños, niñas y adolescentes a vivir en familia y asegurar su bienestar y desarrollo integral. Los menores adoptados tienen derecho a conocer su identidad biológica y origen, así como a acceder al expediente de adopción, una vez tengan plena capacidad jurídica. La adopción es indivisible e irrevocable, una vez que se autoriza judicialmente.
                                    <br />
                                    <br />
                                    Solamente pueden ser adoptadas las personas menores de dieciocho (18) años de edad que sus progenitores no sean conocidos o que se encuentren en algunos de los casos siguientes:
                                    <br />
                                    <br />
                                    a) padres fallecidos o declaración judicial de presunción de muerte;
                                    <br />
                                    <br />
                                    b) padres privados por la Ley de ejercer la responsabilidad parental, o;
                                    <br />
                                    <br />
                                    c) padres que manifiesten expresamente su voluntad a los fines de dicha adopción.
                                </p>
                            </Collapsible>
                            <Collapsible title={<span>¿Puedo perder la titularidad de la responsabilidad parental?</span>}>
                                <p className="font-regular my-1">
                                    Sí, en caso de ser estimado por las autoridades competentes. Algunas de las circunstancias especiales que pueden llevar a la pérdida de la titularidad son las siguientes:
                                </p>
                                <ul>
                                    <li>
                                        Se incumplan grave o reiteradamente los deberes previstos para con el niño o niña.
                                    </li>
                                    <li>
                                        Se ejerzan malos tratos, castigo corporal o violencia en cualquiera de sus otras manifestaciones, o cualquier hecho que en el entorno familiar lesione o menoscabe física o psíquicamente, directa o indirectamente, a las niñas, niños o adolescentes.
                                    </li>
                                    <li>
                                        Se induzca a la hija o hijo a ejecutar algún acto delictivo.
                                    </li>
                                    <li>
                                        Se abandone a la hija o hijo, aunque se encuentre bajo la guarda y cuidado de la otra madre, padre o de una tercera persona.
                                    </li>
                                    <li>
                                        Se observe una conducta viciosa, corruptora o delictiva, que resulte incompatible con el debido ejercicio de la responsabilidad parental.
                                    </li>
                                    <li>
                                        Se cometa delito contra la persona de la hija o hijo.
                                    </li>
                                    <li>
                                        Se arriesgue gravemente la vida o la integridad psíquica y física de la hija o hijo. (Artículo 191. Capítulo V. Título V)
                                    </li>
                                </ul>
                            </Collapsible>
                            <Collapsible title={<span>¿Cuáles son las autoridades competentes y las circunstancias especiales?</span>}>
                                <p className="font-regular my-1">
                                    Solo los Tribunales podrán determinar separar a un menor de sus padres y familia, como medida de último recurso que debe ser revisada periódicamente. Para tal determinación, dichas autoridades deberán atender a las circunstancias especiales mencionadas en la pregunta anterior, de conformidad con la ley y los procedimientos establecidos, y en todo momento en atención al interés superior del niño o niña y a los principios de necesidad, excepcionalidad y temporalidad.
                                </p>
                            </Collapsible>
                            <Collapsible title={<span>¿Este nuevo Código permite el matrimonio entre personas del mismo sexo?</span>}>
                                <p className="font-regular my-1">
                                    Sí. El proyecto de Código de las Familias establece que el matrimonio es la unión voluntariamente concertada de dos personas con aptitud legal para ello, a fin de hacer vida en común, sobre la base del afecto, el amor y el respeto mutuos.
                                </p>
                            </Collapsible>
                        </div>
                    </div>
                    <div className="col-5">

                        <form onSubmit={handleSubmit} id="contactForm" noValidate className="flex flex-column">
                            <h4 className="text-orange mt-2">¿Tienes alguna pregunta?</h4>
                            <div className="input-group">
                                <input className="form-control" placeholder="Nombre" type="text"
                                    name="name" value={values.name} onChange={handleChange} />
                                {
                                    errors.name && touched.name && (
                                        <span className="text-error">{errors.name}</span>
                                    )
                                }
                            </div>
                            <div className="input-group mt-4">
                                <input className="form-control" placeholder="Correo electrónico" type="email"
                                    name="email" value={values.email} onChange={handleChange} />
                                {
                                    errors.email && touched.email && (
                                        <span className="text-error">{errors.email}</span>
                                    )
                                }
                            </div>
                            <div className="input-group mt-4">
                                <div className="textarea-container">
                                    <textarea className="form-control" placeholder="Deja tu comentario" rows={5}
                                        name="message" value={values.message} onChange={handleChange}></textarea>
                                    <motion.div onClick={() => submitForm()} className="send-icon" whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.2 }}>
                                        {
                                            !loading ? (
                                                <SendIcon />
                                            ) : (
                                                <LoadingIcon />
                                            )
                                        }
                                    </motion.div>
                                </div>
                                {
                                    errors.message && touched.message && (
                                        <span className="text-error">{errors.message}</span>
                                    )
                                }
                            </div>
                            {
                                success && (
                                    <span className="text-green mt-4 font-semi-bold">Tu comentario se envio correctamente!</span>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default FrequentQuestions;
