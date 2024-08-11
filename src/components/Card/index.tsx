import { ReactNode, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import solidColor from "../../assets/colors.png";
import close from "../../assets/close.png";
import star from "../../assets/star.png"
import filledStar from "../../assets/FullFilledStar.png"
import { ITask } from "../../types/Task";
import { putTask } from "../../lib/api";

interface ICard {
  data: ITask;
  isFavorite?: boolean;
  children: ReactNode;
  onFavoriteToggle: (id: string, newFavorite: boolean) => void;
}

const Card = (props: ICard) => {
  const [favoriteState, setFavoriteState] = useState<boolean | undefined>(false);

  const actualStar = favoriteState ? filledStar : star;


  const handleFavorite = async () => {
    const newFavoriteState = !favoriteState;
    const { title, taskContent } = props.data;

    try {
      await putTask(props.data._id, { title, taskContent, isFavorite: newFavoriteState });
      setFavoriteState(newFavoriteState);
      props.onFavoriteToggle(props.data._id, newFavoriteState);
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

  useEffect(() => {

    setFavoriteState(props.isFavorite);
  }, [props.isFavorite]);


  return (
    <div className={styles.Card}>
      <header className={styles.cardHeader}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{props.data.title}</p>

          <img
            src={actualStar}
            alt="Descrição da Imagem"
            className={styles.star}
            onClick={handleFavorite}
          />
        </div>
        <div className={styles.separator} />
        <div className={styles.content}>{props.children}</div>

      </header>

      <footer className={styles.cardFooter}>
        <div className={styles.cardFooterMenu}>
          <div >
            <MdOutlineEdit className={styles.cardEdit} />
          </div>
          <div>
            <img
              src={solidColor}
              alt="Descrição da Imagem"
              className={styles.cardColorPicker}
            />

          </div>
        </div>


        <div className={styles.footerCloseMenu}>
          <img
            src={close}
            alt="Descrição da Imagem"
            className={styles.closeCard}
          />
        </div>

      </footer>

    </div>
  );
};

export default Card;
