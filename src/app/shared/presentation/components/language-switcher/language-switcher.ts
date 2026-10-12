import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateService } from '@ngx-translate/core';

/**
 * Select buttons for switching the user interface language (EN / ES).
 *
 * @author Sebastian Uriel Becerra Durand
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleModule],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  /** Currently selected language. */
  protected currentLang = 'en';
  /** Available languages. */
  protected languages: string[];
  #translate: TranslateService;

  /** Reads the current and available languages from the translate service. */
  constructor() {
    this.#translate = inject(TranslateService);
    this.currentLang = this.#translate.getCurrentLang() ?? 'en';
    this.languages = [...this.#translate.getLangs()];
  }

  /**
   * Switches the user interface language.
   * @param language - Language code to use.
   */
  useLanguage(language: string) {
    this.#translate.use(language);
    this.currentLang = language;
  }
}
