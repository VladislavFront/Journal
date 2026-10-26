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


document.addEventListener('DOMContentLoaded', () => {
    // Находим ВСЕ кнопки печати на странице
    const printButtons = document.querySelectorAll('.export-btn_content-print');
    
    printButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            window.print(); // Запуск печати браузера
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const pdfButtons = document.querySelectorAll('.export-btn_content-export');

    pdfButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // !!! УКАЖИТЕ ТУТ КЛАСС ИЛИ ID КОНТЕЙНЕРА, В КОТОРЫЙ JS ЗАГРУЖАЕТ ЖУРНАЛ !!!
            const journalContainer = document.getElementById('journal-container') || document.querySelector('main');

            if (!journalContainer) {
                console.error('[PDF] Контейнер журнала не найден на странице!');
                return;
            }

            // Временно добавляем класс для превращения журнала в белый печатный вид
            journalContainer.classList.add('pdf-only-print');

            const options = {
                margin: 15, // Отступы от краев страницы (в мм)
                filename: 'Электронный_Дневник.pdf',
                image: { type: 'jpeg', quality: 1.0 },
                html2canvas: {
                    scale: 2, // Высокое качество и четкость текста
                    useCORS: true, 
                },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Генерируем PDF строго из этого контейнера
            html2pdf().set(options).from(journalContainer).save().then(() => {
                // Как только PDF скачался, возвращаем исходный дизайн журнала для пользователя
                journalContainer.classList.remove('pdf-only-print');
            });
        });
    });
});


