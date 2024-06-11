import { FaClipboardList } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { PenLine, Trash2 } from "lucide-react"
import axios from "axios";
import BASE_URL from "../../config";
import ButtonJoy from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useState } from "react";
import React from "react";


interface CardSurvey {
    title: string;
    id : any;
}

const CardSurvey = ({
    title,
    id,
}: CardSurvey) => {

    const [open, setOpen] = useState<boolean>(false);

    

    const handleDelete = (id : number) => {
        const token = localStorage.getItem('token');

        axios.delete(`${BASE_URL}/api/survey/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((response) => {
            console.log(id);
            console.log(response);
            console.log('Berhasil menghapus data', id);
            setOpen(false);
            window.location.reload();
        } ).catch((error) => {
            console.log('Gagal menghapus data', error);
        })
    };

    return (
        <div className="bg-[#0B62A0] w-full py-6 px-8 rounded-lg flex flex-row justify-between items-center ">
            <div>
                <p className="text-white font-semibold text-xl">{title}</p>
            </div>
            <div className="flex flex-col gap-2  ">
                <Button variant="secondary" size="sm" className="bg-yellow-400">
                    <PenLine className="mr-2 h-4 w-4"/>
                    Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
                    <Trash2 className="mr-2 h-4 w-4"/>
                    Delete
                </Button>
                <React.Fragment >
                    <Modal open={open} onClose={() => setOpen(false)} sx={{zIndex: 99999}}>
                        <ModalDialog variant="outlined" role="alertdialog">
                        <DialogTitle>
                            <WarningRoundedIcon />
                            Confirmation
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                            Apakah anda yakin ingin menghapus {title}?
                        </DialogContent>
                        <DialogActions>
                            <Button variant="destructive" color="danger" onClick={() => handleDelete(id)}>
                                <Trash2 className="mr-2 h-4 w-4"/>
                                Delete
                            </Button>
                            <Button variant="default"  onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </DialogActions>
                        </ModalDialog>
                    </Modal>
                </React.Fragment>
            </div>       
        </div>
    );
}

export default CardSurvey;