const dynamicItems = () => {
    const url = "/works.json";

    const responsePromise = fetch(url);
    responsePromise.then(function (response) {
        const dataPromise = response.json();
        dataPromise.then(function (jsonData) {
            const container = document.querySelector('[data-js-finished-works]');
            const loadMoreBtn = document.querySelector('.loadMoreBtn');

            // Prüfen, ob Container existiert
            if (!container) {
                console.error('Das Container-Element "[data-js-finished-works]" wurde nicht gefunden.');
                return;
            }

            // Prüfen, ob Button existiert
            if (!loadMoreBtn) {
                console.error('Der Button mit Klasse "loadMoreBtn" wurde nicht gefunden.');
                return;
            }

            // Function to create cards HTML
            const createCardsHtml = (items) => {
                return items.map(item => {
                    const dateObj = new Date(item.date);
                    const month = dateObj.toLocaleString('de-DE', { month: 'long' });
                    const year = dateObj.getFullYear();

                    const imgSrc = item.image ? item.image : "default-image-path.jpg"; // Use default placeholder if no image

                    return `
                        <li>
                            <figure class="work-item">
                                <img src="${imgSrc}" alt="${item.title}">
                                <figcaption class="overview-text">
                                    <p class="title">${item.title}</p>
                                    <p class="info">${item.author}, ${item.type}, ${month} ${year}</p>
                                </figcaption>
                            </figure>
                        </li>
                    `;
                }).join("");
            };

            // Slice the last 4 items for initial display
            const initialItems = jsonData.slice(-4);
            
            // Remaining items
            const remainingItems = jsonData.length > 4 ? jsonData.slice(0, -4) : [];

            // Display initial cards
            container.innerHTML = createCardsHtml(initialItems);

            // Display the button only if there are more than 4 items
            if (remainingItems.length > 0) {
                loadMoreBtn.style.display = 'block';
                loadMoreBtn.addEventListener('click', () => {
                    container.innerHTML += createCardsHtml(remainingItems);
                    loadMoreBtn.style.display = 'none'; // Hide the button after loading more items
                });
            } else {
                loadMoreBtn.style.display = 'none'; // If no remaining items, hide the button
            }
        }).catch(function (error) {
            console.error('Fehler beim Verarbeiten der JSON-Daten:', error);
        });
    }).catch(function (error) {
        console.error('Fehler beim Abrufen der JSON-Daten:', error);
    });
};

export { dynamicItems };