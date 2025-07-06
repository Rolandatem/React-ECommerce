const inFetch = 
    async(endpoint: string, options: RequestInit = {})
    : Promise<Response> => {

    options = options || {};
    options.headers = {
        'x-internal-website-key': import.meta.env.VITE_WEBSITE_KEY,
        'x-site-api-key': import.meta.env.VITE_WEB_API_KEY,
        ...(options.headers || {})
    };

    return fetch(endpoint, options);
}

export default inFetch;