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


export const projectReducer = createReducer(
    initialPalladiumState,
    on(ProjectActions.getProjectsSuccess, (state, {data}) => ({
        ...state,
        projects: data.map(projectData => new Project(projectData))
    })),

    on(ProjectActions.newProjectSuccess, (state, projectData) => ({
        ...state,
        projects: [...state.projects, new Project(projectData)]
    }))
);
