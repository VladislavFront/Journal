document.addEventListener("DOMContentLoaded", () => {
  // 1. ПРОВЕРКА СЕССИИ
  const sessionData = sessionStorage.getItem("currentUser");

  if (!sessionData) {
    // Если сессия пустая — выкидываем на регистрацию
    window.location.href = "registration.html"; 
    return; 
  }

  const currentUser = JSON.parse(sessionData);

  // 2. ДИНАМИЧЕСКИЙ ХЕДЕР: Находим элементы шапки
  const headerAvatar = document.querySelector(".user-block__avatar");
  const headerName = document.querySelector(".user-info__name");
  const headerClass = document.querySelector(".user-info__class");

  // Подставляем данные вошедшего пользователя вместо зашитых в HTML
  if (headerAvatar) headerAvatar.textContent = currentUser.avatar;
  if (headerName) headerName.textContent = currentUser.name;
  if (headerClass) headerClass.textContent = currentUser.gradeClass;

  // Находим дублирующие блоки (для бургера)
  const burgerAvatar = document.querySelector(".burger .user-block__avatar");
  const burgerName = document.querySelector(".burger .user-info__name");
  const burgerClass = document.querySelector(".burger .user-info__class");

  if (burgerAvatar) burgerAvatar.textContent = currentUser.avatar;
  if (burgerName) burgerName.textContent = currentUser.name;
  if (burgerClass) burgerClass.textContent = currentUser.gradeClass;

  // Находим дублирующие блоки (для хедкра)
  const headerDefoultAvatar = document.querySelector(".header .user-block__avatar");
  const headerDefoultName = document.querySelector(".header .user-info__name");
  const headerDefoultClass = document.querySelector(".header .user-info__class");

  if (headerDefoultAvatar) headerDefoultAvatar.textContent = currentUser.avatar;
  if (headerDefoultName) headerDefoultName.textContent = currentUser.name;
  if (headerDefoultClass) headerDefoultClass.textContent = currentUser.gradeClass;

  // Находим дублирующие блоки (для сайдбара)
  const sidebarAvatar = document.querySelector(".sidebar .user-block__avatar");
  const sidebarName = document.querySelector(".sidebar .user-info__name");
  const sidebarClass = document.querySelector(".sidebar .user-info__class");

  if (sidebarAvatar) sidebarAvatar.textContent = currentUser.avatar;
  if (sidebarName) sidebarName.textContent = currentUser.name;
  if (sidebarClass) sidebarClass.textContent = currentUser.gradeClass;

  // Находим дублирующие блоки (для центральной панели)
  const centerPanelName = document.querySelector(".center-panel .user-name");
  const centerPanelClass = document.querySelector(".center-panel .user-class");

  if (centerPanelName) centerPanelName.textContent = currentUser.name;
  if (centerPanelClass) centerPanelClass.textContent = currentUser.gradeClass;


  // 3. ЛОГИКА ВЫХОДА ИЗ АККАУНТА
  // Перехватываем кнопку «Выйти» (и в основном хедере, и в бургере)
  const exitButtons = document.querySelectorAll(".header-right__btn-exit");

  exitButtons.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault(); 

      const confirmExit = confirm("Вы действительно хотите выйти из учетной записи электронного журнала?");

      if (confirmExit) {
        // Очищаем сессию вошедшего пользователя
        sessionStorage.removeItem("currentUser");
        // Отправляем обратно на страницу авторизации
        window.location.href = "registration.html";
      }
    });
  });
});
