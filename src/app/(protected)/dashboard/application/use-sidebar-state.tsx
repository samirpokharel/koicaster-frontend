import { create } from "zustand";

interface SidebarAction {
  toggleSidebar: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

interface SidebarState {
  isOpen: boolean;
}

export const useSidebarStore = create<SidebarState & SidebarAction>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),

  setIsOpen: (open: boolean) => {
    console.log(open);
    set({ isOpen: open });
  },
}));