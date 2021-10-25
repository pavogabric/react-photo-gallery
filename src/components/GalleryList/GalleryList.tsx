import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/arrow-left.png';
import arrowRight from '../../assets/arrow-right.png';
import { GalleryItem } from '../../models/gallery-item';
import { AuthContext } from '../../store/auth-context';
import Button from '../Button/Button';
import classes from './GalleryList.module.scss';

interface GalleryListProps {
  gallery: GalleryItem[];
  showGalleryList: boolean;
  isMobileViewport: boolean;
  onSetSelectedImage: (item: GalleryItem) => void;
  onHideGalleryList: () => void;
}

const GalleryList: React.FunctionComponent<GalleryListProps> = ({
  gallery,
  showGalleryList,
  isMobileViewport,
  onSetSelectedImage,
  onHideGalleryList,
}) => {
  const [filterInput, setFilterInput] = useState('');
  const authContext = useContext(AuthContext);

  const galleryItems = gallery
    .filter((item) =>
      item.name.toLowerCase().includes(filterInput.toLowerCase())
    )
    .map((item: GalleryItem) => {
      return (
        <div className={classes.galleryListItem} key={item.id}>
          <div className={classes.galleryListItemBox}>
            <div>
              <img src={item.imageUrl} alt="Art" />
            </div>
            <div>
              <p>{item.name}</p>
            </div>
          </div>
          <Link to="/imagePreview">
            <Button icon={arrowRight} onClick={() => viewImageHandler(item)}>
              Review
            </Button>
          </Link>
        </div>
      );
    });

  const viewImageHandler = (item: GalleryItem) => {
    onHideGalleryList();
    onSetSelectedImage(item);
  };

  const logoutHandler = () => {
    if (isMobileViewport) {
      onHideGalleryList();
      authContext.onLogout();
    }
    authContext.onLogout();
  };

  let sidebarClasses;

  if (!isMobileViewport) {
    sidebarClasses = `${classes.aside}`;
  } else {
    sidebarClasses = `${classes.aside} ${classes.mobile} ${
      showGalleryList ? classes.show : ''
    }`;
  }

  return (
    <aside className={sidebarClasses}>
      <header className={classes.heading}>
        <nav>
          <div>
            <Link to="/upload" onClick={onHideGalleryList}>
              Upload image
            </Link>
            <Link to="/" onClick={logoutHandler} className="logout">
              Sign out
            </Link>
          </div>
          {isMobileViewport && (
            <img
              src={arrowLeft}
              alt="Back button"
              onClick={onHideGalleryList}
            />
          )}
        </nav>
        <h1>Image Gallery</h1>
      </header>

      <div className={classes.search}>
        <input
          type="text"
          name="searchGallery"
          id="searchGallery"
          placeholder="Search showcase..."
          value={filterInput}
          onChange={(e) => setFilterInput(e.target.value)}
        />
      </div>

      <div className={classes.galleryList}>
        {gallery.length === 0 && <p>No images...</p>}
        {galleryItems}
      </div>
    </aside>
  );
};

export default GalleryList;
