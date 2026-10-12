/**
 * Book offered by the external catalog (Open Library API).
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class Book {
    /** Author name used when a book does not include author information. */
    static readonly UNKNOWN_AUTHOR = 'Unknown Author';

    readonly #key: string;
    readonly #title: string;
    readonly #authorName: string;
    readonly #firstPublishYear: number | null;
    readonly #coverUrl: string;

    /**
     * Creates a book.
     *
     * @param props - Initial values. When `authorName` is empty, "Unknown Author" is used.
     * @throws Error when the key or title is empty.
     */
    constructor(props: {
        key: string;
        title: string;
        authorName?: string;
        firstPublishYear?: number | null;
        coverUrl?: string;
    }) {
        if (!props.key?.trim()) {
            throw new Error('Book key must not be empty.');
        }
        if (!props.title?.trim()) {
            throw new Error('Book title must not be empty.');
        }
        this.#key = props.key.trim();
        this.#title = props.title.trim();
        this.#authorName = props.authorName?.trim() || Book.UNKNOWN_AUTHOR;
        this.#firstPublishYear = props.firstPublishYear ?? null;
        this.#coverUrl = props.coverUrl ?? '';
    }

    /** Open Library key (for example `/works/OL27448W`). */
    get key(): string {
        return this.#key;
    }

    /** Book title. */
    get title(): string {
        return this.#title;
    }

    /** Name of the first author, or "Unknown Author". */
    get authorName(): string {
        return this.#authorName;
    }

    /** Year of first publication, if known. */
    get firstPublishYear(): number | null {
        return this.#firstPublishYear;
    }

    /** Cover image URL, or an empty string when there is no cover. */
    get coverUrl(): string {
        return this.#coverUrl;
    }
}
