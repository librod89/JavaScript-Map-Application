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
	var Controller = function()
	{
		var self = this;
		
		this.map = new google.maps.Map(document.getElementById('map'), {
		  center: {lat: 33.740, lng: -84.388},
		  zoom: 12
		});
		
		this.markerList = ko.observableArray();
		this.infoWindowList = ko.observableArray();
		initialLocations.forEach(function(location)
		{
			var marker = new google.maps.Marker(
			{
				position: location.position,
				map: self.map,
				title: location.name
			});
			self.markerList.push(marker);
			var infoWindow = new google.maps.InfoWindow({
			  content: location.name
			});
			self.infoWindowList.push(infoWindow);
			marker.addListener('click', function() {
				//close all the other infowindows	
				self.infoWindowList().forEach(function(window)
				{	
					window.close();
				});
			  	infoWindow.open(self.map, marker);
			});

			
		});
		
	}; 
	ko.applyBindings(new Controller());

});
