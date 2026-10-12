import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Application footer.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
  selector: 'app-footer-content',
  imports: [TranslatePipe],
  templateUrl: './footer-content.html',
  styleUrl: './footer-content.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterContent {}
