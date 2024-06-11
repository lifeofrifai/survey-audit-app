import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CirclePlus, Trash2 } from "lucide-react";

interface AddDelete {
    count: any;
    handleAdd: any;
    handleDelete: any;
}

const AddDelete = ({
    count,
    handleAdd,
    handleDelete

}: AddDelete) => {


return (
    <div className=" flex flex-row gap-2 pt-1">
        {count > 0 && (
            <Button className="rounded-full shadow-md" variant="destructive"  size="icon" onClick={handleDelete}>
                <Trash2 className=" h-4 w-4"/>
            </Button>
        )}
        <Button className="rounded-full bg-white hover:bg-gray-200 shadow-md" variant="default" size="icon" onClick={handleAdd}>
            <CirclePlus className="h-5 w-5 text-[#00B907]"/>
        </Button>
    </div>
    );
}

export default AddDelete;
