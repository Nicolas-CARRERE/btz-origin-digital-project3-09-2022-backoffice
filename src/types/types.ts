export type TNewUser = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  imageUrl?: string | null;
  role: string;
  password: string;
};

export type TUser = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  imageUrl: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TNewVideo = {
  title: string;
  description: string;
  display: boolean;
  thumbnailUrl: string;
  videoUrl: string;
  teaserUrl: string;
  isPublic: boolean;
  duration: number;
  categoryId: string;
};

export type TVideo = {
  id: string;
  title: string;
  description: string;
  display: boolean;
  thumbnailUrl: string;
  videoUrl: string;
  teaserUrl: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  nbViews: number;
  duration: number;
  categoryId: string;
};

export type TVideoIds = {
  id: string;
  status: boolean;
};

export type TSection = {
  id: string;
  title: string;
  description: string;
  section?: string;
  isGrid?: boolean;
  isHero?: boolean;
  max?: number;
  imageUrl?: string;
  linkTo?: string;
  createdAt?: Date;
  updatedAt?: Date;
  videoIds?: TVideoIds[];
};

export type TAdvertsing = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkTo: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TSectionDynamic = {
  id: string;
  title: string;
  description: string;
  max: number;
  isGrid: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
};

export type TSectionStatic = {
  id: string;
  title: string;
  description: string;
  max: number;
  isHero: boolean;
  createdAt: Date;
  updatedAt: Date;
  video?: { id: string; status: boolean }[];
};

export type TSectionSelector = {
  id: number;
  name: string;
  section: string;
  url: string;
  isGrid?: boolean;
  isHero?: boolean;
};

export type TCategory = {
  id: string;
  name: string;
};

export type TPage = {
  id: string;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  pagesSectionsStatic?: { id: string; status: boolean }[];
  pagesSectionsDynamic?: { id: string; status: boolean }[];
  pagesAdvertisings?: { id: string; status: boolean }[];
};
