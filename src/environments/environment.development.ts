/**
 * Development environment configuration.
 *
 * @remarks
 * Holds every base URL and endpoint path used by the application, so that no URL or path is
 * hard coded inside infrastructure classes.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export const environment = {
  production: false,
  platformProviderApiBaseUrl: 'http://localhost:3000',
  platformProviderBookstoresEndpointPath: '/bookstores',
  platformProviderBookStocksEndpointPath: '/book-stocks',
  catalogProviderApiBaseUrl: 'https://openlibrary.org',
  catalogProviderSubjectsEndpointPath: '/subjects',
  catalogProviderSubjectsPageLimit: 50,
  catalogProviderCoversBaseUrl: 'https://covers.openlibrary.org/b/id/',
  logoProviderApiBaseUrl: 'https://img.logo.dev/',
  logoProviderPublishableKey: 'pk_bufKzaXPQFeNkMz5gxZWAA',
  organizationWebsiteUrl: 'https://www.barnesandnoble.com',
};
