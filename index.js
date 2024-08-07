 

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









const bigNumElements = document.querySelectorAll('.big-num');

bigNumElements.forEach((element) => {
  const num = parseFloat(element.textContent);
  const formattedNum = formatNumber(num);
  element.textContent = formattedNum;
});

function formatNumber(num) {
  if (num % 1 === 0) {
    return num.toLocaleString('en-US', { useGrouping: true });
  } else {
    return num.toLocaleString('en-US', { useGrouping: true, minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
}



const ValCircle = document.querySelector('.convert');
let isMovingRight = true;

let originalTotDep = parseFloat(document.querySelector('#tot-dep').textContent);
let originalWeekDep = parseFloat(document.querySelector('#week-dep').textContent);
let originalProfitAmount = parseFloat(document.querySelector('.profit-amount').textContent);


let TotDep = document.querySelector('#tot-dep');
let WeekDep = document.querySelector('#week-dep');
let ProfitAmount = document.querySelector('.profit-amount');

ProfitAmount.textContent = formatNumber(parseFloat(ProfitAmount.textContent));
TotDep.textContent = formatNumber(parseFloat(TotDep.textContent));
WeekDep.textContent = formatNumber(parseFloat(WeekDep.textContent));

ProfitAmount.classList.add('profit-amount-rub'); 
let exchangeRate = 86


ValCircle.addEventListener('click', () => {
  if (isMovingRight) {
    anime({
      targets: '.val-circle',
      translateX: '30px',
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.currentTime;

        let ProfitAmountResult = formatNumber(originalProfitAmount / exchangeRate);
        let TotDepResult = formatNumber(originalTotDep / exchangeRate);
        let WeekDepResult = formatNumber(originalWeekDep / exchangeRate);

        if (progress < 250)
          {
          ProfitAmount.style.opacity = 1 - (progress / 250);
          TotDep.style.opacity = 1 - (progress / 250);
          WeekDep.style.opacity = 1 - (progress / 250);
        } 
        else {
          ProfitAmount.style.opacity = (progress - 250) / 250;
          TotDep.style.opacity = (progress - 250) / 250;
          WeekDep.style.opacity = (progress - 250) / 250;
          ProfitAmount.textContent = ProfitAmountResult;
          TotDep.textContent = TotDepResult;
          WeekDep.textContent = WeekDepResult;
          }

        if (progress >= 250) 
          {
          document.getElementById('rub').style.display = 'none';
          document.getElementById('dol').style.display = 'block';
          ProfitAmount.classList.remove('profit-amount-rub');
          ProfitAmount.classList.add('profit-amount-usd');
          } 

      },
      complete: () => {
        document.getElementById('dol').style.display = 'block';
        document.getElementById('rub').style.display = 'none';
        isMovingRight = false;
      }
    });
  } else {
    anime({
      targets: '.val-circle',
      translateX: '0',
      duration: 500,
      easing: 'easeInOutExpo',
      update: (anim) => {
        const progress = anim.currentTime;

        let TotDepNumber = formatNumber(originalTotDep);
        let WeekDepNumber = formatNumber(originalWeekDep);
        let ProfitAmountNumber = formatNumber(originalProfitAmount);

        if (!isMovingRight && progress < 250)
          {
          ProfitAmount.style.opacity = 1 - (progress / 250);
          TotDep.style.opacity = 1 - (progress / 250);
          WeekDep.style.opacity = 1 - (progress / 250);
          } 
        else
          {
          ProfitAmount.style.opacity = (progress - 250) / 250;
          TotDep.style.opacity = (progress - 250) / 250;
          WeekDep.style.opacity = (progress - 250) / 250;
          TotDep.textContent = TotDepNumber;
          WeekDep.textContent = WeekDepNumber;
          ProfitAmount.textContent = ProfitAmountNumber;
          }

        if (!isMovingRight && progress >= 250) {
          document.getElementById('dol').style.display = 'none';
          document.getElementById('rub').style.display = 'block';
          ProfitAmount.classList.remove('profit-amount-usd');
          ProfitAmount.classList.add('profit-amount-rub');
        } 
      },
      complete: () => {
        document.getElementById('rub').style.display = 'block';
        document.getElementById('dol').style.display = 'none';
        isMovingRight = true;
      }
    });

  }
});

const userName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
 // document.querySelector('.nickname').textContent = userName; 
  
  const userAvatar = window.Telegram.WebApp.initDataUnsafe.user.photo_url;
 // document.querySelector('.circle-image').src = userAvatar; 
  
  const tgId = window.Telegram.WebApp.initDataUnsafe.user.id;
  

  fetch('https://f09f-89-22-177-227.ngrok-free.app/receive_tg_id', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: tgId })
  })

  .then(response => {
    if (!response.ok) {
      throw new Error('Сетевая ошибка при обращении к серверу');
    }
    return response.json();
  })
  .then(userData => {

    document.querySelector('#tot-dep').textContent = userData.deposit;
    document.querySelector('.profit-amount').textContent = userData.windeposit;
    document.querySelector('#tot-trades').textContent = userData.trades;
    document.querySelector('#week-dep').textContent = userData.deposit//доделать потом
    document.querySelector('#week-trade').textContent = userData.trades;//доделать потом
  })
  .catch((error) => {
    console.error('Ошибка:', error);
  });
