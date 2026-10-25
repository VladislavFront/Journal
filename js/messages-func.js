document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("ticket-modal");
  const openModalBtn = document.getElementById("open-modal-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const ticketForm = document.getElementById("ticket-form");
  const ticketsContainer = document.getElementById("messages-container");

  const initialTickets = [
    {
      id: 1,
      recipient: "Орлова Т. С. (Классный рук.)",
      subject: "Сдача проектной папки по индивидуальному проекту",
      date: "Вчера, 16:45",
      status: "Рассмотрено",
      statusClass: "_excellent",
      text: "Здравствуйте. Я заканчиваю верстку интерфейса на чистом HTML/CSS/JS. Завтра принесу готовую работу на флешке.",
      answer: "Здравствуй, Анна. Отличные новости. Жду тебя на 4-й перемене в кабинете 305 для проверки материалов."
    }
  ];

  let tickets = JSON.parse(localStorage.getItem("school_tickets_logs")) || initialTickets;

  function renderTickets() {
    if (!ticketsContainer) return;
    ticketsContainer.innerHTML = "";

    if (tickets.length === 0) {
      ticketsContainer.innerHTML = `<p class="ticket-card_empty">У вас нет поданных официальных обращений.</p>`;
      return;
    }

    tickets.forEach(ticket => {
      const card = document.createElement("div");
      
      const cardModClass = ticket.statusClass === '_excellent' ? 'message_excellent' : 'message_horrible';
      const badgeModClass = ticket.statusClass === '_excellent' ? 'message_status_excellent' : 'message_status_horrible';
      
      card.className = `message ${cardModClass}`;
      
      card.innerHTML = `
        <div class="message__header">
        <div class="message_status ${badgeModClass}">${ticket.status}</div>
          <p class="message__recipient">Кому: ${ticket.recipient}</p>
        </div>
        <div class="message__body">
          <div class="message__info-group">
            <h2 class="message__title">Тема: ${escapeHTML(ticket.subject)}</h2>
            <p class="message__date">${ticket.date}</p>
          </div>
          <p class="message__text">Ваш текст: ${escapeHTML(ticket.text)}</p>
        </div>
        ${ticket.answer ? `
          <div class="message__return">
            <h3 class="message__return-title">Официальный ответ:</h3>
            <p class="message__return-text">${escapeHTML(ticket.answer)}</p>
          </div>
        ` : ''}
      `;

      ticketsContainer.appendChild(card);
    });
  }

  // Плавное открытие через CSS-класс active
  if (openModalBtn && modal) {
    openModalBtn.addEventListener("click", () => {
      modal.classList.add("active");
    });
  }

  // Плавное закрытие через удаление класса active
  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Закрытие по клику на затемненную область вокруг окна
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Логика отправки формы
  if (ticketForm) {
    ticketForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const recipient = document.getElementById("ticket-recipient").value;
      const subject = document.getElementById("ticket-subject").value.trim();
      const text = document.getElementById("ticket-text").value.trim();

      if (subject === "" || text === "") return;

      const now = new Date();
      const timeString = now.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
      const dateString = `Сегодня, ${timeString}`;

      const newTicket = {
        id: Date.now(),
        recipient: recipient,
        subject: subject,
        date: dateString,
        status: "На рассмотрении",
        statusClass: "_normal",
        text: text,
        answer: null
      };

      tickets.unshift(newTicket);
      localStorage.setItem("school_tickets_logs", JSON.stringify(tickets));

      // Закрываем окно с плавной анимацией
      modal.classList.remove("active");
      
      // Сбрасываем текст в полях формы
      ticketForm.reset();
      
      // Обновляем список на экране
      renderTickets();
    });
  }

  function escapeHTML(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  renderTickets();
});
