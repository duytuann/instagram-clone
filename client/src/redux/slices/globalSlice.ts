import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface globalState {
    showModalPostCreator: boolean;
    showModalPostDetails: boolean;
}
const initialState: ReduxData<globalState> = {
    data: {
        showModalPostCreator: false,
        showModalPostDetails: false,
    },
    status: ReduxStateType.INIT,
};
const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        setShowModalPostCreator: (state, action: PayloadAction<boolean>) => {
            state.data.showModalPostCreator = action.payload;
        },
        setShowModalPostDetail: (state, action: PayloadAction<boolean>) => {
            state.data.showModalPostDetails = action.payload;
        },
    },
});

export const { setShowModalPostCreator, setShowModalPostDetail } = globalSlice.actions;
export default globalSlice.reducer;
