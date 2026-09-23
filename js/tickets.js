const ticketsContainer =
    document.getElementById("tickets-container");

const userData =
    localStorage.getItem("cinewaveUser");


if (!userData) {

    ticketsContainer.innerHTML = `
        <p>Увійдіть у свій акаунт, щоб переглянути квитки.</p>
    `;

} else {

    const user =
        JSON.parse(userData);

    const ticketKey =
        "cinewaveTickets-" + user.email;

    const ticketData =
        localStorage.getItem(ticketKey);

    if (!ticketData) {

        ticketsContainer.innerHTML = `
            <p>У вас поки немає придбаних квитків.</p>
        `;

    } else {

        const tickets =
            JSON.parse(ticketData);

        ticketsContainer.innerHTML = "";

        tickets.forEach(function(ticket) {

            const qrText =
                "CineWave | " +
                ticket.number + " | " +
                ticket.movie + " | Зала " +
                ticket.movie + " | Дата: " +
                ticket.date + " | Зала " +
                ticket.hall + " | Місця " +
                ticket.seats.join(", ");

            const qrCode =
                "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=" +
                encodeURIComponent(qrText);

            ticketsContainer.innerHTML += `
                <div class="movie-card">

                    <img 
                        src="${ticket.poster}" 
                        alt="${ticket.movie}"
                        style="width:220px; height:auto; border-radius:10px;"
                    >

                    <h3>🎟 Ваш квиток</h3>

                    <p>
                        Номер квитка: ${ticket.number}
                    </p>

                    <p>
                        🎬 Фільм: ${ticket.movie}
                    </p>
                    <p>
                    📅 Дата: ${ticket.date || "Дата не вказана"}
                    </p>

                    <p>
                        🕐 Сеанс: ${ticket.time}
                    </p>

                    <p>
                        🏛️ Зала: №${ticket.hall}
                    </p>

                    <p>
                        💺 Місця: ${ticket.seats.join(", ")}
                    </p>

                    <p>
                        💰 Сума: ${ticket.price} грн
                    </p>

                    <p>
                        ✅ Оплачено
                    </p>

                    <img 
                        src="${qrCode}" 
                        alt="QR-код квитка"
                        style="width:180px; height:180px;"
                    >

                </div>
            `;
        });
    }
}