/**
 * Site-wide settings.
 */
const siteSettings = {
    /** URL to the API used in the application. */
    webAPIUrl: window.location.origin.includes('localhost')
        ? 'http://localhost:5000/api'
        : '<production url>'
}

export default siteSettings;