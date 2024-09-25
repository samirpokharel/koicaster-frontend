export interface IFolder {
  id: string;
  name: string;
  items?: IBanner[];
}

export interface IBanner {
  id: string;
  content: string;
  scrollAcrossBottom?: boolean;
}
