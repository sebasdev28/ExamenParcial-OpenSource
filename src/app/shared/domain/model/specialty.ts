/**
 * Literary and academic specialties handled by the platform.
 *
 * @remarks
 * Shared kernel value used by the bookstores, inventory and catalog bounded contexts. The
 * values match the subjects used by the Open Library API.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export enum Specialty {
    Fantasy = 'fantasy',
    ScienceFiction = 'science_fiction',
    History = 'history',
    Mystery = 'mystery',
    Romance = 'romance',
    Science = 'science',
}

/**
 * All supported specialties, in display order.
 */
export const SPECIALTIES: readonly Specialty[] = Object.values(Specialty);

/**
 * Converts a raw value received from an API provider into a {@link Specialty}.
 *
 * @param value - Raw specialty value.
 * @returns The matching specialty.
 * @throws Error when the value is not a supported specialty.
 */
export function toSpecialty(value: string): Specialty {
    const normalized = (value ?? '').trim().toLowerCase();
    const specialty = SPECIALTIES.find((item) => item === normalized);
    if (!specialty) {
        throw new Error(`Unsupported specialty: ${value}`);
    }
    return specialty;
}

/**
 * Gets the kebab-case identifier of a specialty (for example `science-fiction`).
 *
 * @param specialty - Specialty.
 * @returns The kebab-case identifier.
 */
export function toSpecialtyKebabCase(specialty: Specialty): string {
    return specialty.replace(/_/g, '-');
}
