// 1. Твой оригинальный шаблон расписания уроков
const weeklyTemplate = {
  1: [ // Понедельник
    { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", grade: "5", gradeClass: "_excellent", hw: "§ 14, № 345–349" },
    { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", grade: "4", gradeClass: "_good", hw: "§ 14, № 345–349" },
    { num: 3, start: "09:40", end: "10:20", subject: "История", grade: "2", gradeClass: "_horrible", hw: "§ 14, № 345–349" },
    { num: 4, start: "10:35", end: "11:15", subject: "История", grade: "3", gradeClass: "_normal", hw: "§ 14, № 345–349" },
    { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", grade: "", gradeClass: "", hw: "§ 14, № 345–349" }
  ],
  2: [ // Вторник
    { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", grade: "5", gradeClass: "_excellent", hw: "§ 14, № 345–349" },
    { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", grade: "4", gradeClass: "_good", hw: "§ 14, № 345–349" },
    { num: 3, start: "09:40", end: "10:20", subject: "История", grade: "2", gradeClass: "_horrible", hw: "§ 14, № 345–349" },
    { num: 4, start: "10:35", end: "11:15", subject: "История", grade: "3", gradeClass: "_normal", hw: "§ 14, № 345–349" },
    { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", grade: "", gradeClass: "", hw: "§ 14, № 345–349" }
  ],
  3: [ // Среда
    { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", grade: "5", gradeClass: "_excellent", hw: "§ 14, № 345–349" },
    { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", grade: "4", gradeClass: "_good", hw: "§ 14, № 345–349" },
    { num: 3, start: "09:40", end: "10:20", subject: "История", grade: "2", gradeClass: "_horrible", hw: "§ 14, № 345–349" },
    { num: 4, start: "10:35", end: "11:15", subject: "История", grade: "3", gradeClass: "_normal", hw: "§ 14, № 345–349" },
    { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", grade: "", gradeClass: "", hw: "§ 14, № 345–349" }
  ],
  4: [ // Четверг
    { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", grade: "5", gradeClass: "_excellent", hw: "§ 14, № 345–349" },
    { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", grade: "4", gradeClass: "_good", hw: "§ 14, № 345–349" },
    { num: 3, start: "09:40", end: "10:20", subject: "История", grade: "2", gradeClass: "_horrible", hw: "§ 14, № 345–349" },
    { num: 4, start: "10:35", end: "11:15", subject: "История", grade: "3", gradeClass: "_normal", hw: "§ 14, № 345–349" },
    { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", grade: "", gradeClass: "", hw: "§ 14, № 345–349" }
  ],
  5: [ // Пятница
    { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", grade: "5", gradeClass: "_excellent", hw: "§ 14, № 345–349" },
    { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", grade: "4", gradeClass: "_good", hw: "§ 14, № 345–349" },
    { num: 3, start: "09:40", end: "10:20", subject: "История", grade: "2", gradeClass: "_horrible", hw: "§ 14, № 345–349" },
    { num: 4, start: "10:35", end: "11:15", subject: "История", grade: "3", gradeClass: "_normal", hw: "§ 14, № 345–349" },
    { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", grade: "", gradeClass: "", hw: "§ 14, № 345–349" },
    { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", grade: "", gradeClass: "", hw: "§ 14, № 345–349" }
  ],
  6: [] // Суббота (0 уроков)
};

// Базовый год проекта для отсчета
const BASE_YEAR = 2026; 

function getFirstMondayOfYear(year) {
  let date = new Date(year, 8, 1); 
  let dayOfWeek = date.getDay();
  if (dayOfWeek !== 1) {
    let daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    date.setDate(date.getDate() - daysToSubtract);
  }
  return date;
}

const globalStartMonday = getFirstMondayOfYear(BASE_YEAR); 

function getRealCurrentWeekIndex() {
  const today = new Date();
  const diffInMs = today - globalStartMonday;
  const msInWeek = 1000 * 60 * 60 * 24 * 7;
  const weekIndex = Math.floor(diffInMs / msInWeek);
  return weekIndex < 0 ? 0 : weekIndex;
}

let savedWeek = localStorage.getItem('selectedWeek');
let currentWeek = savedWeek !== null ? parseInt(savedWeek, 10) : getRealCurrentWeekIndex();

function getWeekDays(weekIndex) {
  const days = [];
  const dayNames = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const monthsNamesArr = ["сентября", "октября", "ноября", "декабря", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа"];
  
  for (let i = 0; i < 6; i++) {
    let dayDate = new Date(globalStartMonday); 
    let offset = (weekIndex * 7) + i;
    dayDate.setDate(dayDate.getDate() + offset);
    
    days.push({
      name: dayNames[i],
      dateNumber: dayDate.getDate(),
      dateString: dayDate.getDate().toString().padStart(2, '0'),
      monthString: (dayDate.getMonth() + 1).toString().padStart(2, '0'),
      monthNameGenitive: monthsNamesArr[dayDate.getMonth() >= 8 ? dayDate.getMonth() - 8 : dayDate.getMonth() + 4],
      year: dayDate.getFullYear(),
      fullDateString: dayDate.toDateString(),
      dayIndex: i + 1
    });
  }
  return days;
}

// 3. Функция рендеринга, полностью повторяющая твои исходные теги и структуру классов
function renderWeek(weekIndex) {
  const container = document.getElementById("journal-container");
  const weekTitle = document.getElementById("week-title");
  
  if (!container || !weekTitle) return; 
  
  const weekDays = getWeekDays(weekIndex);
  
  const firstDay = weekDays[0];
  const lastDay = weekDays[weekDays.length - 1];
  const displayedYear = lastDay.year; // Определяем актуальный год по последнему дню недели
  
  // Обновляем верхний диапазон дат: "21 - 26 сентября 2026"
  weekTitle.textContent = `${firstDay.dateNumber} - ${lastDay.dateNumber} ${lastDay.monthNameGenitive} ${displayedYear}`;
  
  container.innerHTML = "";
  
  weekDays.forEach(day => {
    const lessons = weeklyTemplate[day.dayIndex] || [];
    
    // 3.1. Генерация списка уроков (.schedule-block) строго по твоей иерархии классов
    let lessonsHTML = "";
    if (lessons.length === 0) {
      lessonsHTML = `
        <div class="schedule-main">
          <div class="schedule-right">
            <p class="schedule-right__homework-text" style="text-align: center; color: var(--no-active-color-dark); padding: 15px 0;">
              Выходной день
            </p>
          </div>
        </div>
      `;
    } else {
      lessonsHTML = lessons.map(lesson => `
        <div class="schedule-main">
          <div class="schedule-left">
            <div class="schedule-left__number">${lesson.num}</div>
            <div class="schedule-left__time">
              <span>${lesson.start}</span><br><span>${lesson.end}</span>
            </div>
          </div>
          <div class="schedule-right">
            <div class="schedule-right__header">
              <h3 class="schedule-right__title">${lesson.subject}</h3>
              ${lesson.grade ? `<span class="schedule-right__point schedule-right__point${lesson.gradeClass}">${lesson.grade}</span>` : ''}
            </div>
            <div class="schedule-right__homework">
              <div class="schedule-right__homework-title">
                <h4>Домашнее задание ДЗ</h4>
              </div>
              <p class="schedule-right__homework-text">${lesson.hw}</p>
            </div>
          </div>
        </div>
      `).join("");
    }
    
    // 3.2. Воссоздание шапки дня (.schedule-header) с панелью оценок справа
    const weekBlock = document.createElement("div");
    weekBlock.className = "schedule-week";
    
    weekBlock.innerHTML = `
      <div class="schedule-header">
        <div class="schedule-header__day">
          <h2 class="schedule-header__title">${day.name}</h2>
          <span class="schedule-header__sub-title">${day.dateString}.${day.monthString}</span>
        </div>
        <div class="schedule-header__info-day">
          ${lessons.length > 0 ? `
            <div class="schedule-header__rait-container">
              <span class="schedule-header__point schedule-header__point_excellent">5</span>
              <span class="schedule-header__point schedule-header__point_good">4</span>
              <span class="schedule-header__point schedule-header__point_normal">3</span>
              <span class="schedule-header__point schedule-header__point_horrible">2</span>
            </div>
          ` : ''}
          <div class="schedule-header__count-lesson">${lessons.length} уроков</div>
        </div>
      </div>
      <div class="schedule-block">
        ${lessonsHTML}
`;
container.appendChild(weekBlock);
});
updateTopCalendar(weekDays);
}

// 4. Настройка обработчиков
document.addEventListener("DOMContentLoaded", () => {
const prevBtn = document.getElementById("prev-week-btn");
const nextBtn = document.getElementById("next-week-btn");
if (prevBtn && nextBtn) {
prevBtn.addEventListener("click", () => {
if (currentWeek > 0) {
currentWeek--;
localStorage.setItem('selectedWeek', currentWeek);
renderWeek(currentWeek);
}
});
nextBtn.addEventListener("click", () => {
currentWeek++;
localStorage.setItem('selectedWeek', currentWeek);
renderWeek(currentWeek);
});
}
renderWeek(currentWeek);
});




// ==========================================
// НЕЗАВИСИМЫЙ МОДУЛЬ ДЛЯ КНОПОК КАЛЕНДАРЯ
// ==========================================

// 1. Функция обновления дат на верхних кнопках
function updateTopCalendar(weekDays) {
  // Короткие имена для кнопок
  const shortNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
  
  // Находим все твои кнопки дней на странице по их общему классу
  const topButtons = document.querySelectorAll(".days-down .days-down__day-card");
  const todayString = new Date().toDateString();

  // Перебираем кнопки и меняем в них текст
  topButtons.forEach((btn, index) => {
    if (weekDays[index]) {
      const dayData = weekDays[index];
      
      // Перезаписываем текст кнопки в твоем формате: ПН <span>Число</span>
      btn.innerHTML = `${shortNames[index]} <span>${dayData.dateNumber}</span>`;
      
      // Если этот день совпадает с сегодняшним на компьютере — подсвечиваем его
      if (dayData.fullDateString === todayString) {
        btn.classList.add("days-down__day-card_active");
      } else {
        btn.classList.remove("days-down__day-card_active");
      }
    }
  });
}


// 2. Обработчик кликов и плавного скролла
document.addEventListener("DOMContentLoaded", () => {
  const topCalendarContainer = document.querySelector(".days-down");
  
  if (topCalendarContainer) {
    topCalendarContainer.addEventListener("click", (event) => {
      // Ищем, был ли клик по карточке дня (или по span внутри неё)
      const targetBtn = event.target.closest(".days-down__day-card");
      
      if (targetBtn) {
        const dayNumber = targetBtn.getAttribute("data-day");
        
        // Находим в контейнере дневника соответствующий блок дня недели
        // Мы берем все сгенерированные блоки .schedule-week
        const dayBlocks = document.querySelectorAll("#journal-container .schedule-week");
        
        // Индексы в массиве идут от 0 до 5, поэтому вычитаем 1
        const targetBlock = dayBlocks[dayNumber - 1];
        
        if (targetBlock) {
          // Выполняем красивый плавный скролл к элементу
          targetBlock.scrollIntoView({
            behavior: "smooth", // Плавный скролл
            block: "start"      // Выравнивание по верхнему краю экрана
          });
          
          // Визуально подсвечиваем нажатую кнопку, убирая активный класс у остальных
          document.querySelectorAll(".days-down__day-card").forEach(b => {
            b.classList.remove("days-down__day-card_active");
          });
          targetBtn.classList.add("days-down__day-card_active");
        }
      }
    });
  }
});
