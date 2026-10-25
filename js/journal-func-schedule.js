// const weeklyTemplate = {
//   1: [ // Понедельник
//     { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 3, start: "09:40", end: "10:20", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 4, start: "10:35", end: "11:15", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", hw: "§ 14, № 345–349" },
//     { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", hw: "§ 14, № 345–349" },
//     { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", hw: "§ 14, № 345–349" }
//   ],
//   2: [ // Вторник
//     { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 3, start: "09:40", end: "10:20", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 4, start: "10:35", end: "11:15", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", hw: "§ 14, № 345–349" },
//     { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", hw: "§ 14, № 345–349" },
//     { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", hw: "§ 14, № 345–349" }
//   ],
//   3: [ // Среда
//     { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 3, start: "09:40", end: "10:20", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 4, start: "10:35", end: "11:15", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", hw: "§ 14, № 345–349" },
//     { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", hw: "§ 14, № 345–349" },
//     { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", hw: "§ 14, № 345–349" }
//   ],
//   4: [ // Четверг
//     { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 3, start: "09:40", end: "10:20", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 4, start: "10:35", end: "11:15", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", hw: "§ 14, № 345–349" },
//     { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", hw: "§ 14, № 345–349" },
//     { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", hw: "§ 14, № 345–349" }
//   ],
//   5: [ // Пятница
//     { num: 1, start: "8:00", end: "8:30", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 2, start: "08:45", end: "09:25", subject: "Алгебра", hw: "§ 14, № 345–349" },
//     { num: 3, start: "09:40", end: "10:20", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 4, start: "10:35", end: "11:15", subject: "История", hw: "§ 14, № 345–349" },
//     { num: 5, start: "11:30", end: "12:10", subject: "Физическая культура", hw: "§ 14, № 345–349" },
//     { num: 6, start: "12:30", end: "13:10", subject: "Курс практической грамотности", hw: "§ 14, № 345–349" },
//     { num: 7, start: "13:30", end: "14:10", subject: "Обществознание", hw: "§ 14, № 345–349" }
//   ],
//   6: [] // Суббота (0 уроков)
// };

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

// // Отдельный ключ в localStorage для вкладки Расписания, чтобы они не путали сохраненные недели с Дневником
// let savedWeek = localStorage.getItem('scheduleSelectedWeek');
// let currentWeek = savedWeek !== null ? parseInt(savedWeek, 10) : getRealCurrentWeekIndex();


const realWeekIndex = getRealCurrentWeekIndex();

let savedWeek = localStorage.getItem('scheduleSelectedWeek');
let lastRealWeek = localStorage.getItem('lastRealWeekIndex');

let currentWeek;

if (lastRealWeek !== null && parseInt(lastRealWeek, 10) !== realWeekIndex) {
  currentWeek = realWeekIndex;
  localStorage.setItem('selectedWeek', currentWeek);
  localStorage.setItem('lastRealWeekIndex', realWeekIndex);
} else {
  currentWeek = savedWeek !== null ? parseInt(savedWeek, 10) : realWeekIndex;
}

localStorage.setItem('lastRealWeekIndex', realWeekIndex);

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

const shortDayNames = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

function renderWeek(weekIndex) {
  const container = document.getElementById("journal-container");
  const weekTitle = document.getElementById("week-title");
  
  if (!container || !weekTitle) return; 
  
  const weekDays = getWeekDays(weekIndex);
  const firstDay = weekDays[0];
  const lastDay = weekDays[weekDays.length - 1];
  const displayedYear = lastDay.year; 
  
  // Обновляем верхний текстовый период
  weekTitle.textContent = `${firstDay.dateNumber} - ${lastDay.dateNumber} ${lastDay.monthNameGenitive} ${displayedYear}`;
  
  // Обновление верхних кнопок календаря
  const topButtons = document.querySelectorAll(".days-down .days-down__day-card");
  const todayString = new Date().toDateString();

  topButtons.forEach((btn, index) => {
    if (weekDays[index]) {
      const dayData = weekDays[index];
      btn.innerHTML = `${shortDayNames[index]} <span>${dayData.dateNumber}</span>`;
      
      if (dayData.fullDateString === todayString) {
        btn.classList.add("days-down__day-card_active");
      } else {
        btn.classList.remove("days-down__day-card_active");
      }
    }
  });

  container.innerHTML = "";
  
  weekDays.forEach(day => {
    const lessons = weeklyTemplate[day.dayIndex] || [];
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
              <!-- Оценки вырезаны -->
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
    
    const weekBlock = document.createElement("div");
    weekBlock.className = "schedule-week";
    
    weekBlock.innerHTML = `
      <div class="schedule-header">
        <div class="schedule-header__day">
          <h2 class="schedule-header__title">${day.name}</h2>
          <span class="schedule-header__sub-title">${day.dateString}.${day.monthString}</span>
        </div>
        <div class="schedule-header__info-day">
          <!-- Блоки оценок вырезаны -->
        </div>
      </div>
      <div class="schedule-block">
        ${lessonsHTML}
      </div>
    `;
    
    container.appendChild(weekBlock);
  });
}

// 4. Инициализация обработчиков (Переключение недель + Плавный скролл)
document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.getElementById("prev-week-btn");
  const nextBtn = document.getElementById("next-week-btn");
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentWeek > 0) {
        currentWeek--;
        localStorage.setItem('scheduleSelectedWeek', currentWeek);
        renderWeek(currentWeek);
      }
    });
    nextBtn.addEventListener("click", () => {
      currentWeek++;
      localStorage.setItem('scheduleSelectedWeek', currentWeek);
      renderWeek(currentWeek);
    });
  }

  const topCalendarContainer = document.querySelector(".days-down");
  if (topCalendarContainer) {
    topCalendarContainer.addEventListener("click", (event) => {
      const targetBtn = event.target.closest(".days-down__day-card");
      if (targetBtn) {
        const buttons = Array.from(document.querySelectorAll(".days-down .days-down__day-card"));
        const btnIndex = buttons.indexOf(targetBtn);
        
        const dayBlocks = document.querySelectorAll("#journal-container .schedule-week");
        const targetBlock = dayBlocks[btnIndex];
        
        if (targetBlock) {
          targetBlock.scrollIntoView({
          behavior: "smooth",
          block: "start"
          });
          buttons.forEach(b => b.classList.remove("days-down__day-card_active"));
          targetBtn.classList.add("days-down__day-card_active");
        }
      }
    });
  }
  renderWeek(currentWeek);
});