export interface IFolder {
  id: number;
  name: string;
  items: IBanner[];
  count: number;
}

export interface IBanner {
  id: number;
  content: string;
  scrollAcrossBottom: boolean;
}
