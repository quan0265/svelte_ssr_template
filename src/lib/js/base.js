import { assets, base, resolveRoute } from '$app/paths';
import { goto } from '$app/navigation';
import { PUBLIC_IS_LOCAL } from '$env/static/public';
const is_local = PUBLIC_IS_LOCAL === 'true';
// const is_local = location.hostname == 'localhost';
const ssr = true;

var asset = '';
//if (location.hostname == 'localhost') {
//    // asset = '/sales/.svelte-kit';
//    asset = '/src';
//    // for view
//    if (location.port == '8000' || location.port == '8001' || location.port == '4173') {
//        asset = '';
//    }
//}
export {asset}

export function getRootApi() {
    var rs = 'https://interdogmedia.com';
    if (location && location.hostname != 'localhost') {
        return rs;
    }
    if (is_local) {
        rs = 'http://localhost:8000';
        //rs = 'http://localhost:8000/sales';
    }
    return rs;
}
// var root_api = getRootApi();

// export {root_api};

//export const S = document.querySelector.bind(document)
//export const SS = document.querySelectorAll.bind(document)


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

if (!ssr) {
    
}
//export var userToken = function() {
//    var a = null;
//    if (localStorage) {
//        a = localStorage.getItem('user_token');
//        if (!a && !(/\/login/.test(location.pathname))) {
//            //location.href = base + '/login';
//            return '';
//        }
//    }
//    return a;
//}

//export function getToken() {
//    var rs = localStorage.getItem('user_token');
//    if (!rs) rs = '';
//    return rs;
//}

//export function removeToken() {
//    localStorage.removeItem('user_token')
//}

//var token = '';
//if (localStorage) {
//    token = localStorage.getItem('user_token') || '';
//}
//export {token}

//export function checkLogin(res) {
//    if (res && (res.trim() == 'error_login' || res.trim() == 'error login')) {
//        if (location.hostname == 'localhost') {
//            console.error('error login');
//            //location.href = base + '/login';
//        }
//        else {
//            location.href = base + '/login';
//        }
//    }
//}

export function _get (param_name, url=null) {
    if (url) {
        var url_param = new URLSearchParams(url);
    }
    else {
        var url_param = new URLSearchParams(window.location.search);
    }
    return url_param.get(param_name);
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
    goto_site(domain) {
        domain = getDomain(domain)
        goto(`${base}/empty?url=${base}/site/${domain}`)
    },
    pageStart() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    pageEnd() {
        if (S('.app')) S('.app').removeClass('page-loading');
    },
    startLoadingPage() {
        if (S('.app')) S('.app').addClass('page-loading');
    },
    endLoadingPage() {
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
    },
    isJSON(text) {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    },

    // only web
    getCategory(id) {
        return lib.categories.find(item => item.id == id);
    },
    getCategories(ids) {
        if (!Array.isArray(ids)) return [];
        return lib.categories.filter(i => ids.includes(i.id) || ids.includes(i.id.toString()))
    },
    timeToAgo(time, now = null) {
        if (time === undefined || time == 0 || time == null) return '';
        var text = time.toString();
        if (text.length <= 10) {
            text = text + '000';
        }
        var d1 = new Date( parseFloat(text) )
        d1 = d1.getTime();
        var d2 = now != null ? new Date( now ).getTime() : new Date ().getTime();
    
        var seconds = Math.floor((d2 - d1) / 1000);
    
        var interval = Math.abs(Math.floor(seconds / (365*86400)));
    
        if (interval >= 1)  return interval + " năm trước";
    
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1)  return interval + " tháng trước";
    
        interval = Math.floor(seconds / 86400);
        if (interval >= 1)  return interval + " ngày trước";
    
        interval = Math.floor(seconds / 3600);
        if (interval >= 1)  return interval + " giờ trước";
    
        interval = Math.floor(seconds / 60);
        if (interval >= 1)  return interval + " phút trước";
        if (Math.floor(seconds) <= 5) return 'vừa xong';
        return Math.floor(seconds) + " giây trước";
    },

}

export {lib}

export function load_init() {
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('[data-toggle=dropdown]')) {
            var _btn = e.target.closest('[data-toggle=dropdown]');
            var _dropdown = _btn.closest('.dropdown')
            document.querySelectorAll('.dropdown.show').forEach(item => {
                if (item !== _dropdown) item.classList.remove('show')
            })
            var _dropdown_menu = _dropdown.querySelector('.dropdown-menu');
            if (_dropdown.classList.contains('show')) {
                _dropdown.classList.remove('show')
            }
            else {
                _dropdown.classList.add('show')
            }
        }
        else {
            if (!e.target.closest('.dropdown-menu')) {
                document.querySelectorAll('.dropdown.show').forEach(item => item.classList.remove('show'))
            }
        }
    })


}

export function validateForm(selector, callback) {
    function isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(_input, message) {
        let _form_group = _input.closest('.form-group');
        _form_group.classList.add('has-error');
        let _error_message = _form_group.querySelector('.help-block');
        if (!_error_message) {
            _input.insertAdjacentHTML('afterend', `<span class="help-block">${message}</span>`);
        }
        else {
            _error_message.innerText = message;
            _error_message.style.display = 'block';
        }
    }

    function removeError(_input) {
        let _form_group = _input.closest('.form-group');
        let _error_message = _form_group.querySelector('.help-block');
        _form_group.classList.remove('has-error');
        if (_error_message) _error_message.remove();
    }

    let _form = document.querySelector(selector);
    if (!_form) {
        return false;
    }

    _form.querySelectorAll('.form-group').forEach(function(_form_group) {
        let _input = _form_group.querySelector('input');
        if (!_input) return false;
        _input.addEventListener('input', function() {
            removeError(_input);
        })
    })

    _form.setAttribute('novalidate', 'novalidate');

    _form.addEventListener('submit', function(e) {
        e.preventDefault();

        let valid = true;
        let _input_invalid = null;
        _form.querySelectorAll('.form-group').forEach(function(_form_group) {
            let _input = _form_group.querySelector('input');
            if (!_input) return false;

            let name = _input.name;
            if (_input.value.trim() == '') {
                if (_input.hasAttribute('required')) {
                    valid = false;
                    if (!_input_invalid) {
                        _input_invalid = _input;
                    }
    
                    showError(_input, 'This field is required');
                }
            }
            else {
                if (_input.type == 'email' && !isEmail(_input.value)) {
                    valid = false;
                    if (!_input_invalid) {
                        _input_invalid = _input;
                    }
    
                    showError(_input, 'Please enter a valid email address');
                }
            }
        })

        if (!valid) {
            e.preventDefault();
            if (_input_invalid) {
                _input_invalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                _input_invalid.focus();
            }
        }

        if (valid && callback && typeof callback == 'function') {
            callback(_form);
        }
    })

}