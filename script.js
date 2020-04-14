const randUrl = "https://official-joke-api.appspot.com/random_ten"
var favourites = []
const getTenRandomJokes = async() =>{
	let res =   await fetch(randUrl)
	let data = await res.json();
	return data;
}

const randomJokes = async () =>{
// APPEND LOADER ELEMENT TO DOM
var loader = document.createElement("div")
loader.className = "lds-dual-ring  justify-content-center"
document.getElementById("randomJokes").appendChild(loader)

// Displaying random jokes
let show = await getTenRandomJokes()
let randomJokes = '<h4 class="text-center">Random Jokes<h4>'

	show.forEach(element =>{
	randomJokes += `
		<ul id="x" class="list-group mb-3">
			<li id="randomJokeList" class="list-group-item">
			<button id="favButton"><img class="fav" src="./assets/plus.png" alt="addFav" width="30px" height="30px"></button>
				${element.setup}
				<hr>
				${element.punchline}<br>
			</li>
		</ul>
		`;
	});
document.getElementById('randomJokes').innerHTML = randomJokes
document.getElementById('tenJokes').innerHTML = "refresh random Jokes"
document.getElementById('favButton').addEventListener('click', addFavourites)
}

const addFavourites = (e) =>{
const favButton = document.querySelectorAll('.fav')

	if(favButton){
		favButton.forEach(element =>{
			element.addEventListener('click', e =>{
			favourites.push(e.srcElement.offsetParent.innerText)
			localStorage.setItem('favourites',favourites)
			})
		})
	}
}

const getFavourites = () =>{
	 document.getElementById('randomJokes').style.display = 'block'
	const fav= favourites 
	var displayFavourites = '<h3> Your Favourite Jokes </h3>'
	if(fav.length!=0){	
	fav.forEach(element =>{
	let x = element.split('\n')
	displayFavourites += `
		<ul class="list-group mb-3">
			<li class="list-group-item">
				${x[0]}<br>
				<hr>
				${x[1]}
			</li>
		</ul>
		`;
	});
		console.log('12')
	document.getElementById('displayFavourites').innerHTML = displayFavourites 
	//window.location.hash = "displayFavourites";
	}else{

		document.getElementById('displayFavourites').innerHTML = 
			'<h3>Your Favourite Jokes</h3><br>\
			<div id="noFavFound" class="alert alert-danger" role="alert">\
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">\
					<span aria-hidden="true">&times;</span>\
				</button>\
				<h3>Sorry ! your favourites is empty</h3>\
			</div>'

 document.getElementById('randomJokes').style.display = 'none'
		//window.location.hash = "#noFavFound"
	}
}

//EVENT LINSTENERS
document.getElementById('tenJokes').addEventListener('click', randomJokes);
document.getElementById('favourites').addEventListener('click',getFavourites);
document.onload=randomJokes()
//document.getElementById('let').innerHTML ="js"

document.querySelectorAll("#tenJokes, #favourites").onclick = function() {
  document.querySelectorAll("#randomJokes, #displayFavourites").forEach(function(el) {
    el.style.display = "none";
	console.log("dis")
  });
  if (this.id === "tenJokes") {
    document.querySelector("#randomJokes").style.display = "block";
  } else {
    document.querySelector("#displayFavourites").style.display = "block";
  }
}
