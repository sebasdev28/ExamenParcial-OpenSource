import { BaseAssembler } from '../../shared/infrastructure/base-assembler';
import { toSpecialty } from '../../shared/domain/model/specialty';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoreResource, BookstoresResponse } from './bookstores-response';

/**
 * Assembler that maps bookstore resources into {@link Bookstore} entities.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookstoreAssembler implements BaseAssembler<
    Bookstore,
    BookstoreResource,
    BookstoresResponse
> {
    /**
     * Converts the response envelope into entities.
     * @param response - Bookstores response.
     */
    toEntitiesFromResponse(response: BookstoresResponse): Bookstore[] {
        return response.bookstores.map((resource) => this.toEntityFromResource(resource));
    }

    /**
     * Converts a resource into a domain entity.
     * @param resource - Bookstore resource.
     */
    toEntityFromResource(resource: BookstoreResource): Bookstore {
        return new Bookstore({
            id: resource.id,
            name: resource.name,
            specialty: toSpecialty(resource.specialty),
            minimumCopies: Number(resource.minimumCopies),
        });
    }

    /**
     * Converts a domain entity into a resource.
     * @param entity - Bookstore entity.
     */
    toResourceFromEntity(entity: Bookstore): BookstoreResource {
        return {
            id: entity.id,
            name: entity.name,
            specialty: entity.specialty,
            minimumCopies: entity.minimumCopies,
        };
    }
}
