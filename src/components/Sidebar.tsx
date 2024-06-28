"use client";
import React, { useEffect, useState} from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Button } from "@/components/ui/button"
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

import { closeSidebar } from '@/components/utils';
import { list } from 'postcss';

function Toggler({
    defaultExpanded = false,
    renderToggle,
    children,
}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
}) {
const [open, setOpen] = React.useState(defaultExpanded);
return (
    <React.Fragment>
    {renderToggle({ open, setOpen })}
    <Box
        sx={{
        display: 'grid',
        gridTemplateRows: open ? '1fr' : '0fr',
        transition: '0.2s ease',
        '& > *': {
            overflow: 'hidden',
        },
        }}
    >
        {children}
    </Box>
    </React.Fragment>
);
}

export default function Sidebar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const role = localStorage.getItem('user');
            if (role === 'ADMIN') {
                setIsAdmin(true);
            }

            const storedName = localStorage.getItem('name');
            const storedEmail = localStorage.getItem('email');

            if (storedName) setName(storedName);
            if (storedEmail) setEmail(storedEmail);
        }
    }, []);




    const handleLogout = () => {
        try {
            localStorage.clear();
            window.location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }


return (
    <Sheet
    className="Sidebar"
    sx={{
        position: {
        xs: 'fixed',
        md: 'sticky',
        },
        transform: {
        xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
        md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
    }}
    >
    <GlobalStyles
        styles={(theme) => ({
        ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
            '--Sidebar-width': '240px',
            },
        },
        })}
    />
    <Box
        className="Sidebar-overlay"
        sx={{
        position: 'fixed',
        zIndex: 9998,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        opacity: 'var(--SideNavigation-slideIn)',
        backgroundColor: 'var(--joy-palette-background-backdrop)',
        transition: 'opacity 0.4s',
        transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
        },
        }}
        onClick={() => closeSidebar()}
    />
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', marginLeft: 3, marginTop: 2 }}>
        <Typography  sx={{fontSize:20, fontWeight: 900, color: '#3D9ADD' }}>Survei AMI dan Akreditasi</Typography>
    </Box>
    <Box
        sx={{
        minHeight: 0,
        overflow: 'hidden auto',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
        },
        }}
    >
        {isAdmin? (
            <List
            size="sm"
            sx={{
                
                gap: 0.3,
                '--List-nestedInsetStart': '30px',
                '--ListItem-radius': (theme) => theme.vars.radius.sm,
                marginTop: 3,
            }}
            >
                <ListItem >
                    <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/dashboard"
                    >
                    <IconButton size="md" >
                        <ListAltIcon/>
                    </IconButton>
                    <ListItemContent>
                        <Typography level="title-sm">Dashboard</Typography>
                    </ListItemContent>
                    </ListItemButton>
                </ListItem>
                

                <ListItem>
                    <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/hasil-responden"
                    >
                    <IconButton>
                        <AssignmentTurnedInIcon />
                    </IconButton>
                    <ListItemContent>
                        <Typography level="title-sm">Hasil Responden</Typography>
                    </ListItemContent>
                    </ListItemButton>
                </ListItem>
            </List>
        ) : (
            <List
            size="sm"
            sx={{
                
                gap: 0.3,
                '--List-nestedInsetStart': '30px',
                '--ListItem-radius': (theme) => theme.vars.radius.sm,
                marginTop: 3,
            }}
            >
                <ListItem >
                    <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/category-survey"
                    >
                    <IconButton size="md" >
                        <ListAltIcon/>
                    </IconButton>
                    <ListItemContent>
                        <Typography level="title-sm">Category Survey</Typography>
                    </ListItemContent>
                    </ListItemButton>
                </ListItem>
            </List>
        )}

        
    </Box>

    <Divider />
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        
        <Box sx={{ minWidth: 0, flex: 1 }}>
            {/* <Typography level="title-sm">{user.displayName}</Typography>
            <Typography level="title-sm">V</Typography> */}
            <div className='flex items-center'>
                <p className="text-base font-medium  text-gray-900 -mt-1">{name}</p>
            </div>
        <Typography level="body-xs">{email}</Typography>
        {/* <Typography level="body-xs">{isAdmin}</Typography> */}
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
        <LogoutRoundedIcon onClick={() => setOpen(true)} />
        </IconButton>
        <React.Fragment >
            <Modal open={open} onClose={() => setOpen(false)} sx={{zIndex: 99999}}>
                <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                    Apakah anda yakin ingin Keluar?
                </DialogContent>
                <DialogActions>
                    <Button variant="destructive" color="danger" onClick={handleLogout}>
                        Keluar
                    </Button>
                    <Button variant="default"  onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    </Box>

    </Sheet>
);
}