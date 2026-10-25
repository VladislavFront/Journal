document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("form-student");

  // Имитация базы данных существующих учеников в школе
  const staticStudentsDatabase = [
    {
      email: "sokolova@school.ru",
      name: "Соколова Анастасия Михайловна",
      gradeClass: "9А класс",
      avatar: "АС"
    },
    {
      email: "petrov@school.ru",
      name: "Петров Иван Иванович",
      gradeClass: "10Б класс",
      avatar: "ИП"
    }
  ];

  // Инициализируем базу данных в памяти браузера, если её там еще нет
  if (!localStorage.getItem("global_school_users")) {
    localStorage.setItem("global_school_users", JSON.stringify(staticStudentsDatabase));
  }

  if (studentForm) {
    studentForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Отменяем перезагрузку

      // Считываем то, что ввел пользователь в форму
      const inputName = document.getElementById("student-fio").value.trim();
      const inputClass = document.getElementById("student-class").value.trim();
      const inputEmail = document.getElementById("student-email").value.trim().toLowerCase();

      // Загружаем текущую базу зарегистрированных пользователей
      let usersDB = JSON.parse(localStorage.getItem("global_school_users"));

      // Проверяем, существует ли уже пользователь с таким e-mail
      let userAccount = usersDB.find(u => u.email === inputEmail);

      if (!userAccount) {
        // ЛОГИКА РЕГИСТРАЦИИ: Если пользователя нет в базе, создаем его
        // Вычисляем буквы для аватарки (берем первые буквы ФИО)
        const nameParts = inputName.split(" ");
        let avatarLetters = "УЧ";
        if (nameParts.length >= 2) {
          avatarLetters = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        } else if (nameParts.length === 1 && nameParts[0].length > 0) {
          avatarLetters = nameParts[0].substring(0, 2).toUpperCase();
        }

        userAccount = {
          email: inputEmail,
          name: inputName,
          gradeClass: inputClass,
          avatar: avatarLetters
        };

        // Сохраняем нового юзера в нашу "БД"
        usersDB.push(userAccount);
        localStorage.setItem("global_school_users", JSON.stringify(usersDB));
      }

      // ЛОГИКА АВТОРИЗАЦИИ: Записываем пользователя в текущую сессию
      sessionStorage.setItem("currentUser", JSON.stringify(userAccount));

      // Перенаправляем на главную страницу дневника ученика
      window.location.href = "student.html";
    });
  }
});
