import { useMemo } from "react";

const RelatedArticles = ({ relatedPosts }) => {

    const posts = useMemo(() => {
        return relatedPosts.map((e) => {
            const { id, title, feature_image, excerpt } = e;
            return {
                id,
                title,
                feature_image,
                excerpt
            }
        })
    }, [relatedPosts]);

    return (
        <div className="related-articles">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="center uppercase font-semi-bold text-green">Artículos relacionados</h3>
                    </div>
                </div>
                <div className="row">
                    {posts.map((e, i) => (
                        <div className="col-6">
                            <div className="related-articles__item"
                                style={{
                                    //backgroundImage: `url(https://api.eltoque.com${e.feature_image.url})`
                                }}>
                                <div className="content">
                                    <img className="image" src={`https://api.eltoque.com${e.feature_image.url}`}/>
                                    <span className="title font-bold">{ e.title }</span>
                                    <p className="excerpt font-regular">{e.excerpt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RelatedArticles;