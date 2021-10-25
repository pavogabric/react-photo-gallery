import { collection, onSnapshot, query } from '@firebase/firestore';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { GalleryItem } from '../models/gallery-item';

const useFirestore = (collectionName: string) => {
  const [gallery, setGallery] = useState<GalleryItem[] | []>([]);

  useEffect(() => {
    const q = query(collection(db, collectionName));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const gallery: GalleryItem[] = [];
      querySnapshot.forEach((item) => {
        gallery.push({
          id: item.id,
          imageUrl: item.data().imageUrl,
          name: item.data().name,
        });
      });
      setGallery(gallery);
    });
    return () => unsub();
  }, [collectionName]);

  return gallery;
};

export default useFirestore;
