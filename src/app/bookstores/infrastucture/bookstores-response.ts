import { BaseResource, BaseResponse } from '../../shared/infrastructure/base-response';

/**
 * Response envelope for bookstores.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface BookstoresResponse extends BaseResponse {
    /** Bookstore resources. */
    bookstores: BookstoreResource[];
}

/**
 * Bookstore resource as provided by the simulated backend.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface BookstoreResource extends BaseResource {
    id: number;
    name: string;
    specialty: string;
    minimumCopies: number;
}
