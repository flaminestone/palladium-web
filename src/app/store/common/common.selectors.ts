import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommonState } from "./common.reducer";

export const GET_PROJECTS = "[PROJECT] GET";
export const ADD_PROJECT = "[PROJECT] Add";
export const REMOVE_PROJECT = "[PROJECT] Remove";


export namespace CommonSelectors {
    export const state = createFeatureSelector<CommonState>('common')
    export const getMainProgressBar = createSelector(state, (state) => state.mainProgressBar)
}
