import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoreResource, BookstoresResponse } from './bookstores-response';
import { BookstoreAssembler } from './bookstore-assembler';
import { environment } from '../../../environments/environment';

/**
 * Endpoint for bookstores provided by the simulated backend.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookstoresApiEndpoint extends BaseApiEndpoint<
    Bookstore,
    BookstoreResource,
    BookstoresResponse,
    BookstoreAssembler
> {
    /**
     * Creates the endpoint.
     * @param http - HTTP client.
     */
    constructor(http: HttpClient) {
        super(
            http,
            `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookstoresEndpointPath}`,
            new BookstoreAssembler(),
        );
    }
}
