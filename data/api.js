const API_KEY = process.env['NEXT_PUBLIC_RESTDB_API_KEY'];
const API_URL = 'https://codfam-cbff.restdb.io/rest/codfam?q={}&h={"$orderby":{"order": 1}}';

export async function fetchArticles() {
    /*if (process.env.NODE_ENV == 'development') {
        return data.sort((a,b) => b.order = a.order);
    }*/
    const res = await fetch(API_URL, {
        headers: {
            'x-apiKey': API_KEY,
        },
    });
    const articles = await res.json();
    return articles;
}

