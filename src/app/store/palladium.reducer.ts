import { Action, createReducer, on } from "@ngrx/store";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { ProjectActions } from "./palladium.actions";

export interface State {
    projects: Project[],
    user?: User
}

const initialPalladiumState: State = {
    projects: [],
}


export const projectReduser = createReducer(
    initialPalladiumState,
    on(ProjectActions.getProjectsSuccess, (state, {data}) => ({
        ...state,
        projects: data.map(projectData => new Project(projectData))

    }))
);

export function reducer(state: State | undefined, action: Action) {
    return projectReduser(state, action)
}