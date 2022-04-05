import { ThemePalette } from "@angular/material/core";
import { ProgressBarMode } from "@angular/material/progress-bar";
import { createReducer, on } from "@ngrx/store";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";
import { CommonActions, ProjectActions } from "./palladium.actions";

export interface State {
    mainProgressBar: MainProgressBarStateInterface
    projects: Project[],
    user?: User
}

const initialPalladiumState: State = {
    mainProgressBar: {
        visible: false,
        color: 'accent',
        mode: 'query',
        value: 0,
        bufferValue: 0
    },
    projects: [],
}


export const projectReducer = createReducer(
    initialPalladiumState,
    on(ProjectActions.getProjectsSuccess, (state, {data}) => ({
        ...state,
        projects: data.map(projectData => new Project(projectData))
    })),

    on(CommonActions.mainProgressBarInvisible, (state) => ({
        ...state,
        mainProgressBar: {...state.mainProgressBar, visible: false}
    })),

    on(CommonActions.mainProgressBarVisible, (state) => ({
        ...state,
        mainProgressBar: {...state.mainProgressBar, visible: true}
    })),

    on(ProjectActions.newProjectSuccess, (state, projectData) => ({
        ...state,
        projects: [...state.projects, new Project(projectData)],
        newProjectLoading: false
    }))
);
export interface MainProgressBarStateInterface {
    visible: boolean;
    color: ThemePalette;
    mode: ProgressBarMode;
    value: number;
    bufferValue: number;
  }
  