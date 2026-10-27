// const globalStudentsDatabase = JSON.parse(localStorage.getItem("global_school_users")) || [
//   { id: "stud_101", email: "sokolova@school.ru", name: "Соколова Анастасия Михайловна", gradeClass: "9А", avatar: "АС", linkCode: "XYZ-789" },
//   { id: "stud_102", email: "petrov@school.ru", name: "Петров Иван Иванович", gradeClass: "10Б", avatar: "ИП", linkCode: "ABC-123" }
// ];

// // На всякий случай обновляем её в localStorage, чтобы в ней появились коды привязки linkCode
// localStorage.setItem("global_school_users", JSON.stringify(globalStudentsDatabase));

// // Данные текущего вошедшего родителя (берем из sessionStorage, так как авторизация там)
// let currentParent = JSON.parse(sessionStorage.getItem('currentUser')) || {
//   id: "parent_01",
//   name: "Иванов И.И.",
//   role: "parent",
//   childrenIds: ["stud_101"] // по умолчанию привяжем Анастасию Соколову для теста
// };

// const childrenGrid = document.getElementById('children-container');
// const addChildBtn = document.getElementById('addChildBtn');
// const logoutBtn = document.getElementById('logoutBtn');
// const addModal = document.getElementById('addModal');
// const btnCancelModal = document.getElementById('btnCancelModal');
// const btnSubmitCode = document.getElementById('btnSubmitCode');
// const childCodeInput = document.getElementById('childCodeInput');

// // 1. Функция отрисовки карточек детей
// function renderChildren() {
//   // Удаляем старые карточки учеников (оставляя только последнюю кнопку "Добавить")
//   const existingCards = childrenGrid.querySelectorAll('.child-card:not(.add-card)');
//   existingCards.forEach(card => card.remove());

//   // Ищем данные детей родителя в "базе данных"
//   currentParent.childrenIds.forEach(childId => {
//     const studentData = globalStudentsDatabase.find(s => s.id === childId);
    
//     if (studentData) {
//         // Создаем карточку
//         const card = document.createElement('div');
//         card.className = 'child-card';
//         card.innerHTML = `
//             <div class="child-avatar">👨‍🎓</div>
//             <div class="child-name">${studentData.name}</div>
//             <div class="child-class">${studentData.class} класс</div>
//         `;
        
//         // При клике на карточку — выбираем ребенка
//         card.addEventListener('click', () => selectChild(studentData.id));
        
//         // Вставляем карточку перед кнопкой "Добавить"
//         childrenGrid.insertBefore(card, addChildBtn);
//     }
//   });
// }

// // 2. Функция выбора конкретного ребенка и перехода в дневник
// function selectChild(childId) {
//   // Сохраняем ID выбранного ребенка в сессию (чтобы дневник знал, чьи оценки показывать)
//   localStorage.setItem('activeChildId', childId);
  
//   // Перенаправляем на главную страницу родительского интерфейса
//   window.location.href = 'student.html';
// }

// // 3. Обработка модального окна добавления ребенка (ПЛАВНАЯ АНИМАЦИЯ)
// addChildBtn.addEventListener('click', () => {
//   addModal.classList.add('modal--active'); // Добавляем класс плавного открытия
//   childCodeInput.value = '';
  
//   // Фокус на инпут ставим с микрозадержкой, чтобы он не ломал анимацию всплытия
//   setTimeout(() => {
//     childCodeInput.focus();
//   }, 100);
// });

// btnCancelModal.addEventListener('click', () => {
//   addModal.classList.remove('modal--active'); // Убираем класс для плавного закрытия
// });

// // Клик вне модального окна закрывает его
// window.addEventListener('click', (e) => {
//   if (e.target === addModal) {
//     addModal.classList.remove('modal--active');
//   }
// });


// // 4. Логика привязки по коду
// btnSubmitCode.addEventListener('click', () => {
//   const code = childCodeInput.value.trim().toUpperCase();
  
//   // Ищем ученика с таким кодом привязки
//   const foundStudent = globalStudentsDatabase.find(s => s.linkCode === code);
  
