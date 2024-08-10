import { useState } from "react";
import styles from "./Register.module.scss"
import { MdOutlineStar } from "react-icons/md";
import star from "../../assets/star.png"
import filledStar from "../../assets/FullFilledStar.png"



interface IRegister {
  isFavorite?: boolean;
}


const Register = (props: IRegister) => {
  const [content, setContent] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleChange = (e: any) => {
    setContent(e.target.value);
  };

  const star1 = props.isFavorite ? star : filledStar;

  const handleFavorite = async () => {
    
    props.isFavorite ? setFavorite(false) : setFavorite(true);
  }

  return (
    <div className={styles.registerCard}>
      <div className={styles.registerCardheader}>
        <span className={styles.registerCardTitle}>Título</span>
        <img
            src={star1}
            alt="Descrição da Imagem"
            style={{ width: '18px', height: '17px' }}
            onClick={handleFavorite}
          />
          

      </div>
      <div className={styles.separator} />
      <textarea
        className={styles.registerCardContent}
        value={content}
        onChange={handleChange}
        placeholder="Criar nota..."
      />
    </div>
  );
};

export default Register;
