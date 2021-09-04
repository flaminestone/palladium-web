import { Injectable } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressMainService {
  private _defaultHiddenStatus: boolean = false;
  private _defaultColor: ThemePalette = "accent";
  private _defaultProgressBarMode: ProgressBarMode = "query";

  public state: ProgressStateInterface = {
    visible$: new BehaviorSubject(this._defaultHiddenStatus),
    color$: new BehaviorSubject(this._defaultColor),
    mode$: new BehaviorSubject(this._defaultProgressBarMode),
    value$: new BehaviorSubject(0),
    bufferValue$: new BehaviorSubject(0)
  };
  constructor() { }
}

export interface ProgressStateInterface {
  visible$: BehaviorSubject<boolean>;
  color$: BehaviorSubject<ThemePalette>;
  mode$: BehaviorSubject<ProgressBarMode>;
  value$: BehaviorSubject<number>;
  bufferValue$: BehaviorSubject<number>;
}
