import { createAction } from "@ngrx/store";

export namespace CommonActions {
    export const mainProgressBarInvisible = createAction('MAIN_PROGRESS_BAR_INVISIBLE');
    export const mainProgressBarVisible = createAction('MAIN_PROGRESS_BAR_VISIBLE');
}
