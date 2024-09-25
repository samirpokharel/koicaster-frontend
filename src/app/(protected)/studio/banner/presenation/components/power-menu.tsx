import { Copy, Edit2, MoreVertical, Trash } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/core/presentation/components/ui/popover";
import { Button } from "@/core/presentation/components/ui/button";
import { AlertDialogTrigger } from "@/core/presentation/components/ui/alert-dialog";
import AlertConformation from "@/core/presentation/components/AlertConformation";

export const PopoverMenu = ({
  onEdit,
  onDuplicate,
  onDelete,
  reNameTitle,
}: {
  onEdit: () => void;
  onDuplicate?: () => void | undefined;
  onDelete: () => void;
  reNameTitle?: string;
}) => (
  <Popover>
    <PopoverTrigger>
      <MoreVertical size={20} />
    </PopoverTrigger>
    <PopoverContent className="flex flex-col outline-none justify-start items-start w-40">
      <Button className="flex-1" variant="ghost" onClick={onEdit}>
        <Edit2 className="mr-2" />
        {reNameTitle ? reNameTitle : "Rename"}
      </Button>
      {onDuplicate && (
        <Button variant="ghost" onClick={onDuplicate}>
          <Copy className="mr-2" />
          Duplicate
        </Button>
      )}
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="ghost">
            <Trash className="mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertConformation isDelete={true} onContinue={onDelete} />
      </AlertDialog>
    </PopoverContent>
  </Popover>
);
