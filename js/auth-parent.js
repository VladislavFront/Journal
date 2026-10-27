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

      // Загружаем текущую базу данных зарегистрированных пользователей из локальной памяти
      // Если её нет, берем пустой массив (база учеников инициализируется в их скрипте)
      let usersDB = JSON.parse(localStorage.getItem("global_school_users")) || [];

      // Ищем, есть ли уже пользователь с такой почтой в нашей системе
      let userAccount = usersDB.find(u => u.email === inputEmail);

      // ЕСЛИ ПОЛЬЗОВАТЕЛЯ НЕТ В БАЗЕ — МЫ ЕГО РЕГИСТРИРУЕМ КАК РОДИТЕЛЯ
      if (!userAccount) {
        // Вычисляем буквы для аватарки (берем первые буквы Фамилии и Имени родителя)
        const nameParts = inputName.split(" ");
        let avatarLetters = "РД"; // По умолчанию Родитель
        if (nameParts.length >= 2) {
          avatarLetters = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        }

        // Создаем новый аккаунт родителя
        userAccount = {
          email: inputEmail,
          name: inputName,
          avatar: avatarLetters,
          role: "parent",       // Явно указываем роль, чтобы разделять интерфейсы
          childrenIds: []       // Массив для ID будущих привязанных детей (пока пустой)
        };

        // Сохраняем нового родителя в общую локальную "БД" (localStorage)
        usersDB.push(userAccount);
        localStorage.setItem("global_school_users", JSON.stringify(usersDB));
        
        console.log(`[База Данных] Зарегистрирован новый родитель: ${inputName}`);
      } else {
        // ЕСЛИ ПОЛЬЗОВАТЕЛЬ С ТАКОЙ ПОЧТОЙ УЖЕ ЕСТЬ:
        // 1. Проверяем, что это именно родитель, а не ученик пытается войти через форму родителя
        if (userAccount.role !== "parent") {
          alert("Ошибка авторизации!\nЭта почта зарегистрирована как аккаунт ученика. Используйте форму для учеников.");
          return;
        }

        // 2. Проверяем, совпадают ли введенные ФИО с тем, что сохранено под этой почтой
        if (userAccount.name.toLowerCase() !== inputName.toLowerCase()) {
          alert("Ошибка авторизации!\nПользователь с такой почтой уже зарегистрирован, но введенное ФИО не совпадает.");
          return; 
        }
      }

      // ЛОГИКА АВТОРИЗАЦИИ: Записываем сессию родителя
      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));

      // Перенаправляем родителя на страницу выбора / привязки ребенка
      window.location.href = "../parent/select-child.html";
    });
  }
});

