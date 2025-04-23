// Mock API URL
const API_URLS = {
    news: 'https://run.mocky.io/v3/2ed62d35-0560-4b84-9ec6-3f2e7bac9e8d',
    currency: 'https://run.mocky.io/v3/c153d11c-2a49-42d7-bc16-37e38749e504',
    weather: 'https://run.mocky.io/v3/d111fd36-c72d-4ab5-8862-f64577fa8af5'
};

document.addEventListener('DOMContentLoaded', function() {
    loadCurrencyData();
    loadNewsData();
    loadWeatherData();
});


// Döviz 
async function loadCurrencyData() {
    try {
        const response = await fetch(API_URLS.currency);
        const data = await response.json();
        
        const container = document.getElementById('currencyData');
        container.innerHTML = '';
        
        data.currencies.forEach(currency => {
            const changeClass = currency.change >= 0 ? 'up' : 'down';
            const arrow = currency.change >= 0 ? '▲' : '▼';
            
            const item = document.createElement('div');
            item.className = 'currency-item';
            item.innerHTML = `
                <span class="name">${currency.name}</span>
                <span class="value">${currency.value}</span>
                <span class="change ${changeClass}">
                    ${currency.change > 0 ? '+' : ''}${currency.change}% ${arrow}
                </span>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Veri yüklenirken hata:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadCurrencyData);

// Haber
async function loadNewsData() {
    try {
        const response = await fetch(API_URLS.news);
        const data = await response.json();
        
        // Slider 
        const carouselInner = document.getElementById('carouselInner');
        carouselInner.innerHTML = '';
        
        data.news.slice(0, 10).forEach((news, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            carouselItem.innerHTML = `
                <img src="${news.image}" class="d-block w-100" alt="${news.title}">
                <div class="carousel-caption">
                    <h5>${news.title}</h5>
                    <p>${news.description}</p>
                </div>
            `;
            carouselInner.appendChild(carouselItem);
        });
        
        // Ana haberler
        const mainNewsContainer = document.getElementById('mainNews');
        mainNewsContainer.innerHTML = '';
        
        data.news.slice(10, 16).forEach(news => {
            const newsCol = document.createElement('div');
            newsCol.className = 'col-md-6 mb-4';
            newsCol.innerHTML = `
                <div class="card h-100">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}">
                    <div class="card-body">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.description}</p>
                        <a href="#" class="btn btn-primary">Devamını Oku</a>
                    </div>
                </div>
            `;
            mainNewsContainer.appendChild(newsCol);
        });
    } catch (error) {
        console.error('Haber verileri yüklenirken hata:', error);
    }
}


// Hava
async function loadWeatherData() {
    try {
      const response = await fetch(API_URLS.weather);
      const data = await response.json();
  
      const iconMap = {
        sunny: "https://cdn-icons-png.flaticon.com/512/1163/1163661.png",
        cloudy: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
        rainy: "https://cdn-icons-png.flaticon.com/512/1163/1163657.png",
        snowy: "https://cdn-icons-png.flaticon.com/512/1163/1163633.png",
        stormy: "https://cdn-icons-png.flaticon.com/512/1163/1163636.png"
      };
  
      
      const currentDay = data.forecast[0];
      const currentContainer = document.getElementById("currentWeather");
      const currentIcon = iconMap[currentDay.condition.toLowerCase()] || "";
      currentContainer.innerHTML = `
        <h5>İzmir</h5>
        <img src="${currentIcon}" alt="${currentDay.condition}" width="45">
        <div><strong>${currentDay.temp}°C</strong> - ${currentDay.condition}</div>`;
  
      //  5 günlük hava durumu
      const weatherContainer = document.getElementById("weatherData");
      weatherContainer.innerHTML = "";
  
      data.forecast.forEach(day => {
        const icon = iconMap[day.condition.toLowerCase()] || "";
        const card = document.createElement("div");
        card.className = "weather-day";
        card.innerHTML = `
          <div class="fw-bold">${day.day}</div>
          <img src="${icon}" alt="${day.condition}">
          <div>${day.temp}°C</div>
          <small>${day.condition}</small>`;
        weatherContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Hava durumu verisi alınamadı:", error);
    }
  }
  


// Reklam
function closeAd(side) {
    document.querySelector(`.${side}-ad`).style.display = 'none';
}
 


// Tek Haber

const API_URL = "https://run.mocky.io/v3/837b85a2-da91-40e2-9fb2-81bd7309bb12";
async function getKucukHaber() {
    try {
        const response = await fetch(API_URL);
        const haber = await response.json();
        
        const container = document.getElementById("kucuk-haber-container");
        container.innerHTML = `
            <div class="kucuk-haber">
            <img src="${haber.image}" class="card-img-top" alt="${haber.title}">
                    <div class="card-body">
                        <h5 class="card-title">${haber.title}</h5>
                        <p class="card-text">${haber.body}</p>
                        
                    </div>
                
            </div>
        `;
    } catch (error) {
        console.error("Haber çekilemedi:", error);
        document.getElementById("kucuk-haber-container").innerHTML = `
            <div class="kucuk-haber">
                <p>Haber yüklenirken bir hata oluştu.</p>
            </div>
        `;
    }
}
document.addEventListener("DOMContentLoaded", getKucukHaber);