//   if (!foundStudent) {
//       alert('Ученик с таким кодом не найден. Проверьте правильность ввода.');
//       return;
//   }
  
//   if (currentParent.childrenIds.includes(foundStudent.id)) {
//       alert('Этот ребенок уже привязан к вашему аккаунту!');
//       return;
//   }
  
//   // Привязываем ребенка к родителю
//   currentParent.childrenIds.push(foundStudent.id);
  
//   // Обновляем данные в localStorage
//   localStorage.setItem('currentUser', JSON.stringify(currentParent));
  
//   // Закрываем окно и перерисовываем интерфейс
//   addModal.classList.remove('modal--active');
//   renderChildren();
//   alert(`Ребенок ${foundStudent.name} успешно привязан!`);
// });

// // 5. Логика полного выхода из аккаунта родителя
// logoutBtn.addEventListener('click', () => {
//   // Очищаем данные авторизации
//   localStorage.removeItem('currentUser');
//   localStorage.removeItem('activeChildId');
  
//   // Кидаем на страницу входа
//   window.location.href = '../auth/registration.html';
// });

// renderChildren();






// Жёстко прописываем эталонную базу школы с кодами привязки linkCode
const defaultSchoolDatabase = [
  { id: "stud_101", email: "sokolova@school.ru", name: "Соколова Анастасия Михайловна", gradeClass: "9А", avatar: "АС", linkCode: "XYZ-789" },
  { id: "stud_102", email: "petrov@school.ru", name: "Петров Иван Иванович", gradeClass: "10Б", avatar: "ИП", linkCode: "ABC-123" }
];

// Проверяем localStorage. Если базы нет ИЛИ она пустая, ИЛИ там старый формат без linkCode — перезаписываем её
let globalStudentsDatabase = JSON.parse(localStorage.getItem("global_school_users"));

if (!globalStudentsDatabase || !globalStudentsDatabase[0] || !globalStudentsDatabase[0].linkCode) {
  localStorage.setItem("global_school_users", JSON.stringify(defaultSchoolDatabase));
  globalStudentsDatabase = defaultSchoolDatabase;
  console.log("[Система] База данных школы успешно инициализирована с кодами привязки.");
}

// Данные текущего вошедшего родителя (берем из сессии авторизации)
let currentParent = JSON.parse(sessionStorage.getItem('currentUser')) || {
  id: "parent_01",
  name: "Иванов И.И.",
  role: "parent",
  childrenIds: ["stud_101"] // По умолчанию привязываем Настю для теста, чтобы страница не была пустой
};


const childrenGrid = document.getElementById('children-container');
const addChildBtn = document.getElementById('addChildBtn');
const logoutBtn = document.getElementById('logoutBtn');
const addModal = document.getElementById('addModal');
const btnCancelModal = document.getElementById('btnCancelModal');
const btnSubmitCode = document.getElementById('btnSubmitCode');
const childCodeInput = document.getElementById('childCodeInput');

// 1. Функция отрисовки карточек детей
function renderChildren() {
  // Удаляем старые карточки учеников (оставляя только последнюю кнопку "Добавить")
  const existingCards = childrenGrid.querySelectorAll('.child-card:not(.add-card)');
  existingCards.forEach(card => card.remove());

  // Ищем данные детей родителя в "базе данных"
  currentParent.childrenIds.forEach(childId => {
    const studentData = globalStudentsDatabase.find(s => s.id === childId || s.email === childId);
    
    if (studentData) {
        // Создаем карточку
        const card = document.createElement('div');
        card.className = 'child-card';
        // ИСПРАВЛЕНО: заменили studentData.class на studentData.gradeClass
        card.innerHTML = `
            <div class="child-avatar">👨‍🎓</div>
            <div class="child-name">${studentData.name}</div>
            <div class="child-class">${studentData.gradeClass} класс</div>
        `;
        
        // При клике на карточку — выбираем ребенка
        card.addEventListener('click', () => selectChild(studentData.id || studentData.email));
        
        // Вставляем карточку перед кнопкой "Добавить"
        childrenGrid.insertBefore(card, addChildBtn);
    }
  });
}

