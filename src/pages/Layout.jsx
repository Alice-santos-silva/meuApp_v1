import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import '../App.css';

export default function Layout() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="container-layout">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Brazil Sensations
                    </Typography>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose} component={Link} to="/">
                            Início
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/cotacao">
                            Cotação
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/kanban">
                            Acompanhamento de Orçamentos
                        </MenuItem>
                        <MenuItem onClick={handleClose} component={Link} to="/tarifario">
                            Painel Tarifário
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div>
                <Outlet />
            </div>
        </div>
    );
}
