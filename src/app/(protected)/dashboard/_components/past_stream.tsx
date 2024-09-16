import { MoreVertical, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function PastStreamComponent() {
    const pastStreams = [
        { id: 1, title: "Stream 1", startedDate: "2024-09-01", duration: "1h 30m" },
        { id: 2, title: "Stream 2", startedDate: "2024-09-03", duration: "45m" },
        { id: 3, title: "Stream 3", startedDate: "2024-09-05", duration: "2h 15m" },
    ];
    return <Card>
        <CardHeader>
            <CardTitle>Past Streams</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Started Date</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pastStreams.map((stream) => (
                        <TableRow key={stream.id}>
                            <TableCell>{stream.title}</TableCell>
                            <TableCell>{stream.startedDate}</TableCell>
                            <TableCell>{stream.duration}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            <Trash className="mr-2 h-4 w-4" />
                                            <span>Delete</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
}