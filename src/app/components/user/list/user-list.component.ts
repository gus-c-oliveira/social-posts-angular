import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AppState, LoadUsers, SimpleUser, userQuery } from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

export const userListSelector = 'app-user-list';

@Component({
  selector: userListSelector,
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnDestroy {
  public userList$: Observable<SimpleUser[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;

  public constructor(private store: Store<AppState>) {
    this.loadUserList();
    this.listenUserStoreData();
  }

  private loadUserList() {
    this.store.dispatch(new LoadUsers());
  }

  private listenUserStoreData() {
    this.loading$ = this.store.pipe(
      select(userQuery.getLoading),
      untilDestroyed(this)
    );
    this.error$ = this.store.pipe(
      select(userQuery.getError),
      untilDestroyed(this)
    );
    this.userList$ = this.store.pipe(
      select(userQuery.getSimpleUsers),
      untilDestroyed(this)
    );
  }

  public ngOnDestroy() {}
}
