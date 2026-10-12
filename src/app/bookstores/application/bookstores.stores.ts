import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { BookstoresApi } from '../infrastructure/bookstores-api';
import { Bookstore } from '../domain/model/bookstore.entity';
import { BookstoreInventory } from '../domain/model/bookstore-inventory';
import { Specialty } from '../../shared/domain/model/specialty';
import { InventoryStore } from '../../inventory/application/inventory.store';

/**
 * Signal-based store for the bookstores bounded context.
 *
 * @remarks
 * Keeps the bookstores and derives the book inventory of each bookstore from the book stock
 * records of the inventory bounded context.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class BookstoresStore {
    readonly #bookstoresApi = inject(BookstoresApi);
    readonly #inventoryStore = inject(InventoryStore);
    readonly #bookstoresSignal = signal<Bookstore[]>([]);
    readonly #loadingSignal = signal<boolean>(false);
    readonly #errorSignal = signal<string | null>(null);

    /** Bookstores. */
    readonly bookstores = this.#bookstoresSignal.asReadonly();
    /** Book inventory of every bookstore; recomputed whenever book stocks change. */
    readonly bookstoreInventories = computed(() =>
        this.#bookstoresSignal().map(
            (bookstore) => new BookstoreInventory(bookstore, this.#inventoryStore.bookStocks()),
        ),
    );
    /** Whether a request is in progress (bookstores or book stocks). */
    readonly loading = computed(() => this.#loadingSignal() || this.#inventoryStore.loading());
    /** Last error message, if any (bookstores or book stocks). */
    readonly error = computed(() => this.#errorSignal() ?? this.#inventoryStore.error());

    /** Loads the bookstores on creation. */
    constructor() {
        this.#loadBookstores();
    }

    /**
     * Gets the bookstore of a specialty (there is a single bookstore per specialty).
     * @param specialty - Specialty to look for.
     */
    getBookstoreBySpecialty(specialty: Specialty | null): Signal<Bookstore | undefined> {
        return computed(() =>
            specialty
                ? this.#bookstoresSignal().find((bookstore) => bookstore.specialty === specialty)
                : undefined,
        );
    }

    #loadBookstores(): void {
        this.#loadingSignal.set(true);
        this.#bookstoresApi
            .getBookstores()
            .pipe(retry(2), takeUntilDestroyed())
            .subscribe({
                next: (bookstores) => {
                    this.#bookstoresSignal.set(bookstores);
                    this.#loadingSignal.set(false);
                },
                error: (err) => {
                    this.#errorSignal.set(err instanceof Error ? err.message : 'Failed to load bookstores');
                    this.#loadingSignal.set(false);
                },
            });
    }
}
