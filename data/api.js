const API_KEY = process.env['NEXT_PUBLIC_RESTDB_API_KEY'];
const API_URL = 'https://codfam-cbff.restdb.io/rest/codfam?q={}&h={"$orderby":{"order": 1}}';
const RELATED_POSTS_URL = 'https://api.eltoque.com/posts?categories=62461382c9d45f001e9ba33e';

export async function fetchArticles() {
    const res = await fetch(API_URL, {
        headers: {
            'x-apiKey': API_KEY,
        },
    });
    const articles = await res.json();
    return articles;
}

export async function fetchRelatedPosts() {
    const res = await fetch(RELATED_POSTS_URL);
    const _posts = await res.json();
    const posts = _posts.reverse().slice(0, 2);
    return posts;
}
