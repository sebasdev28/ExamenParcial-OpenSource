import { Book } from '../domain/model/book.entity';
import { SubjectWorksResponse, WorkResource } from './subject-works-response';
import { environment } from '../../../environments/environment';

/**
 * Assembler that maps Open Library work resources into {@link Book} entities.
 *
 * @remarks
 * `key` and `title` map directly; `authorName` comes from the name of the first element of
 * `authors` ("Unknown Author" when missing); `first_publish_year` and `cover_id` are mapped
 * to camelCase attributes.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookAssembler {
    /**
     * Converts a work resource into a book.
     * @param resource - Open Library work resource.
     */
    toEntityFromResource(resource: WorkResource): Book {
        return new Book({
            key: resource.key,
            title: resource.title,
            authorName: resource.authors?.[0]?.name ?? Book.UNKNOWN_AUTHOR,
            firstPublishYear: resource.first_publish_year ?? null,
            coverUrl: resource.cover_id
                ? `${environment.catalogProviderCoversBaseUrl}${resource.cover_id}-M.jpg`
                : '',
        });
    }

    /**
     * Converts the subject response into books, skipping malformed works.
     * @param response - Open Library subject response.
     */
    toEntitiesFromResponse(response: SubjectWorksResponse): Book[] {
        return (response.works ?? [])
            .map((work) => {
                try {
                    return this.toEntityFromResource(work);
                } catch (error) {
                    console.error('Skipping malformed work resource:', error, work);
                    return null;
                }
            })
            .filter((book): book is Book => book !== null);
    }
}
