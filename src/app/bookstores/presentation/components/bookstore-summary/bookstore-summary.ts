import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
} from '@angular/material/card';
import { MatList, MatListItem, MatListItemLine, MatListItemTitle } from '@angular/material/list';
import { TranslatePipe } from '@ngx-translate/core';
import { BookstoreInventory } from '../../../domain/model/bookstore-inventory';
import { toSpecialtyKebabCase } from '../../../../shared/domain/model/specialty';

/**
 * Card that summarizes the book inventory of one bookstore.
 *
 * @remarks
 * Header: bookstore name. Content: each book title with its total copies, or "Empty". Footer:
 * the Available Titles and Replenishment Required indicators.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
    selector: 'app-bookstore-summary',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardSubtitle,
        MatCardContent,
        MatCardFooter,
        MatList,
        MatListItem,
        MatListItemTitle,
        MatListItemLine,
        TranslatePipe,
    ],
    templateUrl: './bookstore-summary.html',
    styleUrl: './bookstore-summary.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookstoreSummary {
    /** Bookstore inventory to display. */
    readonly bookstoreInventory = input.required<BookstoreInventory>();

    /** Converts a specialty into its kebab-case translation identifier. */
    protected readonly toSpecialtyKebabCase = toSpecialtyKebabCase;
}
