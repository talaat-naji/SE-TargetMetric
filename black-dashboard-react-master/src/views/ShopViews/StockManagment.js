/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import { Button} from "reactstrap";
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import ShopStock from "./ShopStock";


function Stock() {
    const [open, setOpen] = React.useState(false);

   
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };

    return (
        <>
        

            <Button color="info" onClick={handleClickOpen} style={{  height: '175px', width: "95%", fontWeight:"bolder",fontSize:"22px" }}>Stock</Button>

            <Dialog open={open} fullScreen={true} onClose={handleClose} aria-labelledby="form-dialog-title" >

                <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#1e1e2e" }}>

                    <h4 style={{ color: "#c2d0d4", fontWeight: "bolder" }}>

                       

                            <i onClick={handleClose} className="tim-icons icon-minimal-left" />
                        Stock
                    </h4>
                </DialogTitle>
                

                <DialogContent style={{ backgroundColor: "#252537" }}>
               
                    <ShopStock />

                </DialogContent>
             
            </Dialog>

        </>
    );

}

export default Stock;
