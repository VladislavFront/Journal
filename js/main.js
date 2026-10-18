const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  // 1. Проверяем, в какую сторону идет скролл
  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    // Скроллим ВНИЗ и ушли ниже чем на 100px — прячем хедер
    header.classList.add('header_hidden');
  } else {
    // Скроллим ВВЕРХ (даже на 1 пиксель или один свайп) — показываем хедер
    header.classList.remove('header_hidden');
  }
  
  // 2. Обновляем значение прошлой позиции скролла
  lastScrollY = window.scrollY;
});

const burgerMenu = document.querySelector('.burger')

function openBurgerMenu() {
  burgerMenu.classList.add('active')
}

function closedBurgerMenu() {
  burgerMenu.classList.remove('active')
}
