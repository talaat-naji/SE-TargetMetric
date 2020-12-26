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
                        Invoice was sent succesfully to the supplier
          </div>
                </div>
            ),
            type: type,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };
}