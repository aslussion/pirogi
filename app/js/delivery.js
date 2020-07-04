ymaps.ready(init);
        var myMap,myPlacemark,myMapG,myPlacemarkG,mapCenterG,mapZoomG,mapCenter1,mapCenter2,mapZoom1,mapZoom2;

        function init(){ 
            //доставка
            myMap = new ymaps.Map("j-mapMsc", {
                center: mapCenter1,
                zoom: mapZoom1,
            }); 
            marks1.forEach(function(item, i, arr) {
                myPlacemark = new ymaps.Placemark(item.coord, 
                {
                    balloonContent: item.text,    
                },
                {}
                );
                myMap.geoObjects.add(myPlacemark);
            });
            myMap = new ymaps.Map("j-mapRegion", {
                center: mapCenter2,
                zoom: mapZoom2,
            }); 
            marks2.forEach(function(item, i, arr) {
                myPlacemark = new ymaps.Placemark(item.coord, 
                {
                    balloonContent: item.text,    
                },
                {}
                );
                myMap.geoObjects.add(myPlacemark);
            });
        }