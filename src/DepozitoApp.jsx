import { Delete, Edit, Search, Check } from '@mui/icons-material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { Box, Button, Grid, IconButton, Input } from "@mui/joy";
import { Table, TableBody, TableHead, TableRow, TableCell, TableFooter, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useCallback, useEffect, useState } from 'react';
import useDate from './hooks/useDate.tsx';
import useApp from './hooks/useApp.tsx';

const DepozitoApp = () => {
    const [filterIsActive] = useState(false);
    const { setList } = useApp();    
    const getListMemoized = useCallback(setList, [setList]);
    useEffect(() => {
        const load = async () => await getListMemoized();
        load();
    }, [getListMemoized]);
    return (
        <Grid
            contianer
            direction="row">
            <Grid>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", m: 2 }}>
                    <Input
                        fullWidth
                        placeholder="Ad-soyad, telelfon, kimlik numarası ya da vergi numarası ile arayın..." />
                    <IconButton sx={{
                        ml: -5,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        '&:active': {
                            backgroundColor: 'transparent',
                        },
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    }}>
                        <Search />
                    </IconButton>
                    <IconButton sx={{
                        ml: 1,
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                        '&:active': {
                            backgroundColor: 'transparent',
                        },
                        '&:focus': {
                            backgroundColor: 'transparent',
                        },
                    }}>
                        {filterIsActive ? <FilterAltOffIcon /> : <FilterAltIcon />}
                    </IconButton>
                </Box>
            </Grid>
            <Grid>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Tarih
                            </TableCell>
                            <TableCell>
                                Müşteri
                            </TableCell>
                            <TableCell>
                                Depozito
                            </TableCell>
                            <TableCell>
                                Adet
                            </TableCell>
                            <TableCell>
                                İşlemler
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <Load />
                    </TableBody>
                    <TableFooter>

                    </TableFooter>
                </Table>
            </Grid>
        </Grid>
    )
}
const Load = () => {
    const { getList } = useApp();
    const [rowData, setRowData] = useState([]);
    const getListMemoized = useCallback(getList, [getList]);
    useEffect(() => {
        const load = async () => {
            const data = await getListMemoized();
            if (data) setRowData(data);
        };
        load();
    }, [getListMemoized]);
    if (rowData.length > 0)
        return rowData.map((udt, i) => <UserDataRow udt={udt} key={i} />);
}
const UserDataRow = ({ udt }) => {
    const [status, setStatus] = useState(0);
    const { comparisonOfTheDay, addDaysToDate } = useDate();
    //new Date(yıl,ay,gün,saat,dakika,saniye).toLocaleString()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        const today = new Date();
        if (udt.complated) setStatus(1)
        else if (comparisonOfTheDay(addDaysToDate(new Date(), -30), new Date(udt.date))) setStatus(3)
        else if (comparisonOfTheDay(today, new Date(udt.date))) setStatus(2)
        else setStatus(0)
    }, [udt, addDaysToDate, comparisonOfTheDay])
    return (
        <TableRow sx={{
            bgcolor: status === 1 ? "grey" :
                status === 2 ? "yellow" :
                    status === 3 ? "red" : "transparent"
        }}>
            <TableCell>
                {udt.date.toLocaleString()}
            </TableCell>
            <TableCell>
                Müşteri
            </TableCell>
            <TableCell>
                Depozito
            </TableCell>
            <TableCell>
                Adet
            </TableCell>
            <TableCell>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}>
                    <MenuItem>
                        <ListItemIcon>
                            <Check />
                        </ListItemIcon>
                        <ListItemText>Teslim Alındı</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Edit />
                        </ListItemIcon>
                        <ListItemText>Düzenle</ListItemText>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Delete />
                        </ListItemIcon>
                        <ListItemText>Sil</ListItemText>
                    </MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    )
}
export default DepozitoApp;