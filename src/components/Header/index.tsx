import { useState } from "react";
import styles from "./Header.module.scss"
import Search from "../Search";
import logo from "../../assets/logo.png"

const Header = () => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  return (
    <header className={styles.HeaderPrincipal}>
      <div className={styles.Header}>
        
        <div className={styles.headerLogo}>
          <img
            src={logo}
            alt="Descrição da Imagem"
            style={{ width: '2.269rem', height: '2.269rem' }}
          />
        </div>
        <div className={styles.headerParagraph}>
          <p>CoreNotes</p>
        </div>
        <div className={styles.headerSearch}>
          <Search placeholder="Pesquisar notas" value={search} onChange={handleSearch} />
        </div>


      </div>
      <p className={styles.headerX}>X</p>

    </header>

  );
};

export default Header;
