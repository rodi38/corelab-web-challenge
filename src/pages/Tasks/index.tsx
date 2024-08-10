import { useEffect, useState } from "react";
import { getTasks } from "../../lib/api";
import { Card, Header } from "../../components";
import styles from "./Tasks.module.scss";
import Container from "../../components/Container";
import { ITask } from "../../types/Task";
import Register from "../../components/Register";

const TasksPage = () => {
  const [Tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const payload = await getTasks();
      setTasks(payload);
    };

    fetchTasks();
  }, []);



  return (
    <div className={styles.Tasks}>
      <Header />
      <main className={styles.main}>
      <Register/>

        <Container title="Favoritas">
          {Tasks?.map((item) => {
              return (<Card data={item} isFavorite={item.isFavorite} key={item._id}>
                <p>{item.taskContent}</p>

              </Card>)
          })}

        </Container>

        <Container title="Outras">
         
        </Container>
      </main>
    </div>
  );
};

export default TasksPage;
