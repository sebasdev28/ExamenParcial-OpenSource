import { Routes } from '@angular/router';

const bookstoreOverview = () =>
    import('./views/bookstore-overview/bookstore-overview').then((m) => m.BookstoreOverview);

const baseTitle = 'Barnes & Noble Inventory Platform';

/**
 * Child routes of the bookstores bounded context, mounted under `/bookstores`.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export const bookstoresRoutes: Routes = [
    { path: 'overview', loadComponent: bookstoreOverview, title: `${baseTitle} - Bookstore Overview` },
];
