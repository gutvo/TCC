import { put, takeLatest, all } from "redux-saga/effects";
import { actions } from "./slice";
import { UserData, loginProps } from "./reducers";
import axios from "axios";
import { toast } from "react-toastify";
import { api } from "../../services/api";

export interface loginDTO {
  data: {
    data: UserData;
    message: string;
    token: string;
  };
}

interface createUserDTO {
  data: {
    message: string;
  };
}

interface createAction {
  type: typeof actions.createUserRequest.type;
  payload: {
    data: UserData;
  };
}

interface loginAction {
  type: typeof actions.loginRequest.type;
  payload: {
    data: loginProps;
  };
}

function* create({ payload }: createAction) {
  const { createUserFailure, createUserSuccess } = actions;
  const { email, password, name } = payload.data;

  try {
    const user: createUserDTO = yield api.post("/user", {
      email,
      password,
      name,
    });

    yield put(createUserSuccess());

    toast.success(user.data.message);
  } catch (error) {
    yield put(createUserFailure());

    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    }
  }
}

function* login({ payload }: loginAction) {
  const { loginFailure, loginSuccess } = actions;
  const { email, password } = payload.data;
  try {
    const user: loginDTO = yield api.post("/user/login", {
      email,
      password,
    });

    yield localStorage.setItem("token", user.data.token);
    yield localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.data.data.email,
        password: user.data.data.password,
      })
    );
    yield put(loginSuccess(user.data));

    toast.success(user.data.message);
  } catch (error) {
    yield put(loginFailure());
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    }
  }
}
export default all([
  takeLatest("users/createUserRequest", create),
  takeLatest("users/loginRequest", login),
]);
