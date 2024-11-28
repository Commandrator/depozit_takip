import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import { AppBar, Toolbar } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/joy';
function DrawerScrollableSideBar() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
    <AppBar position="static" sx={{bgcolor:"transparent"}}>
        <Toolbar >
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <Menu/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ModalClose />
        <DialogTitle>İşlemler</DialogTitle>
        <DialogContent>
          <List>
            {[...new Array(100)].map((_, index) => (
              <ListItem key={index}>
                <ListItemButton onClick={() => setOpen(false)}>
                  Item {index}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            p: 1.5,
            pb: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Avatar size="lg" />
          <div>
            <Typography level="title-md">-</Typography>
            <Typography level="body-sm">-</Typography>
          </div>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}
export default DrawerScrollableSideBar;