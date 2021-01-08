import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import NotificationsNoneTwoToneIcon from '@material-ui/icons/NotificationsNoneTwoTone';
import apiClient from "../services/api";
import OrderDialog from "./OrderDialog"
import db from "../services/firebase";
import { Typography } from "@material-ui/core";
import NotificationAlert from "react-notification-alert";
import Notify from "./notify";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

export default function MenuListComposition() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [orders, setOrders] = React.useState([]);
    const anchorRef = React.useRef(null);
    const refs = React.useRef("notificationAlert");
    const inputEl = React.useRef("notificationAlert");
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

 
    const fetchOrders = () => {
        if (sessionStorage.getItem('loggedIn')) {
            apiClient.get('../api/getOrders')
                .then(response => {
                    setOrders(response.data)
                })
                .catch(error => console.error(error))
        }
    }
    const fireBase = () => {

        db.database().ref("Orders/" + sessionStorage.getItem("userId")).on("value", snapshot => {
            setOrders([]);
            fetchOrders();
            // if (orders.length > 0) {
                
             //   notify();
            // }
        });

    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        fireBase();
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
{/* <div className="react-notification-alert-container">
            <NotificationAlert ref={inputEl} />
          </div> */}
            {orders.length > 0 ? <Notify /> : <></>}
            <div>
                <Button
                    
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}>

                    <div className="">
                        {true ? <>
                            <Badge badgeContent={orders.length} color="secondary">
                                <NotificationsNoneTwoToneIcon style={{ color: "#2870f5" }} />
                            </Badge>  </> :
                            <NotificationsNoneTwoToneIcon style={{ color: "#2870f5" }} />}
                    </div>


                    <p className="d-lg-none">Notifications</p>
                </Button>

                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {orders.length===0? 
                            <MenuItem><Typography style={{ color: "#1e1e2e" }}>there are 0 undelivered orders</Typography></MenuItem>:

                            orders.map((order) => {

                        return (
<>
                            <OrderDialog key={order.id} order={order} onDeliver={() => { fetchOrders() }} />
                                <hr />
                                </>
                        )
                    })
                    }
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
