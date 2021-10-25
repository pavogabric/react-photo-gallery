import { Switch, Route, Redirect } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import { useContext, useEffect, useState } from 'react';
import './App.scss';
import GalleryList from './components/GalleryList/GalleryList';
import Header from './components/Header/Header';
import { auth } from './firebase-config';
import useViewport from './hooks/use-viewport';
import ImagePreview from './pages/ImagePreview/ImagePreview';
import Login from './pages/Login/Login';
import Upload from './pages/Upload/Upload';
import { AuthContext } from './store/auth-context';
import useFirestore from './hooks/use-firestore';
import { GalleryItem } from './models/gallery-item';

function App() {
  const authContext = useContext(AuthContext);
  const [isMobileViewport, setIsMobileViewport] = useState(true);
  const [showGalleryList, setShowGalleryList] = useState(false);
  const [selectedImage, setSelectedImage] = useState({} as GalleryItem);

  const gallery = useFirestore('gallery');

  onAuthStateChanged(auth, (currentUser) => {
    if (!currentUser) return;
    authContext.setUser(currentUser);
  });

  const width = useViewport();
  const breakpoint = 1200;

  useEffect(() => {
    setSelectedImage(gallery[0]);
    if (width > breakpoint) {
      setIsMobileViewport(false);
    } else {
      setIsMobileViewport(true);
    }
  }, [width, breakpoint, gallery]);

  return (
    <div className="App">
      <Header
        isMobileViewport={isMobileViewport}
        isAuthenticated={authContext.isAuthenticated}
        onShowGalleryList={() => setShowGalleryList(true)}
      />
      <main>
        {authContext.isAuthenticated && (
          <GalleryList
            gallery={gallery}
            isMobileViewport={isMobileViewport}
            showGalleryList={showGalleryList}
            onSetSelectedImage={(item) => setSelectedImage(item)}
            onHideGalleryList={() => setShowGalleryList(false)}
          />
        )}
        <Switch>
          <Route exact path="/">
            {authContext.isAuthenticated ? (
              <ImagePreview galleryItem={selectedImage} />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/upload">
            {authContext.isAuthenticated && <Upload />}
          </Route>
          <Route path="/imagePreview">
            {authContext.isAuthenticated && (
              <ImagePreview galleryItem={selectedImage} />
            )}
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
