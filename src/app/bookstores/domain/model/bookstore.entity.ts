import { BaseEntity } from '../../../shared/domain/model/base-entity';
import { Specialty } from '../../../shared/domain/model/specialty';

/**
 * Bookstore specialized in one literary or academic specialty.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export class Bookstore implements BaseEntity {
    #id: number;
    #name: string;
    #specialty: Specialty;
    #minimumCopies: number;

    /**
     * Creates a bookstore.
     *
     * @param props - Initial values.
     * @throws Error when the name is empty or the minimum copies value is not valid.
     */
    constructor(props: { id: number; name: string; specialty: Specialty; minimumCopies: number }) {
        if (!props.name?.trim()) {
            throw new Error('Bookstore name must not be empty.');
        }
        if (!Number.isInteger(props.minimumCopies) || props.minimumCopies < 0) {
            throw new Error('Bookstore minimum copies must be a non-negative integer.');
        }
        this.#id = props.id;
        this.#name = props.name.trim();
        this.#specialty = props.specialty;
        this.#minimumCopies = props.minimumCopies;
    }

    /** Unique identifier. */
    get id(): number {
        return this.#id;
    }

    set id(value: number) {
        this.#id = value;
    }

    /** Bookstore name. */
    get name(): string {
        return this.#name;
    }

    /** Specialty of the bookstore. */
    get specialty(): Specialty {
        return this.#specialty;
    }

    /** Minimum copies that each book should have in stock. */
    get minimumCopies(): number {
        return this.#minimumCopies;
    }

    /** Maximum copies accepted in a single book receipt (twice the minimum copies). */
    get maximumCopiesPerReceipt(): number {
        return this.#minimumCopies * 2;
    }

    /**
     * Checks the receipt rule: copies must be an integer greater than zero and less than or
     * equal to twice the minimum copies.
     *
     * @param copies - Copies to receive.
     */
    canReceive(copies: number): boolean {
        return Number.isInteger(copies) && copies > 0 && copies <= this.maximumCopiesPerReceipt;
    }

    /**
     * Checks whether a book with the given total copies requires replenishment.
     *
     * @param totalCopies - Total copies of a book in this bookstore.
     */
    requiresReplenishment(totalCopies: number): boolean {
        return totalCopies < this.#minimumCopies;
    }
}
