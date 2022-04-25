import lunr from 'lunr';
import stemmer from 'lunr-languages/min/lunr.stemmer.support.min.js';
import es from 'lunr-languages/min/lunr.es.min.js';

import { useEffect, useMemo, useState } from 'react';

stemmer(lunr);
es(lunr);

const useLunr = (data, { limit }) => {


    const [index, setIndex] = useState();

    useEffect(() => {
        const index = lunr(function () {
            this.use(lunr.es);
            this.ref('_id');
            this.field('articulo');
            this.field('texto');
            this.metadataWhitelist = ['position']
            data.forEach(e => {
                this.add(
                    {
                        _id: e['_id'],
                        articulo: e['articulo'],
                        texto: e['texto'],
                    }
                );
            }, this)
        });
        setIndex(index);
    }, []);

    const [query, setQuery] = useState(null);

    const queryIndex = (query) => {
        const res = index?.search(query)?.slice(0, limit) || [];
        const _data = data.reduce((acc, e) => {
            const i = res.findIndex(r => r.ref == e._id);
            if (i == -1) return acc;
            const r = res[i];
            const r1 = {
                ...r,
                item: e,
            }
            return [...acc, r1];
        }, []);
        return _data;
    }

    const results = useMemo(() => {
        return query ? queryIndex(query) : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    const onSearch = (query) => setQuery(query);

    return useMemo(() => (
        {
            //query,
            results,
            onSearch
        }
    ), [results, onSearch])
}

export default useLunr;