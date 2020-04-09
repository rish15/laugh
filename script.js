// event Listeners
document.getElementById('tenJokes').addEventListener('click', getTenRandomJokes)
document.getElementById('favourites').addEventListener('click',getFavourites)
function getTenRandomJokes() {
//create Elements
var loader = document.createElement("div")
loader.className = "lds-dual-ring"

document.getElementById("randomJokes").appendChild(loader)

fetch("https://official-joke-api.appspot.com/random_ten")
	.then(res => {
		return res.json()
	})
	.then(data =>{
		let randomJokes = '<h4>Random Jokes<h4>'
		document.getElementById("randomJokes").appendChild(loader)

		data.forEach(element =>{
		randomJokes += `
				<ul class="list-group mb-3">
					<li id="randomJokeList" class="list-group-item">
					<button class="fav">fav</button>
						Category : ${element.type}<br>
						setup: ${element.setup}<br>
						punchline: ${element.punchline}<br>
					</li>
				</ul>
			`;
		});

	document.getElementById('randomJokes').innerHTML = randomJokes
	document.getElementById('tenJokes').innerHTML = "refresh"
	const favButton = document.querySelectorAll('.fav')
	var favourites = []
	if(favButton){
		 favButton.forEach(function(el){
			 el.addEventListener('click', function (e) {
			 favourites.push(e.target.parentNode.innerText);
			 showFav(favourites)
     		});
  		});	
	}
})
}

function getFavourites(e){
	function showFav(fav){
		console.log(fav)
	}
} 
