

import StackedCarousel from './StackedCarousel';



const GuidedVisit = ({ articles }) => {

  return (
    <section className="guided-visit">
      <div className="container">
        <div className="guided-visit__intro">
          <h3 className="center uppercase text-green font-bold mb-5">
            Visita guiada por el código de familias
          </h3>
          <p className="font-medium center mx">
            El proyecto del Código de las Familias cuenta con 471 artículos,
            segmentados en 11 títulos. Desde <em>elTOQUE</em> queremos
            contribuir a facilitar su comprensión con una visita comentada sobre
            los principales cambios y aportes del texto.
            <br />
            <br />
            Con esta herramienta podrás avanzar por 114 comentarios en los
            cuales encontrarás elementos relevantes de la propuesta jurídica. Si
            te interesa buscar un artículo en específico, los puedes encontrar
            todos enumerados al inicio.
          </p>
        </div>
        <div className="guided-visit__slider">
          <StackedCarousel data={articles}>
            {/*slides.map((e, i) => (
              <Article {...e} key={e._id} />
            ))*/}
          </StackedCarousel>
        </div>
        <div className="guided-visit__download">
          <a className="button" href='https://api.eltoque.com/uploads/Proyecto_de_Codigo_de_Familia_9eaa77e1ee.pdf' download>Descargar PDF</a>
        </div>
      </div>
    </section>
  );
};

export default GuidedVisit;
