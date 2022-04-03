import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./palladium.reducer";

export const GET_PROJECTS = "[PROJECT] GET";
export const ADD_PROJECT = "[PROJECT] Add";
export const REMOVE_PROJECT = "[PROJECT] Remove";

export namespace ProjectSelectors {
    export const state = createFeatureSelector<State>('palladium')

    export const get_projects = createSelector(state, (state) => state.projects)
}
