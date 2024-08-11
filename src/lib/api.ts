import { IFilter } from "../types/IFilterTask";
import { ITaskRequest } from "../types/ITaskRequest";
import { ITask } from "../types/Task";

const API = "http://localhost:5000";

const endpoint = (path: string): string => API + path;

const get = async (path: string, payload?: IFilter): Promise<any> => {
  return await fetch(endpoint(path), { method: "get" }).then((res) => res.json());
};
const post = async (path: string, payload: ITaskRequest): Promise<ITask> => {
  return await fetch(endpoint(path), { method: "post", body: JSON.stringify(payload) }).then((res) => res.json());
};

const put = async (path: string, payload: ITaskRequest): Promise<ITaskRequest> => {
  return await fetch(endpoint(path), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    
    return res.json();
  });
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