// 2. Функция выбора конкретного ребенка и перехода в дневник
function selectChild(childId) {
  // Сохраняем ID выбранного ребенка в сессию (чтобы дневник знал, чьи оценки показывать)
  localStorage.setItem('activeChildId', childId);
  
  // Перенаправляем на главную страницу родительского интерфейса
  window.location.href = 'student.html';
}

// 3. Обработка модального окна добавления ребенка (ПЛАВНАЯ АНИМАЦИЯ)
addChildBtn.addEventListener('click', () => {
  addModal.classList.add('modal--active');
  childCodeInput.value = '';
  
  setTimeout(() => {
    childCodeInput.focus();
  }, 100);
});

btnCancelModal.addEventListener('click', () => {
  addModal.classList.remove('modal--active');
});

window.addEventListener('click', (e) => {
  if (e.target === addModal) {
    addModal.classList.remove('modal--active');
  }
});


// 4. Логика привязки по коду (ИСПРАВЛЕННАЯ СВЯЗЬ)
btnSubmitCode.addEventListener('click', () => {
  const code = childCodeInput.value.trim().toUpperCase();
  
  if (!code) {
      alert('Введите код привязки!');
      return;
  }

  // 1. Берем актуальную базу пользователей школы из localStorage
  let allUsersInSystem = JSON.parse(localStorage.getItem("global_school_users")) || defaultSchoolDatabase;
  
  // 2. Ищем РЕБЕНКА в этой базе по коду привязки
  const foundStudent = allUsersInSystem.find(s => s.linkCode === code);
  
  if (!foundStudent) {
      alert('Ученик с таким кодом не найден. Проверьте правильность ввода (Пример: XYZ-789).');
      return;
  }

  // Важная проверка безопасности: код должен принадлежать ученику, а не другому родителю
  if (foundStudent.role === "parent") {
      alert('Этот код принадлежит аккаунту родителя, а не ученика!');
      return;
  }
  
  // 3. Проверяем, не привязан ли этот ребенок УЖЕ к текущему родителю
  if (currentParent.childrenIds.includes(foundStudent.id) || currentParent.childrenIds.includes(foundStudent.email)) {
      alert('Этот ребенок уже привязан к вашему аккаунту!');
      return;
  }
  
  // 4. Добавляем ID или Email ребенка строго в массив детей НАШЕГО родителя
  const targetChildIdentifier = foundStudent.id || foundStudent.email;
  currentParent.childrenIds.push(targetChildIdentifier);
  
  // 5. Обновляем сессию текущего пользователя (sessionStorage), чтобы шапка сразу видела изменения
  sessionStorage.setItem('currentUser', JSON.stringify(currentParent));
  
  // 6. Находим аккаунт текущего РОДИТЕЛЯ в общей базе (localStorage) и обновляем список его детей там
  let parentAccountInDB = allUsersInSystem.find(u => u.email === currentParent.email && u.role === "parent");
  
  if (parentAccountInDB) {
      parentAccountInDB.childrenIds = currentParent.childrenIds;
  } else {
      // Если родителя почему-то нет в базе (например, зашли под тестовым аккаунтом из кода), 
      // добавляем его туда, чтобы не ломать структуру данных
      allUsersInSystem.push(currentParent);
  }
  
  // Сохраняем обновленную базу школы в localStorage
  localStorage.setItem("global_school_users", JSON.stringify(allUsersInSystem));
  
  // 7. Закрываем окно, перерисовываем карточки и выводим сообщение
  addModal.classList.remove('modal--active');
  renderChildren();
  alert(`Ребенок ${foundStudent.name} успешно привязан к вашему аккаунту!`);
});


// 5. Логика полного выхода из аккаунта родителя
logoutBtn.addEventListener('click', () => {
  // Очищаем текущие сессии
  sessionStorage.removeItem('currentUser');
  localStorage.removeItem('activeChildId');
  
  // Кидаем на страницу входа
  window.location.href = '../auth/registration.html';
});

// Запуск отрисовки при загрузке страницы
renderChildren();
