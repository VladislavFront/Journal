document.addEventListener("DOMContentLoaded", () => {
  // 1. ПРОВЕРКА СЕССИИ
  const sessionData = sessionStorage.getItem("currentUser");

  if (!sessionData) {
    window.location.href = "../auth/registration.html"; 
    return; 
  }

  const currentUser = JSON.parse(sessionData);

  // Вспомогательная функция для сокращения ФИО до "Фамилия И.О."
  // Если придет "Петров Иван Иванович" -> станет "Петров И.И."
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
  
  allNames.forEach(name => {
    name.textContent = shortName;
  });

  // === НАШЕ ОБНОВЛЕНИЕ: ВЫВОД СТАТУСА ДЛЯ РОДИТЕЛЯ ВМЕСТО КЛАССА ===
  let classStatusText = "";

  if (currentUser.role === "parent") {
    // 1. Ищем данные выбранного ребенка в базе
    const activeChildId = localStorage.getItem("activeChildId");
    const globalStudentsDatabase = JSON.parse(localStorage.getItem("global_school_users")) || [];
    const childData = globalStudentsDatabase.find(s => s.id === activeChildId || s.email === activeChildId);
    
    if (childData) {
      // Разбираем ФИО ребенка по пробелам
      const childNameParts = childData.name.trim().split(/\s+/);
      const childLastName = childNameParts[0]; // Фамилия (например, "Иванов")
      const childFirstName = childNameParts[1] || ""; // Имя (например, "Егор")
      
      // Склонение в родительный падеж для красивого вывода (базовое правило для русского языка)
      let dynamicLastName = childLastName;
      let dynamicFirstName = childFirstName;

      // Склоняем фамилию (если мужская на согласную - добавляем 'а', если женская на 'а' - меняем на 'ой')
      if (dynamicLastName.endsWith("в") || dynamicLastName.endsWith("н")) {
        dynamicLastName += "а"; // Иванов -> Иванова, Петров -> Петрова
      } else if (dynamicLastName.endsWith("ва") || dynamicLastName.endsWith("на")) {
        dynamicLastName = dynamicLastName.slice(0, -1) + "ы"; // Иванова -> Ивановой
      }

      // Склоняем имя
      if (dynamicFirstName.endsWith("р") || dynamicFirstName.endsWith("н") || dynamicFirstName.endsWith("л")) {
        dynamicFirstName += "а"; // Егор -> Егора, Иван -> Ивана, Михаил -> Михаила
      } else if (dynamicFirstName.endsWith("я")) {
        dynamicFirstName = dynamicFirstName.slice(0, -1) + "и"; // Мария -> Марии, Анастасия -> Анастасии
      } else if (dynamicFirstName.endsWith("а") && !dynamicFirstName.endsWith("ва")) {
        dynamicFirstName = dynamicFirstName.slice(0, -1) + "ы"; // Анна -> Анны
      }

      classStatusText = `Родитель: ${dynamicLastName} ${dynamicFirstName}`;
    } else {
      classStatusText = "Родитель";
    }
  } else {
    // Если зашел ученик, выводим его стандартный класс
    classStatusText = currentUser.gradeClass || "";
  }

  // Вставляем получившийся текст на страницу
  const allClasses = document.querySelectorAll(".user-info__class, .user-class");
  allClasses.forEach(cls => {
    if (cls.classList.contains("user-class-teacher")) {
      const subTitle = cls.querySelector(".user-class-teacher__sub-title");
      if (subTitle) {
        cls.childNodes[0].textContent = classStatusText + " ";
      } else {
        cls.textContent = classStatusText;
      }
    } else {
      cls.textContent = classStatusText;
    }
  });
  // ===============================================================


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
  const teacherNames = document.querySelectorAll(".user-class-teacher__sub-title");
  if (teacherNames.length > 0) {
    let currentTeacher = "Орлова Т.С.";
    
    // БЕЗОПАСНАЯ ПРОВЕРКА: Сначала создаем переменную для класса
    let currentClass = "";
    
    // Если это родитель, берем класс выбранного ребенка, если ученик — его собственный
    if (currentUser.role === "parent") {
      const activeChildId = localStorage.getItem("activeChildId");
      const globalStudentsDatabase = JSON.parse(localStorage.getItem("global_school_users")) || [];
      const childData = globalStudentsDatabase.find(s => s.id === activeChildId || s.email === activeChildId);
      currentClass = childData ? childData.gradeClass : "";
    } else {
      currentClass = currentUser.gradeClass || "";
    }
    
    // Теперь проверяем класс через созданную переменную, у которой точно не будет undefined
    if (currentClass && currentClass.includes("10Б")) {
      currentTeacher = "Никифоров Д. А."; 
    } else if (currentClass && currentClass.includes("11")) {
      currentTeacher = "Смирнова Е. В.";
    }

    teacherNames.forEach(t => {
      t.textContent = currentTeacher;
    });
  }

  // 5. ЛОГИКА ВЫХОДА ИЗ АККАУНТА (С УЧЕТОМ РОЛИ РОДИТЕЛЯ)
  const exitButtons = document.querySelectorAll(".header-right__btn-exit");
  
  exitButtons.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем стандартный переход по ссылке

      // Проверяем роль текущего пользователя
      if (currentUser.role === "parent") {
        // --- ЛОГИКА ДЛЯ РОДИТЕЛЯ ---
        // Стираем только ID активного ребенка, чтобы сессия родителя не сбрасывалась
        localStorage.removeItem("activeChildId");
        
        // Перенаправляем родителя обратно на страницу выбора детей
        // Так как страницы дневника лежат в html/parent/, файл select-child.html находится в этой же папке
        window.location.href = "select-child.html";
      } else {
        // --- ЛОГИКА ДЛЯ УЧЕНИКА (оставляем твою стандартную) ---
        const confirmExit = confirm("Вы действительно хотите выйти из учетной записи электронного журнала?");
        if (confirmExit) {
          sessionStorage.removeItem("currentUser");
          window.location.href = "../auth/registration.html";
        }
      }
    });
  });

});
