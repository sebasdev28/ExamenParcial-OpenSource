import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Book stock record: a number of copies of a book received by a bookstore.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class BookStock implements BaseEntity {
    #id: number;
    #bookstoreId: number;
    #bookKey: string;
    #bookTitle: string;
    #authorName: string;
    #copies: number;
    #receivedAt: Date;

    /**
     * Creates a book stock record.
     *
     * @param props - Initial values. When `receivedAt` is omitted, the current date and time is
     * used.
     * @throws Error when the book key or title is empty, or copies is not a non-negative integer.
     */
    constructor(props: {
        id: number;
        bookstoreId: number;
        bookKey: string;
        bookTitle: string;
        authorName: string;
        copies: number;
        receivedAt?: Date;
    }) {
        if (!props.bookKey?.trim() || !props.bookTitle?.trim()) {
            throw new Error('Book stock book key and title must not be empty.');
        }
        if (!Number.isInteger(props.copies) || props.copies < 0) {
            throw new Error('Book stock copies must be a non-negative integer.');
        }
        this.#id = props.id;
        this.#bookstoreId = props.bookstoreId;
        this.#bookKey = props.bookKey.trim();
        this.#bookTitle = props.bookTitle.trim();
        this.#authorName = props.authorName?.trim() ?? '';
        this.#copies = props.copies;
        this.#receivedAt = props.receivedAt ?? new Date();
    }

    /** Unique identifier. */
    get id(): number {
        return this.#id;
    }

    set id(value: number) {
        this.#id = value;
    }

    /** Identifier of the bookstore that received the copies. */
    get bookstoreId(): number {
        return this.#bookstoreId;
    }

    /** Open Library key of the book (for example `/works/OL27448W`). */
    get bookKey(): string {
        return this.#bookKey;
    }

    /** Book title. */
    get bookTitle(): string {
        return this.#bookTitle;
    }

    /** Author name. */
    get authorName(): string {
        return this.#authorName;
    }

    /** Received copies. */
    get copies(): number {
        return this.#copies;
    }

    /** Date and time when the copies were received. */
    get receivedAt(): Date {
        return this.#receivedAt;
    }
}
