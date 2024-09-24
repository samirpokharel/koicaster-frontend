import React, { useState, useEffect } from "react";
import { create } from "zustand";
import {
  MoreVertical,
  Folder,
  ArrowLeft,
  Plus,
  FolderPlus,
  Edit2,
  Copy,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface IFolder {
  id: number;
  name: string;
  items: IBanner[];
  count: number;
}

interface IBanner {
  id: number;
  content: string;
  scrollAcrossBottom: boolean;
}

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

const useStore = create<IStore>((set) => ({
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

const api = {
  getFolders: (): Promise<IFolder[]> =>
    Promise.resolve([
      {
        id: 1,
        name: "Example banners",
        count: 2,
        items: [
          {
            id: 1,
            content:
              "This is an example of a banner. Click on a banner to show it on screen.",
            scrollAcrossBottom: false,
          },
          {
            id: 2,
            content:
              "Use banners to summarize your talking points and display calls to action",
            scrollAcrossBottom: true,
          },
        ],
      },
      { id: 2, name: "banners", count: 0, items: [] },
    ]),
};

const FolderList: React.FC = () => {
  const {
    folders,
    setFolders,
    addFolder,
    updateFolder,
    deleteFolder,
    setCurrentFolder,
  } = useStore();
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<IFolder | null>(null);

  useEffect(() => {
    api.getFolders().then(setFolders);
  }, []);

  const handleAddFolder = () => {
    if (newFolderName) {
      addFolder({ id: Date.now(), name: newFolderName, count: 0, items: [] });
      setNewFolderName("");
    }
  };

  const handleUpdateFolder = () => {
    if (editingFolder) {
      updateFolder(editingFolder.id, { name: editingFolder.name });
      setEditingFolder(null);
    }
  };

  const handleDuplicateFolder = (folder: IFolder) => {
    addFolder({ ...folder, id: Date.now(), name: `${folder.name} (Copy)` });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex px-3 justify-between">
        <h2 className="text-xl font-bold mb-4">Folders</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <FolderPlus />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="dark:bg-[#1f1f1f] dark:text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Create new Folder</AlertDialogTitle>
              <div className="my-4">
                <Label className="mb-2">Folder Name</Label>
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddFolder}>
                Create
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="border">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex items-center justify-between p-2 hover:bg-[#1f1f1f] border-b border-[#1f1f1f] cursor-pointer"
          >
            <div
              onClick={() => setCurrentFolder(folder)}
              className="flex items-center justify-center"
            >
              <Folder className="mr-2" size={20} />
              <div className="flex flex-col justify-start items-start">
                <span>{folder.name}</span>
                <span className="text-gray-500 text-sm">
                  {folder.count} banners
                </span>
              </div>
            </div>
            <Popover>
              <PopoverTrigger>
                <MoreVertical size={20} />
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  variant="ghost"
                  onClick={() => setEditingFolder(folder)}
                >
                  <Edit2 className="mr-2" />
                  Rename Folder
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleDuplicateFolder(folder)}
                >
                  <Copy className="mr-2" />
                  Duplicate Folder
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost">
                      <Trash className="mr-2" />
                      Delete Folder
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the folder and all its banners.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteFolder(folder.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
      {editingFolder && (
        <AlertDialog
          open={!!editingFolder}
          onOpenChange={() => setEditingFolder(null)}
        >
          <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Rename Folder</AlertDialogTitle>
              <Input
                value={editingFolder.name}
                onChange={(e) =>
                  setEditingFolder({ ...editingFolder, name: e.target.value })
                }
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateFolder}>
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

const BannerList: React.FC = () => {
  const {
    currentFolder,
    banners,
    setBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    setCurrentFolder,
  } = useStore();
  const [newBannerContent, setNewBannerContent] = useState("");
  const [newBannerScroll, setNewBannerScroll] = useState(false);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [isCreatingBanner, setIsCreatingBanner] = useState(false);

  useEffect(() => {
    if (currentFolder) {
      setBanners(currentFolder.items);
    }
  }, [currentFolder]);

  const handleAddBanner = () => {
    if (newBannerContent) {
      addBanner({
        id: Date.now(),
        content: newBannerContent,
        scrollAcrossBottom: newBannerScroll,
      });
      setNewBannerContent("");
      setNewBannerScroll(false);
      setIsCreatingBanner(false);
    }
  };

  const handleUpdateBanner = () => {
    if (editingBanner) {
      updateBanner(editingBanner.id, editingBanner);
      setEditingBanner(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex px-3 items-center mb-4">
        <button onClick={() => setCurrentFolder(null)} className="mr-2">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold">{currentFolder?.name}</h2>
      </div>
      <div className="space-y-4">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="p-4 bg-[#1f1f1f] rounded-md flex justify-between items-center"
          >
            <span>{banner.content}</span>
            <Popover>
              <PopoverTrigger>
                <MoreVertical size={20} />
              </PopoverTrigger>
              <PopoverContent>
                <Button
                  variant="ghost"
                  onClick={() => setEditingBanner(banner)}
                >
                  Edit Banner
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost">Delete Banner</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the banner.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteBanner(banner.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
          </div>
        ))}

        {!isCreatingBanner && (
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setIsCreatingBanner(true)}
          >
            <Plus className="mr-2" size={16} />
            Create a banner
          </Button>
        )}

        {isCreatingBanner && (
          <div className="space-y-4 p-4 border border-[#1f1f1f] rounded-lg">
            <div className="font-semibold text-lg mb-2">somebanner</div>
            <Input
              value={newBannerContent}
              onChange={(e) => setNewBannerContent(e.target.value)}
              placeholder="Enter a banner..."
              className="w-full"
            />
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="scroll"
                  checked={newBannerScroll}
                  onCheckedChange={(checked) =>
                    setNewBannerScroll(checked as boolean)
                  }
                />
                <Label htmlFor="scroll" className="text-sm">
                  Scroll across bottom (ticker)
                </Label>
              </div>
              <div className="text-sm text-gray-500">
                {newBannerContent.length}/200
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleAddBanner}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Add banner
              </Button>
              <Button
                onClick={() => setIsCreatingBanner(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      {editingBanner && (
        <AlertDialog
          open={!!editingBanner}
          onOpenChange={() => setEditingBanner(null)}
        >
          <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Banner</AlertDialogTitle>
              <Input
                value={editingBanner.content}
                onChange={(e) =>
                  setEditingBanner({
                    ...editingBanner,
                    content: e.target.value,
                  })
                }
              />
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editScroll"
                  checked={editingBanner.scrollAcrossBottom}
                  onCheckedChange={(checked) =>
                    setEditingBanner({
                      ...editingBanner,
                      scrollAcrossBottom: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="editScroll">
                  Scroll across bottom (ticker)
                </Label>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleUpdateBanner}>
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

const FolderAndBannerManagement: React.FC = () => {
  const { currentFolder } = useStore();

  return (
    <div className="">{currentFolder ? <BannerList /> : <FolderList />}</div>
  );
};

export default FolderAndBannerManagement;
