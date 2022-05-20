import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./palladium.reducer";

export const GET_PROJECTS = "[PROJECT] GET";
export const ADD_PROJECT = "[PROJECT] Add";
export const REMOVE_PROJECT = "[PROJECT] Remove";

export const state = createFeatureSelector<State>('palladium')

export namespace ProjectSelectors {

    export const getProjects = createSelector(state, (state) => state.projects)
    export const getNames = createSelector(state, (state) => state.projects.map(project => project.name))
}

export namespace UserSelectors {
    export const state = createFeatureSelector<State>('palladium')
    export const currentUser = createSelector(state, (state) => state.user)
    export const token = createSelector(state, (state) => state.user?.token)
}
