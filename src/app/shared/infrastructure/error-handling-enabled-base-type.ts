import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/**
 * Base type that offers a reusable HTTP error handler.
 *
 * @author Sebastian Uriel Becerra Durand
 */

export abstract class ErrorHandlingEnabledBaseType {
    protected handleError(operation: string) {
        return (error: HttpErrorResponse): Observable<never> => {
            let errorMessage = operation;
            if (error.status === 404) {
                errorMessage = `${operation}: Resource not found`;
            } else if (error.error instanceof ErrorEvent) {
                errorMessage = `${operation}: ${error.error.message}`;
            } else {
                errorMessage = `${operation}: ${error.status || 'Unexpected error'}`;
            }
            return throwError(() => new Error(errorMessage));
        };
    }
}