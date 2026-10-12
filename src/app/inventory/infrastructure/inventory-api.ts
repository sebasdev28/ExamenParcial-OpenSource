import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { BookStock } from '../domain/model/book-stock.entity';
import { BookStocksApiEndpoint } from './book-stocks-api-endpoint';

/**
 * Api facade for the inventory bounded context.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class InventoryApi extends BaseApi {
    readonly #bookStocksEndpoint = new BookStocksApiEndpoint(this.http);

    /** Retrieves all book stocks. */
    getBookStocks(): Observable<BookStock[]> {
        return this.#bookStocksEndpoint.getAll();
    }

    /**
     * Creates a book stock record.
     * @param bookStock - Book stock to create.
     */
    createBookStock(bookStock: BookStock): Observable<BookStock> {
        return this.#bookStocksEndpoint.create(bookStock);
    }
}
