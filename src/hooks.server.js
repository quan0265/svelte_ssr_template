import { minify } from 'html-minifier-terser';

export async function handle({ event, resolve }) {
    const response = await resolve(event);

    if (response.headers.get('content-type')?.includes('text/html')) {
        let body = await response.text();
        body = await minify(body, {
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        });

        return new Response(body, {
            status: response.status,
            headers: response.headers,
        });
    }

    return response;
}
