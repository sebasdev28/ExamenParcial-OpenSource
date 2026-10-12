/**
 * Response returned by the Open Library subjects endpoint (`/subjects/{specialty}.json`).
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface SubjectWorksResponse {
    /** Subject key, for example `/subjects/fantasy`. */
    key: string;
    /** Subject name. */
    name: string;
    /** Total works available for the subject. */
    work_count: number;
    /** Works (books) of the subject. */
    works: WorkResource[];
}

/**
 * Open Library work resource. Field names follow the provider's snake_case convention.
 *
 * @author Sebastian Uriel Becerra Durand
 */
export interface WorkResource {
    key: string;
    title: string;
    authors?: { name: string; key?: string }[];
    first_publish_year?: number;
    cover_id?: number;
}
