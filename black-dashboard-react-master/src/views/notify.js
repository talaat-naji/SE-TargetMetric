import React from "react";
import NotificationAlert from "react-notification-alert";
export default class Notify extends React.Component {

    constructor(props) {
        super(props);
    }
    notify = place => {
   
        // var color = Math.floor(Math.random() * 5 + 1);
        var type = "success";
   
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                       You have new orders to deliver see your order list for more details
          </div>
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };
    componentDidMount() {
        this.notify("br");
}
    render() {
        return (
          <>
          
              <div className="react-notification-alert-container">
                <NotificationAlert ref="notificationAlert" />
                    </div>
                    </>
                )}
}