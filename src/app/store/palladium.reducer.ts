import { createReducer, on } from "@ngrx/store";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { ProjectActions, UserActions } from "./palladium.actions";

export interface State {
    projects: Project[],
    user?: User
}

const initialPalladiumState: State = {
    projects: []
}


export const palladiumReducer = createReducer(
    initialPalladiumState,
    on(UserActions.loginSuccess, (state, loginData) => {
        return {...state,
                 user: new User({email: loginData.email, token: loginData.token})}
    }),
    on(UserActions.logoutStore, (state) => {
        return {...state, user: undefined}
    }),
    on(ProjectActions.getProjectsSuccess, (state, {data}) => ({
        ...state,
        projects: data.map(projectData => new Project(projectData))
    })),

    on(ProjectActions.newProjectSuccess, (state, projectData) => ({
        ...state,
        projects: [...state.projects, new Project(projectData)],
    }))
);
  