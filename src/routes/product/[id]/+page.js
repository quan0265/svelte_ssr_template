import { dev } from '$app/environment';
import { goto } from '$app/navigation';
//import { assets, base } from '$app/paths';
//import { getRootApi, getToken, _get } from '$lib/page';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
//export const prerender = true;

// https://fakestoreapi.com/products

export async function load({ fetch, params, url }) {
    //var token = getToken();
    //let category_slug = params.category_slug;
    // let id = _get('id');
    // if (!id) {
    //     console.log(id);
    //     id = 'test.com';
    // }
    let rs = {
        id: params.id,
        product: null
    }
    //var res = await fetch('https://fakestoreapi.com/products?limit=12');
    //res = await res.json();
    //rs.products = res;
    return rs;
};