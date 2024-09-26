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
import { Input } from "@/core/presentation/components/ui/input";
import { Label } from "@/core/presentation/components/ui/label";

export const EditDialog = ({
  title,
  value,
  onChange,
  onConfirm,
  onCancel,
  scroll,
  setScroll,
}: {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onCancel: () => void;
  scroll?: boolean;
  setScroll?: (value: boolean) => void;
}) => (
  <AlertDialog open={!!value} onOpenChange={onCancel}>
    <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <Input value={value} onChange={onChange} />
        {setScroll && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="scroll"
              checked={scroll}
              onCheckedChange={(checked) => setScroll(checked as boolean)}
            />
            <Label htmlFor="scroll">Scroll across bottom (ticker)</Label>
          </div>
        )}
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>Save</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
