// import Pusher from "pusher-js";
// import Echo from "laravel-echo";
// //import Cookies from "universal-cookie";

// // const cookies = new Cookies();

// const options = {
//     broadcaster: "pusher",
//     key: "c33af439d6721e7c10a7",
//     cluster: "eu",
//     forceTLS: true,
//     encrypted: false,
//     //authEndpoint is your apiUrl + /broadcasting/auth
//     authEndpoint: "api/broadcasting/auth",
//     // As I'm using JWT tokens, I need to manually set up the headers.
//     auth: {
//         headers: {
//             // "X-CSRF-TOKEN": csrf_token,
//             // Authorization: "Bearer " + cookies.get("access_token"),
//             Accept: "application/json"
//         }
//     }
// };

// const echo = new Echo(options);

// echo.private("private-shopOrder").listen("App/Events/shopOrderedRetailer", data => {
    
//     console.log(data);
// });

  // Pusher = require("./Pusher.js");
        // window.Pusher = require("pusher-js");
        
        // window.Echo = new Echo({
        //     broadcaster: "pusher",
        //     cluster: "eu",
        //     encrypted: false,
        //     key: "c33af439d6721e7c10a7",
            
        //     authorizer: (channel, options) => {
        //         return {
        //             authorize: (socketId, callback) => {
        //                 console.log("jk", socketId);
        //                 apiClient.post('/api/broadcasting/auth', {
        //                     socket_id: socketId,
        //                     channel_name: channel.name
        //                 })
        //                     .then(response => {
        //                     console.log(response,"testtt")
        //                     callback(false, response.data);
        //                 })
        //                 .catch(error => {
        //                     callback(true, error);
        //                 });
        //             }
        //         };
        //     },
        // })
        // console.log("tytyt", window.Echo);
         // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;

    // var pusher = new Pusher('c33af439d6721e7c10a7', {
    //     cluster: 'eu',
    //     authEndpoint: "/api/broadcasting/auth",
    //     auth: {
    //         headers: {
    //              "X-CSRF-TOKEN": "eyJpdiI6IjlxalAxUmFVOHAzd2czeDBqNGJwalE9PSIsInZhbHVlIjoiU3Q5NEpQT3RJTzNBNG5TaVZjeHR3dFlsYktNRUxuTm83a2lRZzBkdGU0bmxCVEpOTG5UWkZ1MDdnNHIvcGFGV3luUXZ1Qy9Ra2lqVS9kT3FRYi92NUVvZHB4RFgxVXRVOWEwM2VSajhSYkVqQXZMOVJoMzMvVVZuUTlKVlduSUYiLCJtYWMiOiI2ZDYwMTYzZDFhNTc0YjdmNzViYTZkZGJhNWQ1YWY2NjEwZWRkODc0NjM2M2ZkMzEzNjU2YzhhOTRiMzExZjJiIn0%3D",
    //             // Authorization: "Bearer " + cookies.get("access_token"),
    //             Accept: "application/json"
    //         }
    //     }
    // });

    // var channel = pusher.subscribe('private-shopOrder');
    // channel.bind('App/Events/shopOrderedRetailer', function(data) {
    //   alert(JSON.stringify(data));
    // });