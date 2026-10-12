import { BaseResource, BaseResponse } from './base-response';
import { BaseEntity } from '../domain/model/base-entity';

/**
 * Assembler contract that maps between resources, responses and domain entities.
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with the API provider.
 * @typeParam TResponse - Response envelope type returned by the API provider.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface BaseAssembler<
    TEntity extends BaseEntity,
    TResource extends BaseResource,
    TResponse extends BaseResponse,
> {
    /**
     * Converts a resource into a domain entity.
     * @param resource - Resource received from the API provider.
     */
    toEntityFromResource(resource: TResource): TEntity;

    /**
     * Converts a domain entity into a resource.
     * @param entity - Domain entity to send to the API provider.
     */
    toResourceFromEntity(entity: TEntity): TResource;

    /**
     * Converts a response envelope into a list of domain entities.
     * @param response - Response envelope received from the API provider.
     */
    toEntitiesFromResponse(response: TResponse): TEntity[];
}
