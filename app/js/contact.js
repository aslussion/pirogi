ymaps.ready(init);
        var myMap,myPlacemark,myMapG,myPlacemarkG,mapCenterG,mapZoomG,mapCenter1,mapCenter2,mapZoom1,mapZoom2;

        function init(){ 
            myMapG = new ymaps.Map("j-map", {
                center: mapCenterG,
                zoom: mapZoomG,
            }); 

            marksG.forEach(function(item, i, arr) {
                myPlacemarkG = new ymaps.Placemark(item.coord, 
                {
                    balloonContent: item.text,    
                }
                );
                myMapG.geoObjects.add(myPlacemarkG);
            });
        }