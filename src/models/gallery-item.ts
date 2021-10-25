import { ImageComment } from './image-comment';

export interface GalleryItem {
  id: string;
  imageUrl: string;
  name: string;
  comments?: ImageComment[];
}
