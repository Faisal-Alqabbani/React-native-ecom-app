// redux/features/toastSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type ToastStatus = 'success' | 'error' | 'warning';

interface ToastState {
  visible: boolean;
  message: string;
  status: ToastStatus | null;
}

const initialState: ToastState = {
  visible: false,
  message: '',
  status: null,
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{message: string; status: ToastStatus}>,
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    hideToast: state => {
      state.visible = false;
      state.message = '';
      state.status = null;
    },
  },
});

export const {showToast, hideToast} = toastSlice.actions;

export default toastSlice.reducer;
