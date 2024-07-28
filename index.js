window.onload = function() {
  window.Telegram.WebApp.expand();
};

const MovCircle = document.querySelector('.black-circle');
const upgradeText = document.getElementById('upgrade'); // Получаем элемент с надписью
let hasMoved = false; 

MovCircle.addEventListener('click', () => {
  if (!hasMoved) { 
    hasMoved = true;

    let clipProgress = 0; // Переменная для отслеживания прогресса обрезки
    let clipDelay = 150; // Задержка обрезки в мс

    anime({
      targets: '.black-circle',
      translateX: -66,
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.progress;

        if (progress > 50) {
          document.getElementById('people').style.display = 'none';
          document.getElementById('share').style.display = 'block';
        }

        // Анимация скрытия текста "UPGRADE"
        // Задержка обрезки:
        if (progress >= (clipDelay / 500) * 100) { // Начинаем обрезку, когда прогресс анимации достигает 50 мс
          clipProgress = progress - (clipDelay / 500) * 100; // Вычисляем прогресс обрезки
          upgradeText.style.clipPath = `inset(0 ${clipProgress * 3.9}% 0 0)`; // Обрезаем текст справа налево
        }

        
        upgradeText.style.opacity = 1 - (progress / 500); // Устанавливаем прозрачность текста от 1 (полная непрозрачность) до 0 (полная прозрачность)
      },
      complete: () => {
        // Убедиться, что правый икон останется виден
        document.getElementById('share').style.display = 'block';
        document.getElementById('people').style.display = 'none';
      }
    });
  }
});




const originalProfitAmount = parseFloat(document.querySelector('.profit-amount').textContent);
const ValCircle = document.querySelector('.val-circle');
let isMovingRight = true;

ValCircle.addEventListener('click', () => {

  if (isMovingRight) { 
    anime({
      targets: '.val-circle',
      translateX: '30px',
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.progress;
        // Изменяем видимость только при движении вправо
        if (progress > 50) {
          document.getElementById('rub').style.display = 'none';
          document.getElementById('dol').style.display = 'block';
        } 
      },
      complete: () => {
        // Убедиться, что правый икон останется виден
        document.getElementById('dol').style.display = 'block';
        document.getElementById('rub').style.display = 'none';
        isMovingRight = false;
        const result = (originalProfitAmount / 85).toFixed(2);
        const numberElement = document.querySelector('.profit-amount');
        const number = parseFloat(result);
        let formattedNumber;
        if (Number.isInteger(number)) {
          formattedNumber = number.toLocaleString('en-US', {
            useGrouping: true
          });
        } else {
          formattedNumber = number.toLocaleString('en-US', {
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
        numberElement.textContent = formattedNumber;
      }
    });
  } else { 
    anime({
      targets: '.val-circle',
      translateX: '0', // Возвращаем в исходное положение
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.progress;
        // Изменяем видимость только при движении влево
        if (!isMovingRight && progress > 50) {
          document.getElementById('dol').style.display = 'none';
          document.getElementById('rub').style.display = 'block';
        } 
      },
      complete: () => {
        // Убедиться, что левый икон останется виден
        document.getElementById('rub').style.display = 'block';
        document.getElementById('dol').style.display = 'none';
        isMovingRight = true;
        const numberElement = document.querySelector('.profit-amount');
        const number = originalProfitAmount;
        let formattedNumber;
        if (Number.isInteger(number)) {
          formattedNumber = number.toLocaleString('en-US', {
            useGrouping: true
          });
        } else {
          formattedNumber = number.toLocaleString('en-US', {
            useGrouping: true,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          });
        }
        numberElement.textContent = formattedNumber;
      }
    });
  }
});
