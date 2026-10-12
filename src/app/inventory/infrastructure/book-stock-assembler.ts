import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { BookStock } from '../domain/model/book-stock.entity';
import { BookStockResource, BookStocksResponse } from './book-stocks-response';

/**
 * Assembler that maps book stock resources into {@link BookStock} entities.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookStockAssembler implements BaseAssembler<
    BookStock,
    BookStockResource,
    BookStocksResponse
> {
    /**
     * Converts the response envelope into entities.
     * @param response - Book stocks response.
     */
    toEntitiesFromResponse(response: BookStocksResponse): BookStock[] {
        return response.bookStocks.map((resource) => this.toEntityFromResource(resource));
    }

    /**
     * Converts a resource into a domain entity.
     * @param resource - Book stock resource.
     */
    toEntityFromResource(resource: BookStockResource): BookStock {
        return new BookStock({
            id: resource.id,
            bookstoreId: resource.bookstoreId,
            bookKey: resource.bookKey,
            bookTitle: resource.bookTitle,
            authorName: resource.authorName,
            copies: Number(resource.copies),
            receivedAt: new Date(resource.receivedAt),
        });
    }

    /**
     * Converts a domain entity into a resource. The identifier is omitted for new records so the
     * backend generates it.
     * @param entity - Book stock entity.
     */
    toResourceFromEntity(entity: BookStock): BookStockResource {
        const resource = {
            bookstoreId: entity.bookstoreId,
            bookKey: entity.bookKey,
            bookTitle: entity.bookTitle,
            authorName: entity.authorName,
            copies: entity.copies,
            receivedAt: entity.receivedAt.toISOString(),
        } as BookStockResource;
        if (entity.id) {
            resource.id = entity.id;
        }
        return resource;
    }
}
