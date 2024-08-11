import { useEffect, useState } from "react";
import { getTasks } from "../../lib/api";
import { Card, Header } from "../../components";
import styles from "./Tasks.module.scss";
import Container from "../../components/Container";
import { ITask } from "../../types/Task";
import Register from "../../components/Register";

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const payload = await getTasks();
      setTasks(payload);
    };

    fetchTasks();
  }, []);

  const handleFavoriteToggle = (id: string, newFavorite: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, isFavorite: newFavorite } : task
      )
    );
  };


  return (
    <div className={styles.Tasks}>
      <Header />
      <main className={styles.main}>
        <Register />

        <Container title="Favoritas">
          {tasks
            ?.filter((item) => item.isFavorite)
            .map((item) => (
              <Card
                data={item}
                isFavorite={item.isFavorite}
                key={item._id}
                onFavoriteToggle={handleFavoriteToggle}
              >
                <p>{item.taskContent}</p>
              </Card>
            ))}
        </Container>
        <Container title="Outras">
          {tasks
            ?.filter((item) => !item.isFavorite)
            .map((item) => (
              <Card
                data={item}
                isFavorite={item.isFavorite}
                key={item._id}
                onFavoriteToggle={handleFavoriteToggle}
              >
                <p>{item.taskContent}</p>
              </Card>
            ))}
        </Container>
      </main>
    </div>
  );
};

export default TasksPage;
