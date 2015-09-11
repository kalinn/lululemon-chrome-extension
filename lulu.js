// @file lulu.js
// @author Kristin Linn

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
};

function getSaleImg(callback, errorCallback) {
	url = "http://shop.lululemon.com/products/category/women-we-made-too-much?mnid=mn;USwomen;we-made-to-much";
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send(null); //why does this need to be null?

	request.onload = function() {
		var response = request.responseText;
		if (!response) {
			errorCallback('No response from the page!');
			return;
		};
		var parser = new DOMParser();
		var doc = parser.parseFromString(response, "text/html");

		try {
			var imageNode = doc.getElementsByTagName("img");
			var imageSrc = [];
			j = 0
			for (var i = 0; i < imageNode.length; i++) {
				var image = imageNode[i];
				// Change these to the names of your favorite items
				var pattern1 = /Run: Inspire Crop/.test(image.title);
				var pattern2 = /Flow Y Bra/.test(image.title);
				var pattern3 = /Energy Bra/.test(image.title);
				if (pattern1 || pattern2 || pattern3) {
				// if (pattern2 || pattern3) {
					imageSrc[j] = image.src;
					j += 1;
				};
			};
			if (j==0) {
				imageSrc[j] = "http://images.lululemon.com/is/image/lululemon/pnf_en_main_786x281"
			}
		} catch(err){};

		callback(imageSrc);
	};

	request.onerror = function() {
		errorCallback('Network error.');
	};
};

document.addEventListener('DOMContentLoaded', function() {
	// console.log("Hello two");
	renderStatus('Items on sale:');	
	getSaleImg(function(image) {
		// trythis = r.getElementsByTagName("title");
		for (var i = 0; i < image.length; i++) {
			var newImg = document.createElement("img");
			document.body.appendChild(newImg); 
			document.getElementsByTagName('img')[i].src = image[i];
		}
	}, function(error) {
		renderStatus(error);
	});
});

// document.addEventListener('DOMContentLoaded', function() {
// 	console.log("hello one");
// });



