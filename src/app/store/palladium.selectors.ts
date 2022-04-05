import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./palladium.reducer";

export const GET_PROJECTS = "[PROJECT] GET";
export const ADD_PROJECT = "[PROJECT] Add";
export const REMOVE_PROJECT = "[PROJECT] Remove";


export namespace CommonSelectors {
    export const state = createFeatureSelector<State>('projects')
    export const getMainProgressBar = createSelector(state, (state) => state.mainProgressBar)
}
export namespace ProjectSelectors {
    export const state = createFeatureSelector<State>('projects')

    export const getProjects = createSelector(state, (state) => state.projects)
    export const getNames = createSelector(state, (state) => state.projects.map(project => project.name))
}
