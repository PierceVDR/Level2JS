const catImgs = ["/Cats/Envy.png","/Cats/Famine.png","/Cats/Fraud.png","/Cats/Gluttony.png","/Cats/Greed.png","/Cats/Judgement.png","/Cats/Violence.png","/Cats/War.png"];
const backOfCard = "/BackofCard.jpeg";
let firstClick = "";
let secondClick = "";
let clicks = 0;
let tiles=[];
let imgs=[];
let lastPairWasMatch=true; // this is the default setting because it tells the hideLastTwoImages() function to NOT try and hide the previous pair of images when you're selecting the first image

function initialize() {
	countSpan = document.getElementById("clicks");
	resetBtn = document.getElementById("reset");
  resetBtn.addEventListener("click", setupBoard);
	grid = document.getElementById("grid");

	setupBoard();
}

function setupBoard() {
	grid.innerHTML="";
  clicks = 0;
	firstClick="";
	secondClick="";
	lastPairWasMatch=true;
	updateClicks();

	spots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
	tiles = [];
	imgs = [];
	revealed = [];


	for (i = 0; i < 16; i++) {
		let tile = document.createElement("button");

    tile.addEventListener("click", clickImg);

		let spotIdx = Math.floor(Math.random()*spots.length);
		let positionSpot = spots[spotIdx];
		spots.splice(spotIdx,1);

		tile.id = positionSpot;
		grid.appendChild(tile);


		let path = catImgs[ i % catImgs.length ]; // the % ensures each image is chosen twice

		let imgElement = document.createElement("img");
		imgElement.classList.add("img");
		tiles[positionSpot] = imgElement;

    
		imgs[positionSpot] = path;
		revealImg(positionSpot,false); // Usually this function is used to reveal/hide cards, but it can also help set it up

		setCoords(tile, positionSpot);
		tile.appendChild(imgElement);
	}


}

function revealImg(id,reveal) {
	imgElement = tiles[id];
	
	revealed[id] = reveal;
	
	if (reveal) {
		imgElement.src = imgs[id];
	} else {
		imgElement.src = backOfCard;
	}
}

function setCoords(tile, positionSpot) {
	let row = Math.floor( (positionSpot-1) / 4); // 4 Rows
	let col = positionSpot % 4; // 4 Columns

	tile.style.gridRow = row + 1;
	tile.style.gridCol = (col-1) % 4;
}

function updateClicks() {
	countSpan.innerHTML = clicks;
}

function clickImg(event) {
  
  const imgElement = event.target;
	const tile = imgElement.parentElement
	const id = tile.id

	console.log(imgElement.src);
	console.log(backOfCard);
	if (revealed[id]) { // Check if the click is valid
		return; // Don't do anything if it turns out this has already been revealed to them
	}

	clicks++;
	updateClicks();
	
	revealImg(id,true);
  
  if (clicks % 2 == 1){ // First click...
		hideLastTwoImages();
		
    firstClick = id;

		
  } else { // Second click...
    secondClick = id;

		checkMatch();
  } 
}

function hideLastTwoImages() {
	if (!lastPairWasMatch) {
		revealImg(firstClick,false);
		revealImg(secondClick,false)
	}
}

function checkMatch(){
	lastPairWasMatch = imgs[firstClick] == imgs[secondClick]
  return lastPairWasMatch;
}