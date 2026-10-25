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