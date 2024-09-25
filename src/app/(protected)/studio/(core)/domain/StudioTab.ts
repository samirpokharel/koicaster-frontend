export interface Tab {
  key: string;
  label: string;
  icon: JSX.Element;
  component: JSX.Element;
}
export interface Tabs {
  comments: Tab;
  banner: Tab;
  privateChats: Tab;
  brand: Tab;
}
