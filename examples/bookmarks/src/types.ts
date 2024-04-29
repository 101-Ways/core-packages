import { type Registry as CoreRegistry } from '@101-ways/core-mongo-express';
import { BookmarkModel } from './modules/model';

export type Registry = CoreRegistry & {
  bookmarks: BookmarkModel;
};
