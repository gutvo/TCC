import { put, takeLatest, all } from "redux-saga/effects";
import { actions } from "./slice";
import { /* getAnimalImage */ api } from "../../services/api";
import { Animal } from "./reducers";
import { toast } from "react-toastify";
import axios from "axios";
import { FetchAction, createAction, showAction } from "./actions";

interface fetchAnimalDTO {
  data: {
    data: Animal[];
    pagination: {
      offset: number;
      limit: number;
      count: number;
    };
  };
}
interface showAnimalDTO {
  data: Animal;
}

interface createAnimalDTO {
  data: {
    message: string;
  };
}

function* fetchAnimals({ payload }: FetchAction) {
  const { listAnimalFailure, listAnimalSuccess } = actions;
  const { limit, offset } = payload;
  try {
    const animals: fetchAnimalDTO = yield api.get("/animal", {
      params: {
        offset,
        limit,
      },
    });
    const result = animals.data;
    yield put(listAnimalSuccess(result.data, result.pagination));
  } catch (error) {
    yield put(listAnimalFailure());
  }
}

function* createAnimal({ payload }: createAction) {
  const { createAnimalSuccess, createtAnimalFailure } = actions;
  const { data } = payload;

  data.image = Boolean(data.image);

  try {
    const response: createAnimalDTO = yield api.post("/animal", {
      data,
    });

    /*    const response: createAnimalDTO = yield call(addAnimal, data) */
    yield put(createAnimalSuccess());
    toast.success(response.data.message);
  } catch (error) {
    yield put(createtAnimalFailure());
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message);
    }
  }
}

function* showAnimal({ payload }: showAction) {
  const { showAnimalSuccess, showAnimalFailure } = actions;
  try {
    const response: showAnimalDTO = yield api.get(`animal/${payload.id}`);
    yield put(showAnimalSuccess(response.data));
  } catch (error) {
    yield put(showAnimalFailure());
  }
}

export default all([
  takeLatest("animals/listAnimalRequest", fetchAnimals),
  takeLatest("animals/createAnimalRequest", createAnimal),
  takeLatest("animals/showAnimalRequest", showAnimal),
]);
