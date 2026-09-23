```javascript
const ticketData = localStorage.getItem("cinewaveTicket");

const ticketCount =
    document.getElementById("ticket-count");

const logoutButton =
    document.getElementById("logout-button");

const logoutMessage =
    document.getElementById("logout-message");


/* Перевіряємо, чи є придбаний квиток */

if (ticketData) {

    ticketCount.textContent = "1";

} else {

    ticketCount.textContent = "0";

}


/* Вихід з акаунта */

logoutButton.addEventListener("click", function() {

    logoutMessage.textContent =
        "Ви вийшли з акаунта.";

    logoutButton.disabled = true;

});
```
