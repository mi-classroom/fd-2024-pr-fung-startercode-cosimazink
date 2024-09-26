const dynamicItems = () => {
    const url = "/works.json";

    const responsePromise = fetch(url);
    responsePromise.then(function (response) {
        const dataPromise = response.json();
        dataPromise.then(function (jsonData) {
            const container = document.querySelector('[data-js-finished-works]');
            const loadMoreBtn = document.querySelector('.loadMoreBtn');

            if (!container) {
                console.error('Das Container-Element "[data-js-finished-works]" wurde nicht gefunden.');
                return;
            }

            if (!loadMoreBtn) {
                console.error('Der Button mit Klasse "loadMoreBtn" wurde nicht gefunden.');
                return;
            }

            const createCardsHtml = (items) => {
                return items.map(item => {
                    const dateObj = new Date(item.date);
                    const month = dateObj.toLocaleString('de-DE', { month: 'long' });
                    const year = dateObj.getFullYear();

                    const imgSrc = item.image ? item.image : "default-image-path.jpg"; 

                    return `
                        <li>
                            <a href="/works/n-pola-can-i-cai.html">
                            <figure class="work-item">
                                <img src="${imgSrc}" alt="${item.title}">
                                <figcaption class="overview-text">
                                    <p class="title">${item.title}</p>
                                    <p class="info">${item.author}, ${item.type}, ${month} ${year}</p>
                                </figcaption>
                            </figure>
                            </a>
                        </li>
                    `;
                }).join("");
            };

            const initialItems = jsonData.slice(-4);
            const remainingItems = jsonData.length > 4 ? jsonData.slice(0, -4) : [];
            container.innerHTML = createCardsHtml(initialItems);

            if (remainingItems.length > 0) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.addEventListener('click', () => {
                    container.innerHTML += createCardsHtml(remainingItems);
                    loadMoreBtn.style.display = 'none';
                });
            } else {
                loadMoreBtn.style.display = 'none';
            }
        }).catch(function (error) {
            console.error('Fehler beim Verarbeiten der JSON-Daten:', error);
        });
    }).catch(function (error) {
        console.error('Fehler beim Abrufen der JSON-Daten:', error);
    });
};

export { dynamicItems };