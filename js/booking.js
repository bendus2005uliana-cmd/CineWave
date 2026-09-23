const params = new URLSearchParams(window.location.search);

const movie = params.get("movie");
const time = params.get("time");
const hall = params.get("hall");
const date = params.get("date");


/* =========================
   НАЗВА ФІЛЬМУ
========================= */

let movieName = movie;

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


/* Якщо це фільм, доданий через адмінку */

if (movie) {

    document.getElementById("movie-name").textContent =
        movieName;

}


/* =========================
   ЧАС, ЗАЛА, ДАТА
========================= */

if (time) {

    document.getElementById("session-time").textContent =
        "Сеанс: " + time;

}

if (hall) {

    document.getElementById("hall-name").textContent =
        "Зала №" + hall;

}


/* Додаємо дату під інформацією про зал */

if (date) {

    const dateElement =
        document.createElement("p");

    dateElement.textContent =
        "Дата: " + date;

    document.getElementById("hall-name")
        .insertAdjacentElement(
            "afterend",
            dateElement
        );

}


/* =========================
   МІСЦЯ
========================= */

const seats =
    document.querySelectorAll(".row button");


/*
 * Ключ конкретного сеансу.
 *
 * Наприклад:
 * taken-dune-24.09.2026-14:20-1
 *
 * Завдяки даті одне й те саме
 * місце може бути вільним
 * в інший день.
 */

const bookingKey =
    "taken-" +
    movie +
    "-" +
    date +
    "-" +
    time +
    "-" +
    hall;


/* =========================
   ЗАВАНТАЖУЄМО ЗАЙНЯТІ МІСЦЯ
========================= */

let takenNumbers =
    JSON.parse(
        localStorage.getItem(bookingKey)
    );

if (!takenNumbers) {

    takenNumbers = [];

    const takenCount =
        Math.floor(Math.random() * 7) + 1;

    while (takenNumbers.length < takenCount) {

        const number =
            String(Math.floor(Math.random() * 18) + 1);

        if (!takenNumbers.includes(number)) {

            takenNumbers.push(number);

        }

    }

    localStorage.setItem(
        bookingKey,
        JSON.stringify(takenNumbers)
    );

}

/*
 * Додатково перевіряємо вже куплені квитки.
 * Це потрібно, щоб місця ставали сірими
 * після реальної оплати.
 */

const allUsersTickets = [];


for (let i = 0; i < localStorage.length; i++) {

    const key =
        localStorage.key(i);

    if (key && key.startsWith("cinewaveTickets-")) {

        const tickets =
            JSON.parse(
                localStorage.getItem(key)
            ) || [];

        tickets.forEach(function(ticket) {

            /*
             * Перевіряємо:
             * фільм
             * дату
             * час
             * залу
             */

            if (
                ticket.movie === movieName &&
                ticket.time === time &&
                String(ticket.hall) === String(hall) &&
                ticket.date === date
            ) {

                ticket.seats.forEach(function(seat) {

                    if (!takenNumbers.includes(seat)) {

                        takenNumbers.push(seat);

                    }

                });

            }

        });

    }

}


/* Зберігаємо зайняті місця */

localStorage.setItem(
    bookingKey,
    JSON.stringify(takenNumbers)
);


/* =========================
   РОБИМО ЗАЙНЯТІ МІСЦЯ СІРИМИ
========================= */

takenNumbers.forEach(function(number) {

    seats.forEach(function(seat) {

        if (
            seat.textContent.trim() ===
            String(number).trim()
        ) {

            seat.classList.add("taken");

            seat.disabled = true;

        }

    });

});


/* =========================
   ВИБІР МІСЦЬ
========================= */

const selectedSeats =
    document.getElementById("selected-seats");

const totalPrice =
    document.getElementById("total-price");

const ticketPrice = 150;


seats.forEach(function(seat) {

    seat.addEventListener(
        "click",
        function() {

            if (
                seat.classList.contains("taken")
            ) {

                return;

            }


            seat.classList.toggle("selected");

            updateInfo();

        }
    );

});


/* =========================
   ОНОВЛЕННЯ ІНФОРМАЦІЇ
========================= */

function updateInfo() {

    const selected =
        document.querySelectorAll(
            ".row button.selected"
        );


    if (selected.length === 0) {

        selectedSeats.textContent =
            "Обрані місця: немає";

        totalPrice.textContent =
            "Вартість: 0 грн";

        return;

    }


    let numbers = [];


    selected.forEach(function(seat) {

        numbers.push(
            seat.textContent.trim()
        );

    });


    selectedSeats.textContent =
        "Обрані місця: " +
        numbers.join(", ");


    totalPrice.textContent =
        "Вартість: " +
        selected.length * ticketPrice +
        " грн";

}


/* =========================
   ПІДТВЕРДЖЕННЯ БРОНЮВАННЯ
========================= */

const confirmButton =
    document.getElementById("confirm-booking");

const bookingMessage =
    document.getElementById("booking-message");


confirmButton.addEventListener(
    "click",
    function() {

        const selected =
            document.querySelectorAll(
                ".row button.selected"
            );


        if (selected.length === 0) {

            bookingMessage.textContent =
                "❗ Спочатку оберіть місце";

            return;

        }


        let numbers = [];


        selected.forEach(function(seat) {

            numbers.push(
                seat.textContent.trim()
            );

        });


        bookingMessage.textContent =
            "✅ Бронювання успішне! Ваші місця: " +
            numbers.join(", ");


        const paymentButton =
            document.getElementById(
                "payment-button"
            );


        paymentButton.style.display =
            "inline-block";


        paymentButton.href =
            "payment.html?movie=" +
            encodeURIComponent(movie) +
            "&time=" +
            encodeURIComponent(time) +
            "&hall=" +
            encodeURIComponent(hall) +
            "&date=" +
            encodeURIComponent(date) +
            "&seats=" +
            encodeURIComponent(
                numbers.join(",")
            );

    }
);