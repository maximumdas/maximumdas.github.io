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

function resolveColor(index, feature) {
  let colorScheme = {
    r: 26 / 255,
    g: 150 / 255,
    b: 63 / 255,
    a: 0.4,
  };
  if (feature.properties?.IKP_PRED <= 60) {
    colorScheme = {
      r: 214 / 255,
      g: 25 / 255,
      b: 27 / 255,
      a: 0.4,
    };
  } else if (feature.properties?.IKP_PRED <= 65) {
    colorScheme = {
      r: 243 / 255,
      g: 144 / 255,
      b: 81 / 255,
      a: 0.4,
    };
  } else if (feature.properties?.IKP_PRED <= 70) {
    colorScheme = {
      r: 251 / 255,
      g: 225 / 255,
      b: 149 / 255,
      a: 0.4,
    };
  } else if (feature.properties?.IKP_PRED <= 75) {
    colorScheme = {
      r: 219 / 255,
      g: 238 / 255,
      b: 158 / 255,
      a: 0.4,
    };
  } else if (feature.properties?.IKP_PRED <= 80) {
    colorScheme = {
      r: 139 / 255,
      g: 202 / 255,
      b: 100 / 255,
      a: 0.4,
    };
  }
  return colorScheme;
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

const gridLayer2022 = L.glify
  .layer({
    geojson: grid2022,
    paneName: "Grid 2022",
    glifyOptions: {
      color: resolveColor,
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
            .setContent("Nilai IKP " + feature.properties.IKP_PRED)
            .openOn(map);
        }
      },
      hover(e, feature) {
        console.log("hover", feature);
      },
    },
    onAdd() {
      showLoading(true);
    },
    onLayersInit() {
      showLoading(false);
    },
    onRemove() {
      console.log("onRemove callback");
    },
  })
  .addTo(map);

const gridLayer2021 = L.glify.layer({
  geojson: grid2021,
  paneName: "Grid 2021",
  glifyOptions: {
    color: resolveColor,
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
          .setContent("Nilai IKP " + feature.properties.IKP_PRED)
          .openOn(map);
      }
    },
    hover(e, feature) {
      console.log("hover", feature);
    },
  },
  onAdd() {
    showLoading(true);
  },
  onLayersInit() {
    showLoading(false);
  },
  onRemove() {
    console.log("onRemove callback");
  },
});

const gridLayer2020 = L.glify.layer({
  geojson: grid2020,
  paneName: "Grid 2020",
  glifyOptions: {
    color: resolveColor,
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
          .setContent("Nilai IKP " + feature.properties.IKP_PRED)
          .openOn(map);
      }
    },
    hover(e, feature) {
      console.log("hover", feature);
    },
  },
  onAdd() {
    showLoading(true);
  },
  onLayersInit() {
    showLoading(false);
  },
  onRemove() {
    console.log("onRemove callback");
  },
});

const gridLayer2019 = L.glify.layer({
  geojson: grid2019,
  paneName: "Grid 2019",
  glifyOptions: {
    color: resolveColor,
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
          .setContent("Nilai IKP " + feature.properties.IKP_PRED)
          .openOn(map);
      }
    },
    hover(e, feature) {
      console.log("hover", feature);
    },
  },
  onAdd() {
    showLoading(true);
  },
  onLayersInit() {
    showLoading(false);
  },
  onRemove() {
    console.log("onRemove callback");
  },
});

const gridLayer2018 = L.glify.layer({
  geojson: grid2018,
  paneName: "Grid 2018",
  glifyOptions: {
    color: resolveColor,
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
          .setContent("Nilai IKP " + feature.properties.IKP_PRED)
          .openOn(map);
      }
    },
    hover(e, feature) {
      console.log("hover", feature);
    },
  },
  onAdd() {
    showLoading(true);
  },
  onLayersInit() {
    showLoading(false);
  },
  onRemove() {
    console.log("onRemove callback");
  },
});

// // const transportationLayer = L.geoJSON(transportation, { style: () => ({
// //     weight: 1.5,
// //     fillOpacity: 0.0,
// //     color: 'blue',
// //  }),

// // pointToLayer : function(feature, latlng) {
// //     return L.circleMarker(latlng, {
// //         radius : 1,
// //         fillColor : "#474747",
// //         color : "#000",
// //         weight : 1,
// //         opacity : 1,
// //         fillOpacity : 1
// //     });
// // }}).addTo(map);

L.Control.Layers.include({
  getActiveOverlays: function () {
    // Create array for holding active layers
    var active = [];

    // Iterate all layers in control
    this._layers.forEach(function (obj) {
      // Check if it's an overlay and added to the map
      if (obj.overlay && this.map.hasLayer(obj.layer)) {
        // Push layer to active array
        active.push(obj.layer);
      }
    });

    // Return array
    return active;
  },
});

const layerControl = new L.control.layers(
  {
    "Grid FSI 2022": gridLayer2022,
    "Grid FSI 2021": gridLayer2021,
    "Grid FSI 2020": gridLayer2020,
    "Grid FSI 2019": gridLayer2019,
    "Grid FSI 2018": gridLayer2018,
  },
  {
    // "Administrative boundaries": geojsonLayer,
    // 'Transportation Point of Interest': transportationLayer,
    // 'Healthcare Point of Interest': ,
    // 'Shop Point of Interest': ,
    // 'Bussiness Center Point of Interest': ,
  },
  { collapsed: false }
);

console.log(layerControl.getActiveOverlays());
layerControl.addTo(map);

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Food Security Index Bin</h4>";
  div.innerHTML +=
    '<i style="background: #33CD32"></i><span> 80 < FSI <= 100 </span><br>';
  div.innerHTML +=
    '<i style="background: #ADFF30"></i><span> 75 < FSI <= 80</span><br>';
  div.innerHTML +=
    '<i style="background: #FFA503"></i><span> 70 < FSI <= 75</span><br>';
  div.innerHTML +=
    '<i style="background: #FF8072"></i><span> 65 < FSI <= 70 </span><br>';
  div.innerHTML +=
    '<i style="background: #FF8072"></i><span> 60 < FSI <= 65 </span><br>';
  div.innerHTML +=
    '<i style="background: #FF8072"></i><span> FSI <= 60 </span><br>';
  return div;
};
// layerControl.addTo(map);
legend.addTo(map);

// function renderMap(e) {
//   // console.log(e)
// }
// var checkboxElems = document.querySelectorAll(".map-checkbox");
// checkboxElems.forEach((elem) => {
//   elem.addEventListener("click", renderMap);
// });
