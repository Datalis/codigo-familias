import fetch from "cross-fetch";

const API_KEY = process.env['NEXT_PUBLIC_RESTDB_API_KEY'];
const API_URL = 'https://codfam-cbff.restdb.io/rest/codfam?q={}&h={"$orderby":{"titulo": 1}}';

export async function fetchArticles() {
    const res = await fetch(API_URL, {
        headers: {
            'x-apiKey': API_KEY,
        },
    });
    return res.json();
}