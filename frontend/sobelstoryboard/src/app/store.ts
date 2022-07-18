import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import downloadStoryboardReducer from "../download/DownloadStoryboard.reducer";
import pushFountainReducer from "../process/ProcessStoryboard.reducer";

export const store = configureStore({
    reducer: {
        downloadStoryboard: downloadStoryboardReducer,
        pushFountain: pushFountainReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;