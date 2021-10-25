import { useState } from 'react';
import classes from './Upload.module.scss';
import upload from '../../assets/upload.png';
import check from '../../assets/green-check.png';
import Button from '../../components/Button/Button';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@firebase/storage';
import { addDoc, collection } from '@firebase/firestore';
import { db } from '../../firebase-config';
import { GalleryItem } from '../../models/gallery-item';

interface UploadProps {}

const Upload: React.FunctionComponent<UploadProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [titleInput, setTitleInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const addImageHandler = async () => {
    if (titleInput.length === 0) {
      alert('Please add title.');
      return;
    }

    setIsLoading(true);

    if (selectedFile && titleInput.length > 0) {
      const storage = getStorage();
      const uniqueID = `${
        selectedFile.name +
        Date.now().toString(36) +
        Math.random().toString(36).substr(2)
      }`;
      const storageRef = ref(storage, uniqueID);
      await uploadBytes(storageRef, selectedFile);

      const url = await getDownloadURL(storageRef);

      const galleryItem: GalleryItem = {
        id: '$',
        imageUrl: url,
        name: titleInput,
      };

      await addDoc(collection(db, 'gallery'), galleryItem);
      setIsLoading(false);
      setSelectedFile(undefined);
      setTitleInput('');
      alert('Uploaded succesfully!');
    }
  };

  const getFileName = (name: string) => {
    if (name.length < 7) {
      return `Selected file : ${name}`;
    }

    return `File is selected!`;
  };

  return (
    <section className={classes.upload}>
      <h1>Upload image</h1>
      <label>
        <div className={classes.uploadBox}>
          <img src={upload} alt="Upload" />
          <input
            type="file"
            accept="image/png, image/jpg, image/jpeg"
            multiple={false}
            name="uploadImage"
            id="uploadImage"
            onChange={changeHandler}
          />
          <p className={classes.supported}>Supported files: JPG, PNG</p>
          {selectedFile && (
            <p className={classes.selected}>
              {getFileName(selectedFile.name)}
              <img src={check} className={classes.check} alt="Checkmark" />
            </p>
          )}
        </div>
      </label>

      {selectedFile && (
        <>
          <div className={classes.titleInput}>
            <label htmlFor="imageTitle">Title</label>
            <input
              type="text"
              name="imageTitle"
              id="imageTitle"
              maxLength={25}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              required
            />
          </div>
          {!isLoading && (
            <Button onClick={addImageHandler}>Upload your image</Button>
          )}
          {isLoading && <p>Uploading image, please wait...</p>}
        </>
      )}
    </section>
  );
};

export default Upload;
