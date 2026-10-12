import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatListItem, MatListItemIcon, MatNavList } from '@angular/material/list';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { FooterContent } from '../footer-content/footer-content';
import { LogoDevApi } from '../../../infrastructure/logo-dev-api';
import { environment } from '../../../../../environments/environment';

/**
 * Application shell with the toolbar, the sidenav with the navigation options, the routed
 * content and the footer.
 *
 * @remarks
 * The sidenav stays open beside the content on wide screens and opens over the content on
 * handsets.
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatIconButton,
    MatIcon,
    MatNavList,
    MatListItem,
    MatListItemIcon,
    TranslatePipe,
    LanguageSwitcher,
    FooterContent,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly #logoDevApi = inject(LogoDevApi);
  readonly #breakpointObserver = inject(BreakpointObserver);

  /** URL of the Barnes & Noble logo provided by Logo.dev. */
  protected readonly logoUrl = this.#logoDevApi.getUrlToLogo(environment.organizationWebsiteUrl);

  /** Whether the screen is a handset, used to switch the sidenav mode. */
  protected readonly isHandset = toSignal(
    this.#breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  /** Sidenav navigation options. */
  protected readonly options = signal([
    { link: '/bookstores/overview', label: 'option.bookstore-overview', icon: 'store' },
    { link: '/inventory/receipts/new', label: 'option.receive-books', icon: 'library_add' },
  ]);
}
