import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Response envelope for book stocks.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface BookStocksResponse extends BaseResponse {
    /** Book stock resources. */
    bookStocks: BookStockResource[];
}

/**
 * Book stock resource as provided by the simulated backend.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface BookStockResource extends BaseResource {
    id: number;
    bookstoreId: number;
    bookKey: string;
    bookTitle: string;
    authorName: string;
    copies: number;
    receivedAt: string;
}
