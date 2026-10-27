document.addEventListener("DOMContentLoaded", () => {
  const parentForm = document.getElementById("form-parents");

  if (parentForm) {
    parentForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Отменяем стандартную отправку и перезагрузку

      // 1. Считываем данные родителя и чистим их от пробелов
      const inputName = document.getElementById("parent-fio").value.trim();
      const inputEmail = document.getElementById("parent-email").value.trim().toLowerCase();

      // ==========================================
      // ЭТАП 1: ВАЛИДАЦИЯ ФОРМАТА ВВОДА (ЧЕРЕЗ REGEX)
      // ==========================================

      // Проверка ФИО: Строго 3 слова на кириллице (Фамилия Имя Отчество), каждое с большой буквы
      const fioRegex = /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?\s+[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+$/;
      if (!fioRegex.test(inputName)) {
        alert("Ошибка ввода ФИО!\nПожалуйста, введите полное Фамилия Имя Отчество на русском языке (например: Иванов Иван Иванович).");
        return; 
      }

      // Проверка почты: Стандартный email-формат
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(inputEmail)) {
        alert("Ошибка ввода Email!\nВведите корректный адрес электронной почты.");
        return;
      }

      // ==========================================
      // ЭТАП 2: ПРОВЕРКА И АВТОМАТИЧЕСКАЯ РЕГИСТРАЦИЯ
      // ==========================================

            // ==========================================
      // ЭТАП 2: ПРОВЕРКА И АВТОМАТИЧЕСКАЯ РЕГИСТРАЦИЯ РОДИТЕЛЯ
      // ==========================================

      let usersDB = JSON.parse(localStorage.getItem("global_school_users")) || [];

      let userAccount = usersDB.find(u => u.email === inputEmail);

      if (!userAccount) {
        const nameParts = inputName.split(" ");
        let avatarLetters = "РД";
        if (nameParts.length >= 2) {
          avatarLetters = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        }

        userAccount = {
          email: inputEmail,
          name: inputName,
          avatar: avatarLetters,
          role: "parent",       
          childrenIds: []       
        };

        usersDB.push(userAccount);
        localStorage.setItem("global_school_users", JSON.stringify(usersDB));
        console.log(`[База Данных] Зарегистрирован новый родитель: ${inputName}`);
      } else {
        // ИСПРАВЛЕНО: Если у аккаунта роль student ИЛИ роли нет вообще (базовые ученики Соколова/Петров) — не пускаем родителя!
        if (userAccount.role === "student" || !userAccount.role) {
          alert("Ошибка авторизации!\nЭта почта принадлежит ученику школы. Для родительского аккаунта используйте другую почту.");
          return;
        }

        if (userAccount.name.toLowerCase() !== inputName.toLowerCase()) {
          alert("Ошибка авторизации!\nПользователь с такой почтой уже зарегистрирован, но введенное ФИО не совпадает.");
          return; 
        }
      }

      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));
      window.location.href = "../parent/select-child.html";


      // ЛОГИКА АВТОРИЗАЦИИ: Записываем сессию родителя
      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));

      // Перенаправляем родителя на страницу выбора / привязки ребенка
      window.location.href = "../parent/select-child.html";
    });
  }
});

