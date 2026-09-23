document.addEventListener("DOMContentLoaded", function () {

    const button = document.createElement("a");

    button.href = "contact.html";
    button.textContent = "Зворотний зв’язок";
    button.className = "contact-floating-button";

    document.body.appendChild(button);

});