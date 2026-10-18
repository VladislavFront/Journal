// Собираем элементы в массивы в одинаковом порядке
const cards = [
  document.getElementById('role-parents'),
  document.getElementById('role-student'),
  document.getElementById('role-teacher')
];

const forms = [
  document.getElementById('form-parents'),
  document.getElementById('form-student'),
  document.getElementById('form-teacher')
];

const roleCardsContainer = document.getElementById('role-card-container');

// Навешиваем обработчик в цикле
cards.forEach((card, index) => {
  card.addEventListener('click', () => {
    // 1. Сначала у всех снимаем активные классы
    // cards.forEach(currentCard => currentCard.classList.remove('role-card_active'));
    forms.forEach(currentForm => currentForm.classList.remove('form_active'));

    // 2. Включаем только у того, по кому кликнули (по индексу)
    // card.classList.add('role-card_active');
    forms[index].classList.add('form_active');
    
    roleCardsContainer.classList.add('role-card-container_disable');
  });
});















// const cardParents = document.getElementById('role-parents')
// const cardStudent = document.getElementById('role-student')
// const cardTeacher = document.getElementById('role-teacher')

// const roleCardsContainer = document.getElementById('role-card-container')

// const formParents = document.getElementById('form-parents')
// const formStudent = document.getElementById('form-student')
// const formTeacher = document.getElementById('form-teacher')

// cardParents.addEventListener('click', () => {
//   cardParents.classList.add('role-card_active')
//   formParents.classList.add('form_active')
//   roleCardsContainer.classList.add('role-card-container_disable')

//   cardStudent.classList.remove('role-card_active')
//   cardTeacher.classList.remove('role-card_active')

//   formStudent.classList.remove('form_active')
//   formTeacher.classList.remove('form_active')
// })

// cardStudent.addEventListener('click', () => {
//   cardStudent.classList.add('role-card_active')
//   formStudent.classList.add('form_active')
//   roleCardsContainer.classList.add('role-card-container_disable')

//   cardParents.classList.remove('role-card_active')
//   cardTeacher.classList.remove('role-card_active')

//   formParents.classList.remove('form_active')
//   formTeacher.classList.remove('form_active')
// })

// cardTeacher.addEventListener('click', () => {
//   cardTeacher.classList.add('role-card_active')
//   formTeacher.classList.add('form_active')
//   roleCardsContainer.classList.add('role-card-container_disable')

//   cardParents.classList.remove('role-card_active')
//   cardStudent.classList.remove('role-card_active')

//   formParents.classList.remove('form_active')
//   formStudent.classList.remove('form_active')
// })