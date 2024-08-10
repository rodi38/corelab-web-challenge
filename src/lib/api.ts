import { IFilter } from "../types/IFilterTask";
import { ITask } from "../types/Task";

const API = "http://localhost:5000";

const endpoint = (path: string): string => API + path;

const get = async (path: string, payload?: IFilter): Promise<any> => {
  return fetch(endpoint(path), {method: "GET", body: JSON.stringify(payload)}).then((res) => res.json());
};
const post = async (path: string, payload: ITask): Promise<ITask> => {
  return fetch(endpoint(path), {method: "POST", body: JSON.stringify(payload)}).then((res) => res.json());
};

const put = async (path: string, payload: ITask): Promise<ITask> => {
  return fetch(endpoint(path), {method: "PUT", body: JSON.stringify(payload)}).then((res) => res.json());
};


export const getTasks = async (payload?: IFilter) => {
  return get("/tasks", payload);
};

export const postTask = async (payload: ITask) => {
  return post("/tasks", payload);
};
export const putTask = async (id: string, payload: ITask) => {
  return put(`/tasks/${id}`, payload);
};
