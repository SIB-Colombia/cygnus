'use strict';

angular.module('catalogApp')
	// =========================================================================
	// START PHOTO SLIDER
	// =========================================================================
	.directive('loadMapData', ['$timeout', 'MapData', 'appDataService', function (timer, MapData, appDataService) {
		return {
			restrict: 'A',
			link: function(scope, element) {
				element.ready(function(){
					var handleSuccess = function(data){
						console.log(data);
						var map = L.mapbox.map('distributionmap');
						var mapQuestAttr = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> ';

						var mopt = {
							url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
							options: {attribution: mapQuestAttr},
							tileSize: 1000
						};
						var mq = new L.tileLayer(mopt.url,mopt.options);
						map.setView(new L.LatLng(4, -75),5);
						map.addLayer(mq);
						//mq.addTo(map);
						if(data.error === 'No entries for current query.' || data.totalMatched < 0) {
							var dinoIcon = L.icon({
								iconUrl: '../../images/zoo-24@2x.png',
								iconSize:[50,50],
								iconAnchor:[45,80],
								popupAnchor:[-3,-76]
							});
							L.marker([4.35,-74.04 ], {icon:dinoIcon}).addTo(map)
							.bindPopup('No hay Registros con coordenadas para este taxon.')
							.openPopup();
							//$scope.mensaje = 'No hay registros biológicos publicados. ';
						} else {
							var clusters = new L.markerClusterGroup({
								spiderfyOnMaxZoom: true,
								showCoverageOnHover: true,
								zoomToBoundsOnClick: true,
								removeOutsideVisibleBounds: true
							});

							//$scope.mensaje = 'Mostrando ' + data.features[0].geometry.geometries.length + ' registros biológicos de ' + data.totalMatched + ' publicados. '
							//$scope.masRegistros = "<a href='http://data.sibcolombia.net/species/" + data.query.scientificname + "' target='new' > Ver más </a>";
							for (var i = 0; i < data.features[0].geometry.geometries.length; i++) {
								var a = data.features[0].geometry.geometries[i].coordinates;
								var title = '<strong><a href="http://data.sibcolombia.net/occurrences/'+(data.features[0].geometry.geometries[i].properties.occurrenceID).toString()+'" target="new"> '+ 'Detalles del Registro Biologico No. ' + data.features[0].geometry.geometries[i].properties.occurrenceID +'</a></strong>';
								L.Icon.Default.imagePath = '../images';
								var marker = new L.marker(new L.LatLng(a[1], a[0]));
								marker.bindPopup(title);
								clusters.addLayer(marker);
							}
							map.addLayer(clusters);
						}
					};

					timer(MapData.mapData().success(handleSuccess), 0);
				});
			}
		};
	}]);
