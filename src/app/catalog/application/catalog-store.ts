import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { retry } from 'rxjs';
import { CatalogApi } from '../infrastructure/catalog-api';
import { Book } from '../domain/model/book.entity';
import { Specialty } from '../../shared/domain/model/specialty';

/**
 * Signal-based store for the catalog bounded context.
 *
 * @remarks
 * Caches the books of each specialty retrieved from the Open Library API.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class CatalogStore {
    readonly #catalogApi = inject(CatalogApi);
    readonly #booksBySpecialtySignal = signal<Partial<Record<Specialty, Book[]>>>({});
    readonly #loadingSignal = signal<boolean>(false);
    readonly #errorSignal = signal<string | null>(null);

    /** Whether a request is in progress. */
    readonly loading = this.#loadingSignal.asReadonly();
    /** Last error message, if any. */
    readonly error = this.#errorSignal.asReadonly();

    /**
     * Gets the books of a specialty that are already loaded.
     * @param specialty - Specialty.
     */
    getBooksBySpecialty(specialty: Specialty | null): Signal<Book[]> {
        return computed(() => (specialty ? (this.#booksBySpecialtySignal()[specialty] ?? []) : []));
    }

    /**
     * Gets a loaded book of a specialty by its key.
     * @param specialty - Specialty.
     * @param key - Open Library key of the book.
     */
    getBookByKey(specialty: Specialty | null, key: string | null): Signal<Book | undefined> {
        return computed(() =>
            key ? this.getBooksBySpecialty(specialty)().find((book) => book.key === key) : undefined,
        );
    }

    /**
     * Loads the books of a specialty from the Open Library API, unless they are already cached.
     * @param specialty - Specialty to load.
     */
    loadBooksBySpecialty(specialty: Specialty): void {
        if (this.#booksBySpecialtySignal()[specialty]) return;
        this.#loadingSignal.set(true);
        this.#errorSignal.set(null);
        this.#catalogApi
            .getBooksBySpecialty(specialty)
            .pipe(retry(2))
            .subscribe({
                next: (books) => {
                    this.#booksBySpecialtySignal.update((current) => ({ ...current, [specialty]: books }));
                    this.#loadingSignal.set(false);
                },
                error: (err) => {
                    this.#errorSignal.set(err instanceof Error ? err.message : 'Failed to load books');
                    this.#loadingSignal.set(false);
                },
            });
    }
}
