import classes from './ImagePreview.module.scss';
import commentsCloseIcon from '../../assets/chatbot_open.png';
import commentsOpenIcon from '../../assets/chatbot_close.png';
import { useState } from 'react';
import { GalleryItem } from '../../models/gallery-item';
import { Link } from 'react-router-dom';

interface ImagePreviewProps {
  galleryItem: GalleryItem;
}

const ImagePreview: React.FunctionComponent<ImagePreviewProps> = ({
  galleryItem,
}) => {
  const [showComments, setShowComments] = useState(false);

  let commentsIcon;
  if (showComments) {
    commentsIcon = commentsOpenIcon;
  } else {
    commentsIcon = commentsCloseIcon;
  }

  return (
    <section className={classes.imagePreview}>
      {!galleryItem && (
        <h1>
          No images in gallery, try to <Link to="/upload">upload</Link> one :)
        </h1>
      )}
      {galleryItem && (
        <>
          <div className={classes.imageHolder}>
            <img src={galleryItem.imageUrl} alt="Preview" />
          </div>
          <h1>{galleryItem.name}</h1>
          <div className={classes.imageComments}>
            <div
              className={`${classes.imageCommentsBox} ${
                showComments ? classes.imageCommentsBoxShow : ''
              }`}
            >
              <div className={classes.header}>
                <span>Nice view</span>
              </div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit,
                quo!
              </p>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Repellat aliquam quibusdam fugiat.
              </p>
              <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
            <img
              src={commentsIcon}
              onClick={() => setShowComments(!showComments)}
              alt="Close comments"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default ImagePreview;
