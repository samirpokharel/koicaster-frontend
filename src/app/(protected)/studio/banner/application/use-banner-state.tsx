import { create } from "zustand";
import type { IBanner, IFolder } from "../../(core)/domain/Banner";
import { bannerServices } from "../infrastructure/banner-service";

interface IStore {
  folders: IFolder[];
  currentFolder: IFolder | null;
  banners: IBanner[];
  setFolders: () => Promise<void>;
  addFolder: (folder: Omit<IFolder, "id">) => Promise<void>;
  updateFolder: (id: string, updates: Partial<IFolder>) => Promise<void>;
  deleteFolder: (id: string) => Promise<void>;
  setCurrentFolder: (folder: IFolder | null) => void;
  setBanners: (banners: IBanner[]) => void;
  addBanner: (folderId: string, bannerItem: Omit<IBanner, "id">) => void;
  updateBanner: (
    folderId: string,
    bannerId: string,
    bannerItem: Omit<IBanner, "id">
  ) => void;
  deleteBanner: (folderId: string, bannerId: string) => void;
}

export const useBannerState = create<IStore>((set) => ({
  folders: [],
  currentFolder: null,
  banners: [],

  setFolders: async () => {
    const folders = await bannerServices.getFolders();
    console.log(folders);
    if (folders) {
      set({ folders });
    }
  },

  addFolder: async (folder) => {
    const newFolder = await bannerServices.createFolder(folder);
    if (newFolder) {
      set((state) => ({ folders: [...state.folders, newFolder] }));
    }
  },

  updateFolder: async (id, updates) => {
    const updatedFolder = await bannerServices.renameFolder(
      id,
      updates.name || ""
    );
    if (updatedFolder) {
      set((state) => ({
        folders: state.folders.map((f) =>
          f.id === id ? { ...f, ...updates } : f
        ),
      }));
    }
  },

  deleteFolder: async (id) => {
    const deletedFolder = await bannerServices.deleteFolder(id);
    if (deletedFolder) {
      set((state) => ({
        folders: state.folders.filter((f) => f.id !== id),
      }));
    }
  },

  setCurrentFolder: (folder) => set({ currentFolder: folder }),

  setBanners: (banners) => set({ banners }),

  // Add a banner to the store
  // addBanner: (banner) =>
  //   set((state) => ({ banners: [...state.banners, banner] })),

  addBanner: async (folderId: string, bannerItem: Omit<IBanner, "id">) => {
    const banner = await bannerServices.createBanner(folderId, bannerItem);
    if (banner) {
      set((state) => ({ banners: [...state.banners, banner] }));
    }
  },

  updateBanner: async (
    folderId: string,
    bannerId: string,
    bannerItem: Omit<IBanner, "id">
  ) => {
    const banner = await bannerServices.updateBanner(
      folderId,
      bannerId,
      bannerItem
    );
    if (banner) {
      set((state) => ({
        banners: state.banners.map((b) =>
          b.id === bannerId ? { ...b, ...bannerItem } : b
        ),
      }));
    }
  },

  deleteBanner: async (folderId, bannerId) => {
    const banner = await bannerServices.deleteBanner(folderId, bannerId);
    if (banner) {
      set((state) => ({
        banners: state.banners.filter((b) => b.id !== bannerId),
      }));
    }
  },
}));
