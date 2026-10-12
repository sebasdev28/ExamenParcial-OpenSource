import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * View shown for unsupported navigation routes.
 *
 * @remarks
 * Displays the path that was not found and offers a button to return to Bookstore Overview.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
  selector: 'app-page-not-found',
  imports: [MatButton, TranslatePipe],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  /** Path that could not be resolved. */
  protected readonly invalidPath = this.#route.snapshot.url.map((segment) => segment.path).join('/');

  /** Navigates back to the Bookstore Overview view. */
  protected navigateToOverview(): void {
    this.#router.navigate(['/bookstores/overview']).then();
  }
}
