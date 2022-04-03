import { createAction, props } from "@ngrx/store";
import { ProjectInterface } from "../models/project.model";

export namespace ProjectActions {
    export const getProjects = createAction('GET_PROJECTS');
    export const getProjectsSuccess = createAction('GET_PROJECTS_SUCCESS', props<{data: ProjectInterface[]}>());
}
