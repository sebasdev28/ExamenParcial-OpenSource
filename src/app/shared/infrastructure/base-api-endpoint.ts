import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseEntity } from '../domain/model/base-entity';
import { BaseResource, BaseResponse } from './base-response';
import { BaseAssembler } from './base-assembler';
import { ErrorHandlingEnabledBaseType } from './error-handling-enabled-base-type';

/**
 * Generic REST endpoint that performs CRUD operations and delegates mapping to an assembler.
 *
 * @typeParam TEntity - Domain entity type.
 * @typeParam TResource - Resource type exchanged with the API provider.
 * @typeParam TResponse - Response envelope type returned by the API provider.
 * @typeParam TAssembler - Assembler used to map resources and entities.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export abstract class BaseApiEndpoint<
    TEntity extends BaseEntity,
    TResource extends BaseResource,
    TResponse extends BaseResponse,
    TAssembler extends BaseAssembler<TEntity, TResource, TResponse>,
> extends ErrorHandlingEnabledBaseType {
    /**
     * Creates the endpoint.
     *
     * @param http - HTTP client.
     * @param endpointUrl - Absolute endpoint URL built from environment variables.
     * @param assembler - Assembler for this endpoint.
     */
    protected constructor(
        protected http: HttpClient,
        protected endpointUrl: string,
        protected assembler: TAssembler,
    ) {
        super();
    }

    /**
     * Retrieves all entities. Supports both plain array and envelope responses.
     */
    getAll(): Observable<TEntity[]> {
        return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
            map((response) => this.toEntities(response)),
            catchError(this.handleError('Failed to fetch entities')),
        );
    }

    /**
     * Retrieves one entity by its identifier.
     * @param id - Entity identifier.
     */
    getById(id: number): Observable<TEntity> {
        return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
            map((resource) => this.assembler.toEntityFromResource(resource)),
            catchError(this.handleError('Failed to fetch entity')),
        );
    }

    /**
     * Creates an entity.
     * @param entity - Entity to create.
     */
    create(entity: TEntity): Observable<TEntity> {
        const resource = this.assembler.toResourceFromEntity(entity);
        return this.http.post<TResource>(this.endpointUrl, resource).pipe(
            map((created) => this.assembler.toEntityFromResource(created)),
            catchError(this.handleError('Failed to create entity')),
        );
    }

    /**
     * Updates an entity.
     * @param entity - Entity with the new values.
     * @param id - Entity identifier.
     */
    update(entity: TEntity, id: number): Observable<TEntity> {
        const resource = this.assembler.toResourceFromEntity(entity);
        return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
            map((updated) => this.assembler.toEntityFromResource(updated)),
            catchError(this.handleError('Failed to update entity')),
        );
    }

    /**
     * Deletes an entity.
     * @param id - Entity identifier.
     */
    delete(id: number): Observable<void> {
        return this.http
            .delete<void>(`${this.endpointUrl}/${id}`)
            .pipe(catchError(this.handleError('Failed to delete entity')));
    }

    /**
     * Converts a plain array or an envelope response into domain entities.
     * @param response - Raw response.
     */
    protected toEntities(response: TResponse | TResource[]): TEntity[] {
        if (Array.isArray(response)) {
            return response.map((resource) => this.assembler.toEntityFromResource(resource));
        }
        return this.assembler.toEntitiesFromResponse(response as TResponse);
    }
}
