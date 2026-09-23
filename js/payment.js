const payButton = document.getElementById("pay-button");
const message = document.getElementById("payment-message");

const params = new URLSearchParams(window.location.search);

const movie = params.get("movie");
const time = params.get("time");
const hall = params.get("hall");
const date = params.get("date");
const seats = params.get("seats");

let movieName = "Фільм";

if (movie === "dune") {
    movieName = "Дюна: Частина друга";
}

if (movie === "avatar") {
    movieName = "Аватар: Шлях води";
}

if (movie === "oppenheimer") {
    movieName = "Оппенгеймер";
}

if (movie === "interstellar") {
    movieName = "Інтерстеллар";
}

if (movie === "topgun") {
    movieName = "Топ Ґан: Меверік";
}

if (movie === "spiderman") {
    movieName = "Людина-павук: Додому шляху нема";
}

let seatArray = [];

if (seats) {
    seatArray = seats.split(",");
}

const price = seatArray.length * 150;


payButton.onclick = function () {

    const cardNumber =
        document.getElementById("card-number").value;

    const cardDate =
        document.getElementById("card-date").value;

    const cardCvv =
        document.getElementById("card-cvv").value;

    const cardName =
        document.getElementById("card-name").value;


    if (
        cardNumber === "" ||
        cardDate === "" ||
        cardCvv === "" ||
        cardName === ""
    ) {
        message.textContent = "❗ Заповніть усі поля";
        return;
    }


let poster = "images/dune2.jpg";

const addedMovies =
    JSON.parse(localStorage.getItem("cinewaveMovies")) || [];

addedMovies.forEach(function(movieItem) {

    if (movieItem.title === movie) {

        poster = movieItem.poster;
        movieName = movieItem.title;

    }

});

if (movie === "avatar") {
    poster = "images/avatar.jpeg";
}

if (movie === "oppenheimer") {
    poster = "images/oppenheimer.jpg";
}

if (movie === "interstellar") {
    poster = "images/interstellar.jpg";
}

if (movie === "topgun") {
    poster = "images/topgun.jpg";
}

if (movie === "spiderman") {
    poster = "images/spiderman.jpg";
}

const ticketNumber =
    "CW-" + Math.floor(100000 + Math.random() * 900000);

const ticket = {
    number: ticketNumber,
    movie: movieName,
    date: date,
    time: time,
    hall: hall,
    seats: seatArray,
    price: price,
    poster: poster

};

const userData =
    localStorage.getItem("cinewaveUser");

if (!userData) {
    message.textContent =
        "❗ Спочатку увійдіть або зареєструйтесь";
    return;
}

const user =
    JSON.parse(userData);

const ticketKey =
    "cinewaveTickets-" + user.email;

let userTickets =
    JSON.parse(
        localStorage.getItem(ticketKey)
    ) || [];

userTickets.push(ticket);

localStorage.setItem(
    ticketKey,
    JSON.stringify(userTickets)
);


    message.textContent =
        "✅ Оплата успішна!";


    setTimeout(function () {

        window.location.href =
            "tickets.html";

    }, 1000);
};