// Находим контейнер и все карточки внутри него
const container = document.querySelector('.days-down');
const cards = container.querySelectorAll('.days-down__day-card');

// Используем делегирование событий для лучшей производительности
container.addEventListener('click', (event) => {
  // Находим ближайшего родителя с классом карточки (на случай клика по тексту внутри)
  const clickedCard = event.target.closest('.days-down__day-card');
  
  // Если клик был не по карточке или внутри этого контейнера, ничего не делаем
  if (!clickedCard) return;

  // Удаляем активный класс у старой карточки
  const currentActive = container.querySelector('.days-down__day-card_active');
  if (currentActive) {
    currentActive.classList.remove('days-down__day-card_active');
  }

  // Добавляем активный класс на кликнутую карточку
  clickedCard.classList.add('days-down__day-card_active');
});