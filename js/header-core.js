document.addEventListener("DOMContentLoaded", () => {
  // 1. ПРОВЕРКА СЕССИИ
  const sessionData = sessionStorage.getItem("currentUser");

  if (!sessionData) {
    window.location.href = "registration.html"; 
    return; 
  }

  const currentUser = JSON.parse(sessionData);

  // Вспомогательная функция для сокращения ФИО до "Фамилия И.О."
  // Если придет "Петров Иван Иванович" -> станет "Петров И.И."
  // Если придет просто "Соколова Анастасия" -> станет "Соколова А."
  function formatFIO(fullName) {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/); // Разбиваем по пробелам
    
    if (parts.length === 1) return parts[0]; // Если только одно слово, возвращаем как есть
    
    const lastName = parts[0]; // Фамилия
    let initials = "";
    
    // Перебираем остальные части (Имя, Отчество) и берем первые буквы
    for (let i = 1; i < parts.length; i++) {
      if (parts[i].length > 0) {
        initials += parts[i][0].toUpperCase() + ".";
      }
    }
    
    return `${lastName} ${initials}`;
  }

  const shortName = formatFIO(currentUser.name);

  // 2. БЕЗОПАСНОЕ ОБНОВЛЕНИЕ ВСЕХ ШАПОК, БУРГЕРОВ И САЙДБАРОВ
  const allAvatars = document.querySelectorAll(".user-block__avatar");
  const allNames = document.querySelectorAll(".user-info__name, .user-name");
  
  allAvatars.forEach(avatar => {
    avatar.textContent = currentUser.avatar;
  });
  
  // Вставляем СОКРАЩЕННОЕ имя в шапки и сайдбары
  allNames.forEach(name => {
    name.textContent = shortName;
  });

  const allClasses = document.querySelectorAll(".user-info__class, .user-class");
  allClasses.forEach(cls => {
    if (cls.classList.contains("user-class-teacher")) {
      const subTitle = cls.querySelector(".user-class-teacher__sub-title");
      if (subTitle) {
        cls.childNodes[0].textContent = currentUser.gradeClass + " ";
      } else {
        cls.textContent = currentUser.gradeClass;
      }
    } else {
      cls.textContent = currentUser.gradeClass;
    }
  });

  // 3. УЛЬТИМАТИВНАЯ КОРРЕКТИРОВКА ЗАГОЛОВКА ДНЕВНИКА / РАСПИСАНИЯ
  const contentTitles = document.querySelectorAll("h1, h2, h3, .diary-title, .schedule-title");
  
  contentTitles.forEach(title => {
    const text = title.textContent;
    if (text.includes("Соколова") || text.includes("Анна") || text.includes("9А") || text.includes("9A")) {
      
      // В центральном заголовке пишем ПОЛНОЕ имя, там много места
      if (text.includes("|")) {
        const parts = text.split("|");
        const quarterInfo = parts[1] ? parts[1].trim() : "четверть";
        title.innerHTML = `${currentUser.name} ${currentUser.gradeClass} * | ${quarterInfo}`;
      } else {
        title.textContent = `${currentUser.name} ${currentUser.gradeClass}`;
      }
    }
  });

  // 4. ДИНАМИЧЕСКИЙ ВЫВОД КЛАССНОГО РУКОВОДИТЕЛЯ В САЙДБАРЕ
  const teacherNames = document.querySelectorAll(".user-class-teacher__name, main h4");
  if (teacherNames.length > 0) {
    let currentTeacher = "Орлова Т.С.";
    
    if (currentUser.gradeClass.includes("10Б")) {
      currentTeacher = "Никифоров Д. А."; 
    } else if (currentUser.gradeClass.includes("11")) {
      currentTeacher = "Смирнова Е. В.";
    }

    teacherNames.forEach(t => {
      t.textContent = currentTeacher;
    });
  }

  // 5. ЛОГИКА ВЫХОДА ИЗ АККАУНТА С ПОДТВЕРЖДЕНИЕМ
  const exitButtons = document.querySelectorAll(".header-right__btn-exit");
  exitButtons.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault(); 
      const confirmExit = confirm("Вы действительно хотите выйти из учетной записи электронного журнала?");
      if (confirmExit) {
        sessionStorage.removeItem("currentUser");
        window.location.href = "registration.html";
      }
    });
  });
});
