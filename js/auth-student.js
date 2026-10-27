document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("form-student");

  // Имитация официальной базы данных учеников школы (Они имеют право войти)
  const staticStudentsDatabase = [
    {
      email: "sokolova@school.ru",
      name: "Соколова Анастасия Михайловна",
      gradeClass: "9А",
      avatar: "АС"
    },
    {
      email: "petrov@school.ru",
      name: "Петров Иван Иванович",
      gradeClass: "10Б",
      avatar: "ИП"
    }
  ];

  // Инициализируем базу данных в памяти браузера, если её там еще нет
  if (!localStorage.getItem("global_school_users")) {
    localStorage.setItem("global_school_users", JSON.stringify(staticStudentsDatabase));
  }

  if (studentForm) {
    studentForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Отменяем стандартную отправку и перезагрузку

      // 1. Считываем данные и сразу чистим их от лишних пробелов
      const inputName = document.getElementById("student-fio").value.trim();
      const inputClass = document.getElementById("student-class").value.trim();
      const inputEmail = document.getElementById("student-email").value.trim().toLowerCase(); //

      // ==========================================
      // ЭТАП 1: ВАЛИДАЦИЯ ФОРМАТА ВВОДА (ЧЕРЕЗ REGEX)
      // ==========================================

      // Проверка ФИО: Строго 3 слова на кириллице (Фамилия Имя Отчество), каждое с большой буквы
      const fioRegex = /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)?\s+[А-ЯЁ][а-яё]+\s+[А-ЯЁ][а-яё]+$/;
      if (!fioRegex.test(inputName)) {
        alert("Ошибка ввода ФИО!\nПожалуйста, введите полное Фамилия Имя Отчество на русском языке (например: Петров Иван Иванович).");
        return; // Останавливаем выполнение скрипта, форма не отправляется
      }

      // Проверка класса: Строго цифра от 1 до 11, затем буква параллели от А до Г
      // Примеры валидных строк: "9А класс", "10Б класс", "11Г класс"
      const classRegex = /^(?:[1-9]|1[0-1])[А-Г]/;
      if (!classRegex.test(inputClass)) {
        alert("Ошибка ввода класса!\nКласс должен быть в формате: Цифра (от 1 до 11) + Буква параллели (от А до Г).\nПример: 10Б");
        return;
      }

      // Проверка почты: Стандартный email-формат школьного домена (например, что-то@school.ru или любой валидный)
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(inputEmail)) {
        alert("Ошибка ввода Email!\nВведите корректный адрес электронной почты.");
        return;
      }

      // ==========================================
      // ЭТАП 2: ПРОВЕРКА И АВТОМАТИЧЕСКАЯ РЕГИСТРАЦИЯ
      // ==========================================

            // ==========================================
      // ЭТАП 2: ПРОВЕРКА И АВТОМАТИЧЕСКАЯ РЕГИСТРАЦИЯ УЧЕНИКА
      // ==========================================

      let usersDB = JSON.parse(localStorage.getItem("global_school_users")) || [];

      // Ищем пользователя с такой почтой
      let userAccount = usersDB.find(u => u.email === inputEmail);

      if (!userAccount) {
        const nameParts = inputName.split(" ");
        let avatarLetters = "УЧ";
        if (nameParts.length >= 2) {
          avatarLetters = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        }

        // Создаем новый аккаунт ученика
        userAccount = {
          email: inputEmail,
          name: inputName,
          gradeClass: inputClass,
          avatar: avatarLetters,
          role: "student" // ВАЖНО: явно пишем роль ученику!
        };

        usersDB.push(userAccount);
        localStorage.setItem("global_school_users", JSON.stringify(usersDB));
        console.log(`[База Данных] Зарегистрирован новый ученик: ${inputName}`);
      } else {
        // ЕСЛИ ПОЛЬЗОВАТЕЛЬ ЕСТЬ: Проверяем, что это не родитель ломится к ученикам
        if (userAccount.role === "parent") {
          alert("Ошибка авторизации!\nЭта почта зарегистрирована как аккаунт родителя.");
          return;
        }

        // Проверяем данные
        if (userAccount.name.toLowerCase() !== inputName.toLowerCase() || 
            (userAccount.gradeClass && userAccount.gradeClass.toLowerCase() !== inputClass.toLowerCase())) {
          
          alert("Ошибка авторизации!\nПользователь с такой почтой уже зарегистрирован, но введенное ФИО или Класс не совпадают.");
          return;
        }
      }

      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));
      window.location.href = "../student/student.html";


      // ЛОГИКА АВТОРИЗАЦИИ: Записываем пользователя в текущую сессию
      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));

      // Перенаправляем на главную страницу дневника ученика
      window.location.href = "../student/student.html";
    });
  }
});
