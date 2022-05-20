import { Action, createAction, props } from "@ngrx/store";
import { NewProjectInterface, ProjectInterface } from "../models/project.model";
import { UserCredentials, UserLoginData } from "../models/user.model";

export namespace UserActions {
    export const login = createAction('LOGIN', props<UserLoginData>());
    export const loginSuccess = createAction('LOGIN_SUCCESS', props<UserCredentials>());
    export const loginError = createAction('LOGIN_ERROR');
    export const logout = createAction('LOGOUT');
    export const logoutStore = createAction('LOGOUT_STORE');
}

export namespace ProjectActions {
    export const newProject = createAction('NEW', props<NewProjectInterface>());
    export const newProjectSuccess = createAction('NEW_SUCCESS', props<ProjectInterface>());

    export const getProjects = createAction('GET_PROJECTS');
    export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS', props<{data: ProjectInterface[]}>());
}
