const base_url = "https://api.jikan.moe/v3";
const genre = "https://api.jikan.moe/v3/genre/type/genre_id/page";

function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    //console.log(query);

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res => res.json())
    .then(updateDom)
    .catch(err => console.warn(err.message));
}

function updateDom(data){

    const searchResults = document.getElementById('search-results');

    const animeByCategories = data.results
        .reduce((acc, anime) => {
            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;
        },{});

        searchResults.innerHTML = Object.keys(animeByCategories).map(key => {
            
            const animesHTML = animeByCategories[key]
            .sort((a,b) => a.episodes-b.episodes)
            .map(anime => {
            return `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card h-100">
                    <a href="${anime.url}">
                    <img class="card-img-top" src="${anime.image_url}">
                    </a>
                    <div class="card-body">
                        <h4 class="card-title">
                        <a href="${anime.url}">${anime.title}</a>
                        </h4>
                        <p class="card-text">${anime.synopsis}</p>
                    </div>
                    <div class="card-footer">
                        <a href="${anime.url}" class="card-link">Find out more</a>
                    </div>
                </div>
            </div>
            <ul class="pagination">
            </ul>
            `
        }).join("");
            
            return `
            <section>
                <h3>${key.toUpperCase()}</h3>
                <div class="row">${animesHTML}</div> 
            </section>

            <div>
                <ul class="pagination">
                    <li class="page-item disabled">
                    <a class="page-link" href="#">&laquo;</a>
                    </li>
                    <li class="page-item active">
                    <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" href="#">4</a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" href="#">5</a>
                    </li>
                    <li class="page-item">
                    <a class="page-link" href="#">&raquo;</a>
                    </li>
                </ul>
            </div>
            `
        }).join("");
        
}
function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}

window.addEventListener('load', pageLoaded);