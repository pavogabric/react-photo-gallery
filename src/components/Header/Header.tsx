import classes from './Header.module.scss';
import logo from '../../assets/logo.png';
import smallLogo from '../../assets/small-logo.png';
import menuBtn from '../../assets/menu-btn.png';
import profile from '../../assets/profile.png';
import arrowDown from '../../assets/arrow-down.png';

interface HeaderProps {
  isAuthenticated: boolean;
  isMobileViewport: boolean;
  onShowGalleryList: () => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  isAuthenticated,
  isMobileViewport,
  onShowGalleryList,
}) => {
  return (
    <header className={classes.header}>
      {!isAuthenticated && <img src={logo} alt="Agilno" />}
      {isAuthenticated && (
        <div className={classes.headerWithMenu}>
          {isMobileViewport && (
            <button onClick={onShowGalleryList}>
              <img src={menuBtn} alt="Menu" />
            </button>
          )}
          <img src={smallLogo} alt="Agilno" />
          {!isMobileViewport && (
            <div className={classes.headerProfile}>
              <img src={profile} alt="Profile" />
              <p>NAME</p>
              <img src={arrowDown} alt="Open profile menu" />
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
