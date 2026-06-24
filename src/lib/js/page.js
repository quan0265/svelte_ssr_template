//import { getRootApi } from "./base";
import { goto } from '$app/navigation';
// import { PUBLIC_IS_LOCAL } from '$env/static/public';
// const is_local = PUBLIC_IS_LOCAL === 'true';
// const is_local = location.hostname == 'localhost';
const ssr = true;

// export function getRootApi() {
//     var rs = ''
//     if (is_local) {
//         rs = 'http://localhost:8000';
//         //rs = 'http://localhost:8000/sales';
//     }
//     else {
//         rs = 'https://interdogmedia.com';
//     }
//     return rs;
// }

export function getToken() {
    var rs = localStorage.getItem('user_token');
    if (!rs) rs = '';
    return rs;
}

export function _get (param_name, url=null) {
    if (url) {
        if (typeof url == 'object') {
            var url_param = new URLSearchParams(url.searchParams);
        }
        else {
            var url_param = new URLSearchParams(url);
        }
    }
    else {
        var url_param = new URLSearchParams(window.location.search);
    }
    return url_param.get(param_name);
}

export function ajax(options) {
    var config = {
        async: true,
        method: 'get',
        data: {},
        success: function(res) {},
        error: function(status) {},
        complete: function(xhr) {}
    }
    Object.assign(config, options)
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                config.success(xhr.responseText);
            } else {
                config.error(xhr.status);
            }
        }
    };
    xhr.onloadend = function() {
        config.complete(xhr)
    }
    xhr.open(config.method, config.url, config.async);
    if (config.method.toLowerCase() == 'post') {
        if (config.data instanceof FormData) {
            xhr.processData = false;
            xhr.contentType = false;
        } else {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            let formData = new URLSearchParams();
            for (let key in config.data) {
                formData.append(key, config.data[key]);
            }
            config.data = formData.toString();
        }
    }
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send(config.data);
}


export function getDomain(url) {
    url = url.trim();
    url = url.replace(/.*\/\/www./, '');
    url = url.replace(/.*:\/\//, '');
    url = url.replace(/#.*$/, '');
    url = url.replace(/\?.*$/, '');
    url = url.replace(/^\./, '');
    url = url.replace(/\.$/, '');
    url = url.replace(/\/.*/, '');
    
    if (!/\./.test(url)) {
        return null;
    }

    const cc_ltd = [".ac",".ad",".ae",".af",".ag",".ai",".al",".am",".ao",".aq",".ar",".as",".at",".au",".aw",".ax",".az",".ba",".bb",".bd",".be",".bf",".bg",".bh",".bi",".bj",".bm",".bn",".bo",".br",".bs",".bt",".bw",".by",".bz",".ca",".cc",".cd",".cf",".cg",".ch",".ci",".ck",".cl",".cm",".cn",".co",".cr",".cu",".cv",".cw",".cx",".cy",".cz",".de",".dj",".dk",".dm",".do",".dz",".ec",".ee",".eg",".er",".es",".et",".eu",".fi",".fj",".fk",".fm",".fo",".fr",".ga",".gd",".ge",".gf",".gg",".gh",".gi",".gl",".gm",".gn",".gp",".gq",".gr",".gs",".gt",".gu",".gw",".gy",".hk",".hm",".hn",".hr",".ht",".hu",".id",".ie",".il",".im",".in",".io",".iq",".ir",".is",".it",".je",".jm",".jo",".jp",".ke",".kg",".kh",".ki",".km",".kn",".kp",".kr",".kw",".ky",".kz",".la",".lb",".lc",".li",".lk",".lr",".ls",".lt",".lu",".lv",".ly",".ma",".mc",".md",".me",".mg",".mh",".mk",".ml",".mm",".mn",".mo",".mp",".mq",".mr",".ms",".mt",".mu",".mv",".mw",".mx",".my",".mz",".na",".nc",".ne",".nf",".ng",".ni",".nl",".no",".np",".nr",".nu",".nz",".om",".pa",".pe",".pf",".pg",".ph",".pk",".pl",".pm",".pn",".pr",".ps",".pt",".pw",".py",".qa",".re",".ro",".rs",".ru",".rw",".sa",".sb",".sc",".sd",".se",".sg",".sh",".si",".sk",".sl",".sm",".sn",".so",".sr",".ss",".st",".sv",".sx",".sy",".sz",".tc",".td",".tf",".tg",".th",".tj",".tk",".tl",".tm",".tn",".to",".tr",".tt",".tv",".tw",".tz",".ua",".ug",".uk",".us",".uy",".uz",".va",".vc",".ve",".vg",".vi",".vn",".vu",".wf",".ws",".ye",".yt",".za",".zm",".zw"];
    
    let arr = url.split('.');
    
    if (arr.length >= 3) {
        url = arr[arr.length - 3] + '.' + arr[arr.length - 2] + '.' + arr[arr.length - 1];
    }
    
    arr = url.split('.');
    
    if (arr.length >= 3) {
        const last_ltd = arr[arr.length - 1];
        if (!cc_ltd.includes('.' + last_ltd)) {
            url = arr[arr.length - 2] + '.' + arr[arr.length - 1];
        }
    }
    
    return url;
}

export function http_build_query(params) {
    return Object.keys(params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        .join('&');
}


var lib = {
    categories: JSON.parse(`[]`),
    web_name: 'S24',
    languages: ['EN', 'VI', 'FR'],
    pageStart() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    pageEnd() {
        if (S('.app')) S('.app').removeClass('page-loading');
    },
    isLocal() {
        return location.hostname == 'localhost';
    },
    removeHtmlTag(input) {
        return input.replace(/<[^>]*>?/gm, '');
    },
    truncate(str, length=100) {
        if (str.length <= length) {
            return str;
        } else {
            return str.substring(0, length) + "...";
        }
    }

}
export {lib}