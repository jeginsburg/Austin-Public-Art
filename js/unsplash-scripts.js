var pageCounter;
var mainData;

function initUnsplash(){
	// --------------------- documentation link ----------------------
	// https://dev.socrata.com/foundry/data.austintexas.gov/y4i9-kewd
	//----------------------------------------------------------------
	$.getJSON( "https://data.austintexas.gov/resource/y4i9-kewd.json", function( data ) {
		// console.log(data);
		generateCards(data,0);
		mainData = data;
	});

	document.getElementById('rightarrow').addEventListener('click', nextArrow);
	document.getElementById('leftarrow').addEventListener('click', prevArrow);

	document.getElementById('detail-close').addEventListener('click', closeDetail);
}

function generateCards(data, start){
	document.getElementById('cards').innerHTML = '';
	var cardData;
	
	console.log(data);
	pageCounter = start;

	for(var i = start; i < start + 50; i++){//data.body.list.length

		if(i < data.length){
			cardData = '';

			cardData += "<div class='card'><p class='title'>" + data[i].art_title.substring(0, 22) + "</p>";
			cardData += "<p class='name'>" + data[i].artist_full_name + "</p>";

			var artImage = data[i].images.split(';');
			cardData += "<div class='picture' style='background-image:url(" + artImage[0] + ");'></div>";

			cardData += "<p class='city'>" + data[i].art_location_city + ", " + data[i].art_location_state +  "</p>";
			cardData += "<p class='location'>" + data[i].art_location_name + "</p>";
			// cardData += "<a class='link' href='" + data[i].web_detail_page + "' target='_blank'>Details</a></div>";
			cardData += "<a class='link' onclick='openDetail(" + i + ");' target='_blank'>Details</a></div>";

			document.getElementById('cards').innerHTML += cardData;
		}
	}
}

function openDetail(artNo){
	document.getElementById('card-detail').style.display = 'block';
	window.setTimeout(function(){
		document.getElementById('card-detail').style.opacity = '1';
	}, 400)

	var artImage = mainData[artNo].images.split(';');
	document.getElementById('detail-title').innerHTML = mainData[artNo].art_title;
	document.getElementById('detail-artist').innerHTML = mainData[artNo].artist_full_name;
	document.getElementById('detail-image').style.background = "url(" + artImage[0] + ")";
	document.getElementById('detail-city').innerHTML = mainData[artNo].art_location_city + ", " + mainData[artNo].art_location_state;
	document.getElementById('detail-location').innerHTML = mainData[artNo].art_location_name;

}

function closeDetail(){
	document.getElementById('card-detail').style.opacity = '0';
	window.setTimeout(function(){
		document.getElementById('card-detail').style.display = 'none';
	}, 400)

}

function nextArrow(){
	pageCounter += 50;
	if(pageCounter > mainData.length){pageCounter = 0;}
	generateCards(mainData, pageCounter);
}

function prevArrow(){
	pageCounter -= 50;
	if(pageCounter < 0){pageCounter = mainData.length - 50;}
	generateCards(mainData, pageCounter);
}