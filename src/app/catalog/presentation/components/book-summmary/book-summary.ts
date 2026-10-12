import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Book } from '../../../domain/model/book.entity';

/**
 * Summary of a catalog book: cover, title, author and first publish year.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
    selector: 'app-book-summary',
    imports: [TranslatePipe],
    templateUrl: './book-summary.html',
    styleUrl: './book-summary.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookSummary {
    /** Book to display. */
    readonly book = input.required<Book>();
}
