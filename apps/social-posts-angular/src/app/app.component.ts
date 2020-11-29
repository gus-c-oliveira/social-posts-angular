import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    this.addTranslations();
    this.setupDefaultLanguage();
    this.setupScrollToTopOnNavigation();
  }

  private addTranslations() {
    this.translateService.addLangs(['en-US', 'pt-BR']);
  }

  private setupDefaultLanguage() {
    const browserLanguage = navigator.language;
    if (this.translateService.langs.indexOf(browserLanguage) !== -1) {
      this.translateService.setDefaultLang(browserLanguage);
    } else {
      this.translateService.setDefaultLang('en-US');
    }
  }

  private setupScrollToTopOnNavigation() {
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        window.scrollTo(0, 0);
      });
  }

  public ngOnDestroy() {}
}
