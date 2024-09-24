import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Copy, Edit2, MoreVertical, Trash } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AlertConformation from "@/components/AlertConformation";

export const PopoverMenu = ({
  onEdit,
  onDuplicate,
  onDelete,
}: {
  onEdit: () => void;
  onDuplicate?: () => void | undefined;
  onDelete: () => void;
}) => (
  <Popover>
    <PopoverTrigger>
      <MoreVertical size={20} />
    </PopoverTrigger>
    <PopoverContent className="flex flex-col outline-none justify-start items-start w-40">
      <Button className="flex-1" variant="ghost" onClick={onEdit}>
        <Edit2 className="mr-2" />
        Rename
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
