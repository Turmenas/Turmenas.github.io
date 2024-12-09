//Darkmode toggle

let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-toggle');

const enableDarkmode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
};

const disableDarkmode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
};

if(darkmode === 'active') enableDarkmode()

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode'); // Update the value of darkmode
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});

//Scroll to top

const scrollToggle = document.getElementById('scroll-toggle');

scrollToggle.addEventListener("click", () => {
    window.scrollTo(0, 0)
});

//Clock

function updateClock() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);

updateClock();

//Contact form

document.getElementById('submit-btn').addEventListener('click', () => {
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
  
    const question1 = parseInt(document.getElementById('question1').value, 10);
    const question2 = parseInt(document.getElementById('question2').value, 10);
    const question3 = parseInt(document.getElementById('question3').value, 10);
    const question4 = parseInt(document.getElementById('question4').value, 10);
    const question5 = parseInt(document.getElementById('question5').value, 10);
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Įveskite teisingą el. pašto adresą!');
      return;
    }
  
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      alert('Įveskite teisingą telefono numerį (11 skaičių)!');
      return;
    }
  
    if (address === '') {
      alert('Adresas negali būti tuščias!');
      return;
    }
  
    const ratingsArray = [question1, question2, question3, question4, question5];
    for (let i = 0; i < ratingsArray.length; i++) {
      if (ratingsArray[i] < 1 || ratingsArray[i] > 10 || isNaN(ratingsArray[i])) {
        alert(`Įvertinimas ${i + 1}-am klausimui turi būti skaičius nuo 1 iki 10!`);
        return;
      }
    }
  
    const fullAddress = address.replace(/\s+/g, ' ');
  
    const userData = {
      firstName,
      lastName,
      email,
      phone,
      address: fullAddress,
      ratings: {
        question1,
        question2,
        question3,
        question4,
        question5
      }
    };
  
    const averageRating = ratingsArray.reduce((sum, value) => sum + value, 0) / ratingsArray.length;
  
    console.log(userData);
  
    let color = '';
    if (averageRating >= 0 && averageRating <= 4) {
      color = 'red';
    } else if (averageRating > 4 && averageRating <= 7) {
      color = 'orange';
    } else {
      color = 'green';
    }
  
    const resultDiv = document.getElementById('result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${fullAddress}</p>
      <p><strong>Website Design Satisfaction:</strong> ${question1}</p>
      <p><strong>Navigation Ease:</strong> ${question2}</p>
      <p><strong>Content Helpfulness:</strong> ${question3}</p>
      <p><strong>Recommendation Likelihood:</strong> ${question4}</p>
      <p><strong>Responsiveness:</strong> ${question5}</p>
      <p><strong>Average Rating:</strong> <span style="color: ${color};">${averageRating.toFixed(2)}</span></p>
      <p><strong>${firstName} ${lastName} (${email}):</strong> <span style="color: ${color};">${averageRating.toFixed(2)}</span></p>
    `;
  });