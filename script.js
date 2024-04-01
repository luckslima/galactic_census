let list = document.getElementById('list')

async function showPlanets() {
    // Limpa a lista existente antes de adicionar novos itens
    list.innerHTML = '';

    // Tenta limpar os resultados da pesquisa antes de exibir todos os planetas
    let searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = '';
    }

    let req = await fetch('https://swapi.dev/api/planets');
    let { results } = await req.json();

    console.log(results)

    results.forEach(planet => {
        let li = document.createElement('li');

        let planetData = encodeURIComponent(JSON.stringify({
            name: planet.name,
            climate: planet.climate,
            population: planet.population,
            terrain: planet.terrain
        }));

        li.innerHTML = `<div>
                            <button onclick="describePlanet(this.nextElementSibling, '${planetData}')" > <h4> ${planet.name} </h4> </button>
                            <div class="planet-info"></div>                           
                        </div>`;
        list.appendChild(li);
    });
}


function describePlanet(element, data) {
    let planet = JSON.parse(decodeURIComponent(data));
    let planetInfo = `
        <ul>
            <li>População: ${planet.population}</li>
            <li>Clima: ${planet.climate}</li>
            <li>Relevo: ${planet.terrain}</li>
        </ul>
    `;
    // Exibindo as informações no <div> abaixo do botão
    element.innerHTML = planetInfo;
}

async function searchPlanets() {
    let searchQuery = document.getElementById('searchInput').value.toLowerCase();
    let req = await fetch('https://swapi.dev/api/planets');
    let { results } = await req.json();

    // Limpa os resultados anteriores da busca e a lista de planetas
    let list = document.getElementById('list');
    list.innerHTML = ''; // Limpa a lista de botões dos planetas

    let searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.id = 'searchResults';
        document.body.appendChild(searchResults);
    } else {
        searchResults.innerHTML = ''; // Limpa os resultados da busca anterior
    }

    // Filtra os planetas pelo nome e exibe os resultados
    let foundPlanets = results.filter(planet => planet.name.toLowerCase().includes(searchQuery));
    if (foundPlanets.length > 0) {
        foundPlanets.forEach(planet => {
            let planetData = `
                <div>
                    <h4>${planet.name}</h4>
                    <ul>
                        <li>População: ${planet.population}</li>
                        <li>Clima: ${planet.climate}</li>
                        <li>Relevo: ${planet.terrain}</li>
                    </ul>
                </div>
            `;
            searchResults.innerHTML += planetData;
        });
    } else {
        searchResults.innerHTML = '<p>Nenhum planeta encontrado.</p>';
    }
}



