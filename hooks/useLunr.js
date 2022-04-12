import lunr from 'lunr';
import stemmer from 'lunr-languages/lunr.stemmer.support';
import es from 'lunr-languages/lunr.es';

stemmer(lunr);
es(lunr);

import { useCallback, useEffect, useMemo, useState } from 'react';

const useLunr = (data, { limit }) => {
    const index = lunr(function () {
        this.use(lunr.es);
        this.ref('_id');
        this.field('articulo');
        this.field('texto');
        this.field('comentario');
        this.metadataWhitelist = ['position']
        data.forEach(e => {
            this.add(
                {
                    _id: e['_id'],
                    articulo: e['articulo'],
                    texto: e['texto'],
                    comentario: e['comentario']
                }
            );
        }, this)
    })

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
    }, [query]);

    const onSearch = useCallback((query) => setQuery(query), [setQuery]);

    return {
        query,
        results,
        onSearch
    }
}

export default useLunr;