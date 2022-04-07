import Fuse from 'fuse.js';
import { useCallback, useMemo, useState } from "react"

const useFuse = (list, options) => {
    const [query, setQuery] = useState('');

    const { limit, matchAllOnEmptyQuery, pageSize, ...fuseOptions } = options;

    const fuse = useMemo(() => {
        return new Fuse(list, fuseOptions);
    }, [list, fuseOptions]);

    const hits = useMemo(
        () => fuse.search(query, { limit }),
        [fuse, limit, query]
    );

    const onSearch = useCallback((e) => setQuery(e), [setQuery]);

    return {
        hits,
        onSearch,
        query
    }
}

export default useFuse;