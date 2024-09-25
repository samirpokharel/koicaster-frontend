import React, { useState, useEffect } from "react";
import { Folder, ArrowLeft, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import { Label } from "@/core/presentation/components/ui/label";
import { Input } from "@/core/presentation/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/core/presentation/components/ui/alert-dialog";
import { Checkbox } from "@/core/presentation/components/ui/checkbox";
import { useBannerState } from "../application/use-banner-state";
import type { IBanner, IFolder } from "../../(core)/domain/Banner";
import { CustomDialog } from "@/core/presentation/components/custom-dialog";
import { PopoverMenu } from "./components/power-menu";

const FolderList: React.FC = () => {
  const {
    folders,
    setFolders,
    addFolder,
    updateFolder,
    deleteFolder,
    setCurrentFolder,
  } = useBannerState();
  const [newFolderName, setNewFolderName] = useState("");
  const [editingFolder, setEditingFolder] = useState<IFolder | null>(null);

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
        <CustomDialog
          confirmText="Create"
          title="Create new FOlder"
          onConfirm={handleAddFolder}
          trigger={
            <Button variant="ghost">
              <FolderPlus />
            </Button>
          }
        >
          <div className="my-4">
            <Label className="mb-2">Folder Name</Label>
            <Input
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
          </div>
        </CustomDialog>
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
            <PopoverMenu
              onDelete={() => deleteFolder(folder.id)}
              onDuplicate={() => handleDuplicateFolder(folder)}
              onEdit={() => setEditingFolder(folder)}
            />
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
  } = useBannerState();
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
            <PopoverMenu
              onEdit={() => setEditingBanner(banner)}
              onDelete={() => deleteBanner(banner.id)}
            />
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
  const { currentFolder } = useBannerState();
  return (
    <div className="">{currentFolder ? <BannerList /> : <FolderList />}</div>
  );
};

export default FolderAndBannerManagement;
