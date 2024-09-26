const dynamicItems = () => {
    const url = "http://0.0.0.0:4000/works.json";
    
    const responsePromise = fetch(url);
    responsePromise.then(function (response) {
        const dataPromise = response.json();
        dataPromise.then(function (jsonData) {
            const container = document.querySelector('[data-js-finished-works]');
            const cards = jsonData.map(item => {
                const dateObj = new Date(item.date);
                const month = dateObj.toLocaleString('de-DE', { month: 'long' });
                const year = dateObj.getFullYear();
                
                const imgSrc = item.image ? item.image : "default-image-path.jpg"; // If no image, use default placeholder
                
                return `
                    <li>
                        <figure class="work-card">
                            <img src="${imgSrc}" alt="${item.title}">
                            <figcaption>
                                <h3>${item.title}</h3>
                                <address>${item.author}</address>
                                <p><strong>Typ:</strong> ${item.type}</p>
                                <p><strong>Datum:</strong> ${month} ${year}</p>
                            </figcaption>
                        </figure>
                    </li>
                `;
            }).join("");
            
            container.innerHTML = cards;
        }).catch(function (error) {
            console.error('Fehler beim Verarbeiten der JSON-Daten:', error);
        });
    }).catch(function (error) {
        console.error('Fehler beim Abrufen der JSON-Daten:', error);
    });
};

export { dynamicItems };