import { createAction, props } from "@ngrx/store";
import { NewProjectInterface, ProjectInterface } from "../models/project.model";

export namespace ProjectActions {
    export const newProject = createAction('NEW', props<NewProjectInterface>());
    export const newProjectSuccess = createAction('NEW_SUCCESS', props<ProjectInterface>());

    export const getProjects = createAction('GET_PROJECTS');
    export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS', props<{data: ProjectInterface[]}>());
}
