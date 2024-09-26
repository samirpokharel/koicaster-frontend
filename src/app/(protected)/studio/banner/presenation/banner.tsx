import React, { useState, useEffect, useCallback } from "react";
import { Folder, ArrowLeft, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import { Label } from "@/core/presentation/components/ui/label";
import { Input } from "@/core/presentation/components/ui/input";
import { useBannerState } from "../application/use-banner-state";
import type { IBanner, IFolder } from "../../(core)/domain/Banner";
import { CustomDialog } from "@/core/presentation/components/custom-dialog";
import { PopoverMenu } from "./components/power-menu";
import { EditDialog } from "./components/edit-dialog";

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

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        await setFolders();
      } catch (error) {
        console.error("Failed to fetch folders", error);
      }
    };
    fetchFolders();
  }, [setFolders]);

  const handleAddFolder = () => {
    if (newFolderName) {
      addFolder({ name: newFolderName });
      setNewFolderName("");
    }
  };

  const handleUpdateFolder = () => {
    if (editingFolder) {
      updateFolder(editingFolder.id, { name: editingFolder.name });
      setEditingFolder(null);
    }
  };

  const handleDuplicateFolder = useCallback(
    (folder: IFolder) =>
      addFolder({ items: folder.items, name: `${folder.name} (Copy)` }),
    [addFolder]
  );

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex px-3 justify-between">
        <h2 className="text-xl font-bold mb-4">Folders</h2>
        <CustomDialog
          confirmText="Create"
          title="Create new Folder"
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
            className="flex items-center justify-between p-3 hover:bg-[#1f1f1f] border-b border-[#1f1f1f] cursor-pointer"
          >
            <div
              onClick={() => setCurrentFolder(folder)}
              className="flex gap-3 items-center justify-center"
            >
              <Folder className="mr-2" size={25} />
              <div className="flex flex-col justify-start items-start">
                <span>{folder.name}</span>
                <span className="text-gray-500 text-sm">
                  {folder.items?.length} banners
                </span>
              </div>
            </div>
            <PopoverMenu
              onDelete={() => deleteFolder(folder.id)}
              onDuplicate={() => {
                handleDuplicateFolder(folder);
              }}
              onEdit={() => setEditingFolder(folder)}
            />
          </div>
        ))}
      </div>

      <EditDialog
        title="Rename Folder"
        value={editingFolder?.name || ""}
        onChange={(e) =>
          setEditingFolder({ ...editingFolder!, name: e.target.value })
        }
        onConfirm={handleUpdateFolder}
        onCancel={() => setEditingFolder(null)}
      />
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

  useEffect(() => {
    if (currentFolder) {
      setBanners(currentFolder.items ?? []);
    }
  }, [currentFolder, setBanners]);

  const handleAddBanner = () => {
    if (newBannerContent && currentFolder) {
      addBanner(currentFolder.id, { content: newBannerContent });
      setNewBannerContent("");
      setNewBannerScroll(false);
    }
  };

  const handleUpdateBanner = () => {
    if (editingBanner && currentFolder) {
      updateBanner(currentFolder.id, editingBanner.id, editingBanner);
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
            {currentFolder && (
              <PopoverMenu
                reNameTitle="Edit"
                onEdit={() => setEditingBanner(banner)}
                onDelete={() => deleteBanner(currentFolder.id, banner.id)}
              />
            )}
          </div>
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={() => setNewBannerContent("")}
        >
          <Plus className="mr-2" size={16} />
          Create a banner
        </Button>

        <EditDialog
          title="Edit Banner"
          value={editingBanner?.content || ""}
          onChange={(e) =>
            setEditingBanner({
              ...editingBanner!,
              content: e.target.value,
            })
          }
          onConfirm={handleUpdateBanner}
          onCancel={() => setEditingBanner(null)}
          scroll={editingBanner?.scrollAcrossBottom}
          setScroll={(checked) =>
            setEditingBanner({
              ...editingBanner!,
              scrollAcrossBottom: checked,
            })
          }
        />
      </div>
    </div>
  );
};

const FolderAndBannerManagement: React.FC = () => {
  const { currentFolder } = useBannerState();
  return <div>{currentFolder ? <BannerList /> : <FolderList />}</div>;
};

export default FolderAndBannerManagement;
