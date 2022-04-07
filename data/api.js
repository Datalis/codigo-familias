import fetch from "cross-fetch";

const API_KEY = process.env['NEXT_PUBLIC_RESTDB_API_KEY'];
const API_URL = 'https://codfam-cbff.restdb.io/rest/codfam?q={}&h={"$orderby":{"order": 1}}';

import data from './data.dev.json';

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
    return sortArticles(articles);
}


const sortArticles = (data = []) => {
    return data.map(e => {
        const _t = e._id.toString().substring(0,8);
        const _timestamp = new Date(parseInt(_t, 16) * 1000);
        return {
            ...e,
            timestamp: _timestamp
        }
    }).sort((a, b) => {
        const _dateA = new Date(a.timestamp);
        const _dateB = new Date(b.timestamp);
        return _dateB - _dateA;
    }).map(e => {
        delete e.timestamp;
        return e;
    });
}