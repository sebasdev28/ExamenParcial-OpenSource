import { Bookstore } from './bookstore.entity';
import { BookStock } from '../../../inventory/domain/model/book-stock.entity';

/**
 * Inventory line of one book in a bookstore, adding up all of its book stock records.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookInventoryItem {
    readonly #bookKey: string;
    readonly #bookTitle: string;
    readonly #totalCopies: number;

    /**
     * Creates a book inventory item.
     * @param props - Book key, title and total copies.
     */
    constructor(props: { bookKey: string; bookTitle: string; totalCopies: number }) {
        this.#bookKey = props.bookKey;
        this.#bookTitle = props.bookTitle;
        this.#totalCopies = props.totalCopies;
    }

    /** Open Library key of the book. */
    get bookKey(): string {
        return this.#bookKey;
    }

    /** Book title. */
    get bookTitle(): string {
        return this.#bookTitle;
    }

    /** Total copies of the book in the bookstore. */
    get totalCopies(): number {
        return this.#totalCopies;
    }
}

/**
 * Book inventory of a bookstore, built from its book stock records.
 *
 * @remarks
 * Books are identified by `bookKey`: several book stock records of the same book count as a
 * single title, and their copies are added up.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookstoreInventory {
    readonly #bookstore: Bookstore;
    readonly #items: BookInventoryItem[];

    /**
     * Creates the inventory of a bookstore.
     *
     * @param bookstore - Bookstore.
     * @param bookStocks - Book stock records; only those of this bookstore are considered.
     */
    constructor(bookstore: Bookstore, bookStocks: BookStock[]) {
        this.#bookstore = bookstore;
        this.#items = BookstoreInventory.#groupByBook(
            bookStocks.filter((bookStock) => bookStock.bookstoreId === bookstore.id),
        );
    }

    /** Bookstore that owns the inventory. */
    get bookstore(): Bookstore {
        return this.#bookstore;
    }

    /** Inventory lines, one per distinct book. */
    get items(): BookInventoryItem[] {
        return this.#items;
    }

    /** Whether the bookstore has no book stock records. */
    get isEmpty(): boolean {
        return this.#items.length === 0;
    }

    /** Available Titles indicator: number of distinct books. */
    get availableTitles(): number {
        return this.#items.length;
    }

    /**
     * Replenishment Required indicator: number of distinct books whose total copies are below
     * the bookstore minimum copies.
     */
    get replenishmentRequired(): number {
        return this.#items.filter((item) => this.#bookstore.requiresReplenishment(item.totalCopies))
            .length;
    }

    static #groupByBook(bookStocks: BookStock[]): BookInventoryItem[] {
        const totals = new Map<string, { bookTitle: string; totalCopies: number }>();
        for (const bookStock of bookStocks) {
            const current = totals.get(bookStock.bookKey);
            totals.set(bookStock.bookKey, {
                bookTitle: current?.bookTitle ?? bookStock.bookTitle,
                totalCopies: (current?.totalCopies ?? 0) + bookStock.copies,
            });
        }
        return [...totals.entries()].map(
            ([bookKey, total]) =>
                new BookInventoryItem({ bookKey, bookTitle: total.bookTitle, totalCopies: total.totalCopies }),
        );
    }
}
