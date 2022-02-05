import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { selectScrollPosition } from '../core/store/selectors';

const HORIZONTAL_POSITION = 0;

@Injectable({
  providedIn: 'root',
})
export class ScrollPositionService {

  constructor(private router: Router, private store: Store, private viewportScroller: ViewportScroller) {}

  public setScrollPosition(): void {
    this.store
      .select(selectScrollPosition)
      .pipe(take(1))
      .subscribe(position => this.viewportScroller.scrollToPosition([HORIZONTAL_POSITION, position]),
      );
  }

  public getVerticalScrollPosition(): number {
    return this.viewportScroller.getScrollPosition()[1];
  }
}
