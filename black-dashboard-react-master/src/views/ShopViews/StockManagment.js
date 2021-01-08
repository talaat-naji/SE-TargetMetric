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
import Button2 from '@material-ui/core/Button';
import { Tooltip, Typography, withStyles } from "@material-ui/core";
import ShopStock from "./ShopStock";


function Stock() {
    const [open, setOpen] = React.useState(false);

   
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);

    };
    const HtmlTooltip = withStyles((theme) => ({
        tooltip: {
          backgroundColor: '#f5f5f9',
            color: 'rgba(0, 0, 0, 0.87)',
        
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: '1px solid #dadde9',
        },
      }))(Tooltip);
    return (
        <>
        
        <HtmlTooltip placement="bottom"
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">View products remaining in your stock </Typography>

                                </React.Fragment>
                            }>
            <Button color="info" onClick={handleClickOpen} style={{  height: '175px', width: "95%", fontWeight:"bolder",fontSize:"22px" }}><i className="tim-icons icon-app"/> Stock</Button>
            </HtmlTooltip>
            <Dialog open={open} fullScreen={true} onClose={handleClose} aria-labelledby="form-dialog-title" >

                <DialogTitle id="form-dialog-title" style={{ backgroundColor: "#c9d0b6" }}>

                    <h4 style={{ fontWeight: "bolder" }}>

                       
<Button2 onClick={handleClose} >
                            <i  className="tim-icons icon-minimal-left" />
                            </Button2>
                        Stock
                    </h4>
                </DialogTitle>
                

                <DialogContent style={{ backgroundColor: "#f5f6fa" }}>
               
                    <ShopStock />

                </DialogContent>
             
            </Dialog>

        </>
    );

}

export default Stock;
