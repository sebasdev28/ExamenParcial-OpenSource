import { HttpClient } from '@angular/common/http';
import { BaseApiEndpoint } from '../../shared/infrastructure/base-api-endpoint';
import { BookStock } from '../domain/model/book-stock.entity';
import { BookStockResource, BookStocksResponse } from './book-stocks-response';
import { BookStockAssembler } from './book-stock-assembler';
import { environment } from '../../../environments/environment';

/**
 * Endpoint for book stocks provided by the simulated backend.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookStocksApiEndpoint extends BaseApiEndpoint<
    BookStock,
    BookStockResource,
    BookStocksResponse,
    BookStockAssembler
> {
    /**
     * Creates the endpoint.
     * @param http - HTTP client.
     */
    constructor(http: HttpClient) {
        super(
            http,
            `${environment.platformProviderApiBaseUrl}${environment.platformProviderBookStocksEndpointPath}`,
            new BookStockAssembler(),
        );
    }
}
