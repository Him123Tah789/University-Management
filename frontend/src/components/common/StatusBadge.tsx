import { Badge } from "@/components/ui/badge";

type StatusType = "FULL" | "OPEN" | "WAITLISTED" | "ELIGIBLE" | "NOT_ELIGIBLE" | "PENDING" | "COMPLETED";

interface StatusBadgeProps {
    status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
    const norm = status.toUpperCase().replace(" ", "_") as StatusType;

    switch (norm) {
        case "OPEN":
        case "COMPLETED":
        case "ELIGIBLE":
            return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>;
        case "FULL":
        case "NOT_ELIGIBLE":
            return <Badge variant="destructive">{status}</Badge>;
        case "WAITLISTED":
        case "PENDING":
            return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
}
