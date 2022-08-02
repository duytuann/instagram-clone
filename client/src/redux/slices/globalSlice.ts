import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReduxData, ReduxStateType } from '@/redux/types';

export interface globalState {
    showModalPostCreator: boolean;
}
const initialState: ReduxData<globalState> = {
    data: {
        showModalPostCreator: false,
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
    },
});

export const { setShowModalPostCreator } = globalSlice.actions;
export default globalSlice.reducer;
