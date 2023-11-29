import {Inject, Injectable} from '@angular/core';
import {Environment, ENVIRONMENT} from '@app/environment';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private readonly titleService: Title
  ) {
    this.setPageTitle();
  }

  setPageTitle(pageTitle?: string): void {
    const suffix = pageTitle ? ` - ${pageTitle}` : '';
    this.titleService.setTitle(`${this.environment.ui.title}${suffix}`);
  }

}
