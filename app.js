// Data de destino: 27 de Junho de 2026 as 11:00
const targetDate = new Date('2026-06-27T11:00:00').getTime();

// Funcao de atualizacao do cronometro regressivo
function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        
        const heading = document.querySelector('#countdown-container h2');
        if (heading) {
            heading.innerText = 'Ja comecou. Se voce nao chegou ainda, ja esta atrasado.';
        }
        return;
    }

    // Calculos de tempo
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Atualizacao dos valores no DOM
    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Inicializa a contagem regressiva e atualiza a cada segundo
updateCountdown();
setInterval(updateCountdown, 1000);

// Coordenadas aproximadas para Av. Dr. Altino Arantes, 477 - Vila Clementino, Sao Paulo - SP
const latitude = -23.598687;
const longitude = -46.641926;

// Inicializacao do Mapa Leaflet.js
function initMap() {
    // Cria o mapa e o direciona para a coordenada especificada
    const map = L.map('map', {
        center: [latitude, longitude],
        zoom: 16,
        scrollWheelZoom: false // desabilita zoom com scroll do mouse por usabilidade
    });

    // Adiciona camada de mapa do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Marcador estilizado customizado
    const marker = L.marker([latitude, longitude]).addTo(map);

    // Conteudo do popup do marcador com tom informal de amizade
    marker.bindPopup(`
        <div style="font-family: 'Outfit', sans-serif; color: #111;">
            <strong style="font-size: 1.1em; color: #ff6b6b;">Festa do Bernardo</strong><br>
            Apto. 31 - Toque o interfone e espere com paciencia.<br>
            <span style="font-size: 0.9em; color: #666;">Traga sua bebida ou ficara na agua.</span>
        </div>
    `).openPopup();
}

// Interacao do Easter Egg do Castor de Canto
function setupEasterEgg() {
    const beaverBadge = document.getElementById('beaver-corner');

    if (beaverBadge) {
        // Evento de clique para mobile e cliques alternativos no desktop
        beaverBadge.addEventListener('click', function(e) {
            e.stopPropagation();
            beaverBadge.classList.toggle('active');
        });

        // Remove a ativacao ao clicar fora
        document.addEventListener('click', function() {
            beaverBadge.classList.remove('active');
        });
    }
}

// Inicializa todas as funcoes quando a janela carregar
window.onload = function() {
    initMap();
    setupEasterEgg();
};
