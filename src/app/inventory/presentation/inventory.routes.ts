import { Routes } from '@angular/router';

const bookReceiptForm = () =>
    import('./views/book-receipt-form/book-receipt-form').then((m) => m.BookReceiptForm);

const baseTitle = 'Barnes & Noble Inventory Platform';

/**
 * Child routes of the inventory bounded context, mounted under `/inventory`.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export const inventoryRoutes: Routes = [
    { path: 'receipts/new', loadComponent: bookReceiptForm, title: `${baseTitle} - Receive Books` },
];
