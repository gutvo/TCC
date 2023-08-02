import { PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  id?: number;
  email: string;
  name: string;
  password: string;
}

export interface loginDTO {
  data: UserData;
  token: string;
}

export interface loginProps {
  email: string;
  password: string;
}

export interface InitialState {
  loading: boolean;
  data: UserData;
}

export const reducers = {
  createUserRequest: {
    reducer: (state: InitialState) => {
      state.loading = true;
    },
    prepare: (data: UserData) => {
      return { payload: { data } };
    },
  },
  createUserSuccess: (state: InitialState) => {
    state.loading = true;
  },
  createUserFailure: (state: InitialState) => {
    state.loading = false;
  },
  loginRequest: {
    reducer: (state: InitialState) => {
      state.loading = true;
    },
    prepare: (data: loginProps) => {
      return { payload: { data } };
    },
  },
  loginSuccess: {
    reducer: (
      state: InitialState,
      action: PayloadAction<{ response: loginDTO }>
    ) => {
      const { data } = action.payload.response;
      state.data = data;

      state.loading = false;
    },
    prepare: (response: loginDTO) => {
      return { payload: { response } };
    },
  },
  loginFailure: (state: InitialState) => {
    state.loading = false;
  },
};
