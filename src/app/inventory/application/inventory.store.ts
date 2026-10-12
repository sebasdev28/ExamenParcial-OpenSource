import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, Observable, retry, tap } from 'rxjs';
import { InventoryApi } from '../infrastructure/inventory-api';
import { BookStock } from '../domain/model/book-stock.entity';

/**
 * Signal-based store for the inventory bounded context.
 *
 * @remarks
 * Keeps the book stock records and registers new ones.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class InventoryStore {
    readonly #inventoryApi = inject(InventoryApi);
    readonly #bookStocksSignal = signal<BookStock[]>([]);
    readonly #loadingSignal = signal<boolean>(false);
    readonly #errorSignal = signal<string | null>(null);

    /** Book stock records. */
    readonly bookStocks = this.#bookStocksSignal.asReadonly();
    /** Number of book stock records. */
    readonly bookStockCount = computed(() => this.#bookStocksSignal().length);
    /** Whether a request is in progress. */
    readonly loading = this.#loadingSignal.asReadonly();
    /** Last error message, if any. */
    readonly error = this.#errorSignal.asReadonly();

    /** Loads the book stock records on creation. */
    constructor() {
        this.#loadBookStocks();
    }

    /**
     * Registers a book stock record.
     *
     * @remarks
     * The store state is updated when the backend confirms the creation. The returned observable
     * lets the caller wait for the registration to complete before navigating.
     *
     * @param bookStock - Book stock to register.
     * @returns An observable that emits the created book stock.
     */
    addBookStock(bookStock: BookStock): Observable<BookStock> {
        this.#loadingSignal.set(true);
        this.#errorSignal.set(null);
        return this.#inventoryApi.createBookStock(bookStock).pipe(
            tap({
                next: (created) => this.#bookStocksSignal.update((stocks) => [...stocks, created]),
                error: (err) =>
                    this.#errorSignal.set(this.#formatError(err, 'Failed to register book stock')),
            }),
            finalize(() => this.#loadingSignal.set(false)),
        );
    }

    #loadBookStocks(): void {
        this.#loadingSignal.set(true);
        this.#inventoryApi
            .getBookStocks()
            .pipe(retry(2), takeUntilDestroyed())
            .subscribe({
                next: (bookStocks) => {
                    this.#bookStocksSignal.set(bookStocks);
                    this.#loadingSignal.set(false);
                },
                error: (err) => {
                    this.#errorSignal.set(this.#formatError(err, 'Failed to load book stocks'));
                    this.#loadingSignal.set(false);
                },
            });
    }

    #formatError(error: unknown, fallback: string): string {
        return error instanceof Error ? error.message : fallback;
    }
}
