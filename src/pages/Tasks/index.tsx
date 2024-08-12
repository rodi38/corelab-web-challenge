import { useEffect, useState } from 'react';
import { deleteTask, getTasks } from '../../lib/api';
import { Card, Header } from '../../components';
import styles from './Tasks.module.scss';
import Container from '../../components/Container';
import { ITask } from '../../types/Task';
import Register from '../../components/Register';
import { toast } from 'react-toastify';

const TasksPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleEdit = (updatedTask: ITask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
  };

  useEffect(() => {
    search ? fetchTasks({ title: search }) : fetchTasks();
  }, [search]);

  const handleFavoriteToggle = (id: string, newFavorite: boolean) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task._id === id ? { ...task, isFavorite: newFavorite } : task)));
  };

  const fetchTasks = async (filter?: { title: string }) => {
    try {
      const payload = await getTasks(filter);

      console.log(payload);

      setTasks(payload);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      toast.error('Error ao buscar as tarefas!');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const updatedTasks = tasks.filter((item) => item._id !== id);
      setTasks(updatedTasks);
      await deleteTask(id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.Tasks}>
      <Header fetchSearchedTasks={fetchTasks} value={search} onChange={handleSearch} />
      <main className={styles.main}>
        <Register fetchTasks={fetchTasks} />

        <Container title="Favoritas">
          {tasks
            ?.filter((item) => item.isFavorite)
            .map((item) => (
              <Card
                data={item}
                isFavorite={item.isFavorite}
                key={item._id}
                onFavoriteToggle={handleFavoriteToggle}
                onDelete={() => handleDelete(item._id)}
                onUpdate={handleEdit}
                setIsEditing={setIsEditing}
              >
                <p className={styles.text}>{item.taskContent}</p>
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
                onDelete={() => handleDelete(item._id)}
                onUpdate={handleEdit}
                setIsEditing={setIsEditing}
              >
                <p className={styles.text}>{item.taskContent}</p>
              </Card>
            ))}
        </Container>
      </main>
    </div>
  );
};

export default TasksPage;
