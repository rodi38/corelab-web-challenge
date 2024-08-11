import { ReactNode, useEffect, useState } from "react";
import styles from "./Card.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import solidColor from "../../assets/colors.png";
import close from "../../assets/close.png";
import star from "../../assets/star.png"
import filledStar from "../../assets/FullFilledStar.png"
import { ITask } from "../../types/Task";
import { putTask } from "../../lib/api";
import ColorModal from "./ColorModal";

interface ICard {
  data: ITask;
  isFavorite?: boolean;
  children: ReactNode;
  onFavoriteToggle: (id: string, newFavorite: boolean) => void;
  onDelete: (id: string) => void;
}

const Card = (props: ICard) => {
  const [favoriteState, setFavoriteState] = useState<boolean | undefined>(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("");
  const [borderColor, setBorderColor] = useState<string>()

  const handleDelete = () => {
    props.onDelete(props.data._id);
  }
  

  const isGrey = "#D9D9D9";
  const isWhite = "#FFFFFF";

  const toggleColorMenu = () => {
    setIsColorMenuOpen((prev) => !prev);
  };

  const handleColorCard = (color: string) => {
    setBackgroundColor(color);
    if(color !== isWhite) {
      setBorderColor(isWhite)
    } else {
      setBorderColor(isGrey)
    }
    localStorage.setItem(`card-color-${props.data._id}`, color);
  };

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
    const savedColor = localStorage.getItem(`card-color-${props.data._id}`);
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, [props.isFavorite, props.data._id]);


  return (
    <div className={styles.Card} style={{backgroundColor: backgroundColor }}>

      <header className={styles.cardHeader}>
      {isColorMenuOpen && <ColorModal cardColor={backgroundColor} onColorPick={handleColorCard} />}
        <div className={styles.titleContainer} style={{ borderBottom: "1px solid", borderColor: borderColor }}>
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
              onClick={toggleColorMenu}
            />
          </div>
        </div>


        <div className={styles.footerCloseMenu}>
          <img
            src={close}
            alt="Descrição da Imagem"
            className={styles.closeCard}
            onClick={handleDelete}
          />

          
        </div>
      </footer>

    </div>
  );
};

export default Card;
