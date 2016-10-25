var initialLocations = 
[
	{
		name: "Vortex Bar & Grill",
		position: new google.maps.LatLng(33.779178, -84.384361)
	},
	{
		name: "Inman Perk Coffee",
		position: new google.maps.LatLng(33.763077, -84.359009)
	},
	{
		name: "The Painted Pin",
		position: new google.maps.LatLng(33.830309, -84.362588)
	}
	
];
$(function()
{
	function Result(data)
	{
		this.name = data.title;
		this.marker = data;
	}
	
	var Controller = function()
	{
		var self = this;
		
		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 33.795, lng: -84.396},
		  zoom: 12
		});
		
		this.infoWindowList = ko.observableArray();
		this.placesList = ko.observableArray();
		initialLocations.forEach(function(location)
		{
			var marker = new google.maps.Marker(
			{
				position: location.position,
				map: self.map,
				title: location.name
			});
			var infoWindow = new google.maps.InfoWindow({
			  content: location.name
			});
			self.infoWindowList.push(infoWindow);
			marker.addListener('click', function() {
				closeAllInfoWindows();
			  	infoWindow.open(self.map, marker);
			});
			var result = new Result(marker);
			self.placesList.push(result);
		});
		var input = document.getElementById('pac-input');
		var searchBox = new google.maps.places.SearchBox(input);
		this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		
		this.map.addListener('bounds_changed', function() {
          searchBox.setBounds(self.map.getBounds());
        });
		
		searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
		  createMarkers(places);
		});
	  
		function createMarkers(places) {
			closeAllInfoWindows();
			self.placesList([]);
			self.infoWindowList([]);
			for (var i = 0; i < places.length; i++) {
				var place = places[i];
					
				var marker = new google.maps.Marker({
				  map: self.map,
				  title: place.name,
				  position: place.geometry.location
				});
				var result = new Result(marker);
				self.placesList.push(result);
			}
		}
		
		this.resultOnClick = function()
		{
			//scope is current element in placesList
			var infoWindow = new google.maps.InfoWindow({
			  content: this.name
			});
			
			var marker = new google.maps.Marker(this.marker);
			marker.setMap(self.map);
			closeAllInfoWindows();
			infoWindow.open(self.map, marker);
			self.infoWindowList.push(infoWindow);
		};
		
		function closeAllInfoWindows()
		{
			self.infoWindowList().forEach(function(window)
			{	
				window.close();
			});
		}
		
	}; 
	ko.applyBindings(new Controller());

});
