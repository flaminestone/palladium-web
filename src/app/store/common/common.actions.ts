import { Action, createAction, props } from "@ngrx/store";
import { UserCredentials } from "src/app/models/user.model";

export namespace CommonActions {
    export const mainProgressBarInvisible = createAction('MAIN_PROGRESS_BAR_INVISIBLE');
    export const mainProgressBarVisible = createAction('MAIN_PROGRESS_BAR_VISIBLE');
    export const localStoragePushAuthData = createAction('LOCKAL_STOGAGE_PUSH_AUTH_DATA', props<UserCredentials>());
    export const localStorageGetAuthData = createAction('LOCKAL_STOGAGE_GET_AUTH_DATA');
}
