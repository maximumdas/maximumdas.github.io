function onEachFeature(feature, layer) {
  // does this feature have a property named popupContent?
  if (feature.properties && feature.properties.Kabupaten) {
    layer.bindPopup(feature.properties.Kabupaten);
  }
}

function showLoading(show) {
  if (show) {
    Swal.fire({
      title: "loading...",
      color: "#fdfdfd",
      html: `<lottie-player src="./assets/json/loading-maps.json"  background="transparent"  speed="1"  loop autoplay></lottie-player>`,
      background: "rgba(255,255,255,0)",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  } else {
    Swal.close();
  }
}

// showLoading(true);
var map = L.map("map").setView([-8.604598, 119.463048], 7);
map.createPane("labels");
map.scrollWheelZoom.disable();

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

let geojsonLayer = L.geoJSON(baliNusra, {
  style: () => ({
    weight: 1.5,
    opacity: 0.75,
    fillOpacity: 0.0,
    color: "orange",
  }),
}).addTo(map);

const gridLayer = L.glify.layer({
  geojson: grid,
  paneName: "foo",
  glifyOptions: {
    color: (index, feature) => {
      let colorScheme = {
        r: 50 / 255,
        g: 205 / 255,
        b: 50 / 255,
        a: 1,
      };
      if (feature.properties?.IKP_2020 <= 59.58) {
        colorScheme = {
          r: 255 / 255,
          g: 128 / 255,
          b: 114 / 255,
          a: 1,
        };
      } else if (feature.properties?.IKP_2020 <= 67.75) {
        colorScheme = {
          r: 255 / 255,
          g: 165 / 255,
          b: 0,
          a: 1,
        };
      } else if (feature.properties?.IKP_2020 <= 75.68) {
        colorScheme = {
          r: 173 / 255,
          g: 255 / 255,
          b: 47 / 255,
          a: 1,
        };
      }
      return colorScheme;
    },
    size: 30,
    opacity: 0.8,
    click(e, feature, xy) {
      if (Array.isArray(feature)) {
        L.popup()
          // its a [lng,lat]
          // .setLatLng(feature.reverse())
          .setContent(`You clicked on a point`)
          .openOn(map);
      } else {
        L.popup()
          .setLatLng(e.latlng)
          .setContent("Nilai IKP " + feature.properties.IKP_2020)
          .openOn(map);
      }
    },
    hover(e, feature) {
      console.log("hover", feature);
    },
  },
  onAdd() {
    showLoading(true);
    // transportationLayer.addTo(map).bringToFront();
  },
  onLayersInit() {
    // transportationLayer.setZIndex(9999999)
    showLoading(false);
  },
  onRemove() {
    console.log("onRemove callback");
  },
});

// var gridLayer = L.geoJSON(grid, { onEachFeature: onEachFeature, style: () => ({
//     weight: 1,
//     opacity: 0.75,
//     fillOpacity: 0.1,
//     color: 'cyan', //Outline color
// })}).addTo(map);

// let roadLayer = L.geoJSON(highway, { style: () => ({
//     weight: 1.5,
//     opacity: 0.75,
//     fillOpacity: 0.0,
//     color: 'black',
// })}).addTo(map);

const roadLayer = L.glify
  .layer({
    geojson: highway,
    paneName: "highway",
    glifyOptions: {
      color: (index, feature) => {
        let colorScheme = {
          r: 0 / 255,
          g: 0 / 255,
          b: 0 / 255,
          a: 1,
        };
        // if (feature.properties?.IKP_2020 <=59.58){
        //   colorScheme = {
        //     r:255/255,
        //     g:128/255,
        //     b:114/255,
        //     a:1
        //   };
        // } else if (feature.properties?.IKP_2020 <=67.75) {
        //   colorScheme = {
        //     r:255/255,
        //     g:165/255,
        //     b:0,
        //     a:1
        //   };
        // } else if (feature.properties?.IKP_2020 <=75.68) {
        //   colorScheme = {
        //     r:173/255,
        //     g:255/255,
        //     b:47/255,
        //     a:1
        //   };
        // }
        return colorScheme;
      },
      size: 30,
      opacity: 0.8,
      click(e, feature, xy) {},
      hover(e, feature) {
        console.log("hover", feature);
      },
    },
    onAdd() {
      showLoading(true);
      // transportationLayer.addTo(map).bringToFront();
    },
    onLayersInit() {
      // transportationLayer.setZIndex(9999999)
      showLoading(false);
    },
    onRemove() {
      console.log("onRemove callback");
    },
  })
  .addTo(map);

// const transportationLayer = L.geoJSON(transportation, { style: () => ({
//     weight: 1.5,
//     fillOpacity: 0.0,
//     color: 'blue',
//  }),

// pointToLayer : function(feature, latlng) {
//     return L.circleMarker(latlng, {
//         radius : 1,
//         fillColor : "#474747",
//         color : "#000",
//         weight : 1,
//         opacity : 1,
//         fillOpacity : 1
//     });
// }}).addTo(map);

const layerControl = L.control.layers(
  {},
  {
    "Granular Grid": gridLayer,
    "Administrative boundaries": geojsonLayer,
    // 'Transportation Point of Interest': transportationLayer,
    // 'Healthcare Point of Interest': ,
    // 'Shop Point of Interest': ,
    // 'Bussiness Center Point of Interest': ,
  },
  { collapsed: false }
);

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Food Security Index Bin</h4>";
  div.innerHTML +=
    '<i style="background: #33CD32"></i><span> 75.68 < FSI <= 100 </span><br>';
  div.innerHTML +=
    '<i style="background: #ADFF30"></i><span> 67.75 < FSI <= 75.68</span><br>';
  div.innerHTML +=
    '<i style="background: #FFA503"></i><span> 59.58 < FSI <= 67.75</span><br>';
  div.innerHTML +=
    '<i style="background: #FF8072"></i><span> FSI <= 59.58 </span><br>';
  return div;
};
layerControl.addTo(map);
gridLayer.addTo(map);
legend.addTo(map);

function renderMap(e) {
  // console.log(e)
}
var checkboxElems = document.querySelectorAll(".map-checkbox");
checkboxElems.forEach((elem) => {
  elem.addEventListener("click", renderMap);
});
