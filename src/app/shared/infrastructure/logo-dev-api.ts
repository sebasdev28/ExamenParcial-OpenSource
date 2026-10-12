import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Api object for the Logo.dev Logo API.
 *
 * @remarks
 * Builds logo image URLs from a website URL using the configured publishable key.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Injectable({ providedIn: 'root' })
export class LogoDevApi {
    readonly #baseUrl = environment.logoProviderApiBaseUrl;
    readonly #apiKey = environment.logoProviderPublishableKey;

    /**
     * Builds the logo URL for a website.
     *
     * @param url - Website URL, for example `https://www.barnesandnoble.com`.
     * @returns The Logo.dev image URL for the website domain.
     */
    getUrlToLogo(url: string): string {
        const hostname = new URL(url).hostname.replace(/^www\./, '');
        return `${this.#baseUrl}${hostname}?token=${this.#apiKey}`;
    }
}
