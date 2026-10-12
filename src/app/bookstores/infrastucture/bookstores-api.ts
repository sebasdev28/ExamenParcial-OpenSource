import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../shared/infrastructure/base-api';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoresApiEndpoint } from './bookstores-api-endpoint';

/**
 * Api facade for the bookstores bounded context.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class BookstoresApi extends BaseApi {
    readonly #bookstoresEndpoint = new BookstoresApiEndpoint(this.http);

    /** Retrieves all bookstores. */
    getBookstores(): Observable<Bookstore[]> {
        return this.#bookstoresEndpoint.getAll();
    }
}
