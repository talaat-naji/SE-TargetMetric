import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from 'components/Navbars/AdminNavbar';

const Verify = (props) => {
    // const [verified, setVerified] = React.useState(false);
    
    // if (toHome === true) {
    //     if (userType === "notVerified") {
    //         props.history.push('/verifyEmail');
    //      } else if (userType === "retailer") {
    //        props.history.push('/admin/dashboard');
    //     } else if (userType === "shop") {
    //         console.log("testshop");
    //         props.history.push('/shop/user-profile');
    //     }
    // }
    React.useEffect(() => {
        verify();
    },[])
   const verify=()=>{
       axios.get('/api/user', { withCredentials: true })
           .then(response => {
               sessionStorage.setItem("verified", response.data.email_verified_at !== null);
               if (response.data.email_verified_at !== null) {
                //    setVerified(true);
            props.history.push('/login');
        }})
   }
    return (<>
      <AdminNavbar {...props} logout={props.logout}/>
    <div className="container">

        <div className="row justify-content-center">

                <div style={{color:"#ffffff",marginTop:"200px"}}className="col-xl-10 col-lg-12 col-md-9">
           <h3> A verification link was sent to your email </h3> <br/>
           <h3> Please Verify your email to benifit from our services :)</h3>
                         
            </div>

        </div>
    </div>
       </>
    );
};

export default Verify;