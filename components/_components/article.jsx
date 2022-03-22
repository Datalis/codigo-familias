import { useState } from "react";

const Article = ({
    title,
    chapter,
    section,
    name,
    text
}) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <article className="article">
            <div className="flex align-items-center">
                <h3 className="m-0 uppercase font-light text-purple">{title}</h3> 
                <span className="mx-2">/</span>
                <h3 className="m-0 font-regular">{chapter}</h3>
                <span className="mx-2">/</span>
                <h3 className="m-0 font-regular">{section}</h3>
            </div>
            <h3 className="mt-4 mb-2">{name}</h3>
            <p className="font-light mt-1 mb-0">{text}</p>
            <div className="divider"></div>
        </article>
    );
}

export default Article;