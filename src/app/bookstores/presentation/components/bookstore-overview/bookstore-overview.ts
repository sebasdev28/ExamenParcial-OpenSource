import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { TranslatePipe } from '@ngx-translate/core';
import { BookstoresStore } from '../../../application/bookstores.store';
import { BookstoreSummary } from '../../components/bookstore-summary/bookstore-summary';

/**
 * Bookstore Overview view with the "Store Inventory" section.
 *
 * @remarks
 * Shows a grid list with two Bookstore Summary cards per row on wide screens and one per row
 * on handsets.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
    selector: 'app-bookstore-overview',
    imports: [MatGridList, MatGridTile, MatProgressSpinner, MatError, TranslatePipe, BookstoreSummary],
    templateUrl: './bookstore-overview.html',
    styleUrl: './bookstore-overview.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookstoreOverview {
    readonly #breakpointObserver = inject(BreakpointObserver);

    /** Bookstores store that provides the bookstore inventories. */
    protected readonly bookstoresStore = inject(BookstoresStore);

    /** Number of grid columns, based on the current screen size. */
    protected readonly columns = toSignal(
        this.#breakpointObserver
            .observe([Breakpoints.XSmall, Breakpoints.Small])
            .pipe(map((state) => (state.matches ? 1 : 2))),
        { initialValue: 2 },
    );
}
