import { ThemePalette } from "@angular/material/core";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { createReducer, on } from "@ngrx/store";
import { CommonActions } from "./common.actions";

export interface CommonState {
    mainProgressBar: MainProgressBarStateInterface
}

const initialAppState: CommonState = {
    mainProgressBar: {
        visible: false,
        color: 'accent',
        mode: 'query',
        value: 0,
        bufferValue: 0
    }
}


export const commonReducer = createReducer(
    initialAppState,
    on(CommonActions.mainProgressBarInvisible, (state) => ({
        ...state,
        mainProgressBar: {...state.mainProgressBar, visible: false}
    })),

    on(CommonActions.mainProgressBarVisible, (state) => ({
        ...state,
        mainProgressBar: {...state.mainProgressBar, visible: true}
    }))
);
  
export interface MainProgressBarStateInterface {
    visible: boolean;
    color: ThemePalette;
    mode: ProgressBarMode;
    value: number;
    bufferValue: number;
}