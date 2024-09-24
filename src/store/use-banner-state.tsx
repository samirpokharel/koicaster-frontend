import type { IBanner, IFolder } from "@/interfaces/Banner";
import { create } from "zustand";

interface IStore {
  folders: IFolder[];
  currentFolder: IFolder | null;
  banners: IBanner[];
  setFolders: (folders: IFolder[]) => void;
  addFolder: (folder: IFolder) => void;
  updateFolder: (id: number, updates: Partial<IFolder>) => void;
  deleteFolder: (id: number) => void;
  setCurrentFolder: (folder: IFolder | null) => void;
  setBanners: (banners: IBanner[]) => void;
  addBanner: (banner: IBanner) => void;
  updateBanner: (id: number, updates: Partial<IBanner>) => void;
  deleteBanner: (id: number) => void;
}

export const useBannerState = create<IStore>((set) => ({
  folders: [],
  currentFolder: null,
  banners: [],
  setFolders: (folders) => set({ folders }),
  addFolder: (folder) =>
    set((state) => ({ folders: [...state.folders, folder] })),
  updateFolder: (id, updates) =>
    set((state) => ({
      folders: state.folders.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),
  deleteFolder: (id) =>
    set((state) => ({
      folders: state.folders.filter((f) => f.id !== id),
    })),
  setCurrentFolder: (folder) => set({ currentFolder: folder }),
  setBanners: (banners) => set({ banners }),
  addBanner: (banner) =>
    set((state) => ({ banners: [...state.banners, banner] })),
  updateBanner: (id, updates) =>
    set((state) => ({
      banners: state.banners.map((b) =>
        b.id === id ? { ...b, ...updates } : b
      ),
    })),
  deleteBanner: (id) =>
    set((state) => ({
      banners: state.banners.filter((b) => b.id !== id),
    })),
}));
