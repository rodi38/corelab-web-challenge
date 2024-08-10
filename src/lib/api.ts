import { IFilter } from "../types/IFilterTask";
import { ITaskRequest } from "../types/ITaskRequest";
import { ITask } from "../types/Task";

const API = "http://localhost:5000";

const endpoint = (path: string): string => API + path;

const get = async (path: string, payload?: IFilter): Promise<any> => {
  return fetch(endpoint(path), {method: "get", body: JSON.stringify(payload)}).then((res) => res.json());
};
const post = async (path: string, payload: ITaskRequest): Promise<ITask> => {
  return fetch(endpoint(path), {method: "post", body: JSON.stringify(payload)}).then((res) => res.json());
};

const put = async (path: string, payload: ITaskRequest): Promise<ITaskRequest> => {
  return fetch(endpoint(path), {method: "put", body: JSON.stringify(payload)}).then((res) => res.json());
};


export const getTasks = async (payload?: IFilter) => {
  return get("/tasks", payload);
};

export const postTask = async (payload: ITaskRequest) => {
  return post("/tasks", payload);
};
export const putTask = async (id: string, payload: ITaskRequest) => {
  return put(`/tasks/${id}`, payload);
};
