import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HeaderButtonConfig } from '@gus/ui';
import { TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';
import { STATS_AREA_PATH, USER_AREA_PATH } from './router/app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public title = 'HEADER.APP_TITLE';
  public headerButtonConfigs: HeaderButtonConfig[] = [
    {
      text: 'HEADER.BUTTON.USER',
      eventType: 'UserButtonClick',
    },
    {
      text: 'HEADER.BUTTON.STATS',
      eventType: 'StatsButtonClick',
    },
  ];

  public constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    this.addTranslations();
    this.setupDefaultLanguage();
    this.listenToNavigationEndEvents();
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

  private listenToNavigationEndEvents() {
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }

  public reduce(event) {
    this[`reduce${event.type}`]
      ? this[`reduce${event.type}`]()
      : console.warn('Event not handled!', event);
  }

  private reduceStatsButtonClick() {
    this.router.navigate([STATS_AREA_PATH], {
      relativeTo: this.route.parent,
    });
  }

  private reduceUserButtonClick() {
    this.router.navigate([USER_AREA_PATH], {
      relativeTo: this.route.parent,
    });
  }

  public ngOnDestroy() {}
}
