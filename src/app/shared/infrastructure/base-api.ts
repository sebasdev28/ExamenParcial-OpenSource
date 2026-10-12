import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';


/**
 * Base class for bounded-context API facades.
 *
 * @remarks
 * Provides the shared {@link HttpClient} instance used to build endpoint objects.
 *
 * @author Sebastian Uriel Becerra Durand
 */

export abstract class BaseApi {
    protected readonly http = inject(HttpClient);
}