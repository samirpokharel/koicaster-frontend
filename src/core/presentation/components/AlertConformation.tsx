import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

export default function AlertConformation({
  conformationQuestion = "Are you absolutely sure?",
  conformationMessage = "This action cannot be undone. This will permanently delete and remove your data from our servers.",
  isDelete = false,
  onContinue,
}: {
  conformationQuestion?: string;
  conformationMessage?: string;
  isDelete?: boolean;
  onContinue: () => void;
}) {
  return (
    <AlertDialogContent className="bg-white text-black dark:bg-black dark:text-white">
      <AlertDialogHeader>
        <AlertDialogTitle>{conformationQuestion}</AlertDialogTitle>
        <AlertDialogDescription>{conformationMessage}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>

        <AlertDialogAction onClick={onContinue}>
          <Button variant={isDelete ? "destructive" : "default"}>
            {isDelete ? "Delete" : "Continue"}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
