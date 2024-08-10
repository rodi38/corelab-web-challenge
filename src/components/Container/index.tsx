import { ReactNode } from "react";
import styles from "./Container.module.scss"

interface IContainer {
  title: string;
  children: ReactNode;
}

const Container = (props: IContainer) => {

  
  return (
    <div className={styles.Container}>
      <h2>{props.title}</h2>
      <div className={styles.content}>{props.children}</div>

    </div>
  );
};

export default Container;
