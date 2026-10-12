import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandlingEnabledBaseType } from '../../shared/infrastructure/error-handling-enabled-base-type';
import { Specialty } from '../../shared/domain/model/specialty';
import { Book } from '../domain/model/book.entity';
import { SubjectWorksResponse } from './subject-works-response';
import { BookAssembler } from './book-assembler';
import { environment } from '../../../environments/environment';

/**
 * Api object for the Open Library API, the external API provider of the catalog.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class CatalogApi extends ErrorHandlingEnabledBaseType {
    readonly #http = inject(HttpClient);
    readonly #bookAssembler = new BookAssembler();
    readonly #subjectsEndpointUrl = `${environment.catalogProviderApiBaseUrl}${environment.catalogProviderSubjectsEndpointPath}`;

    /**
     * Retrieves the books of a specialty.
     * @param specialty - Specialty used as Open Library subject.
     */
    getBooksBySpecialty(specialty: Specialty): Observable<Book[]> {
        return this.#http
            .get<SubjectWorksResponse>(`${this.#subjectsEndpointUrl}/${specialty}.json`, {
                params: { limit: environment.catalogProviderSubjectsPageLimit },
            })
            .pipe(
                map((response) => this.#bookAssembler.toEntitiesFromResponse(response)),
                catchError(this.handleError('Failed to fetch books')),
            );
    }
}
