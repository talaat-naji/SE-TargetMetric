import Pusher from "pusher-js";
import Echo from "laravel-echo";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const options = {
    broadcaster: "pusher",
    key: "c33af439d6721e7c10a7",
    cluster: "eu",
    forceTLS: true,
    encrypted: false,
    //authEndpoint is your apiUrl + /broadcasting/auth
    authEndpoint: "https://api.abc.com/broadcasting/auth",
    // As I'm using JWT tokens, I need to manually set up the headers.
    auth: {
        headers: {
            // "X-CSRF-TOKEN": csrf_token,
            // Authorization: "Bearer " + cookies.get("access_token"),
            Accept: "application/json"
        }
    }
};

const echo = new Echo(options);

echo.private("private-shopOrder").listen("App/Events/shopOrderedRetailer", data => {
    
    console.log(data);
});