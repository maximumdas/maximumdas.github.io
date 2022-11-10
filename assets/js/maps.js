let selectedLayer = "";
let baseLayer = null;
let transportationMarkers = [];
let healthcareMarkers = [];
let shopMarkers = [];
let businessMarkers = [];

var IconStyle = L.Icon.extend({
  options: {
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  },
});
var busMarker = new IconStyle({
  iconUrl: "./assets/img/bus-marker.png",
});
var shopMarker = new IconStyle({
  iconUrl: "./assets/img/store.png",
});
var healthcareMarker = new IconStyle({
  iconUrl: "./assets/img/hospital.png",
});
var businessMarker = new IconStyle({
  iconUrl: "./assets/img/business.png",
});

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
  let props = "IKP_PRED";
  if (selectedLayer != "") {
    props = selectedLayer;
  }
  let colorScheme = {
    r: 26 / 255,
    g: 150 / 255,
    b: 63 / 255,
    a: 0.4,
  };
  if (feature.properties[props] <= 60) {
    colorScheme = {
      r: 214 / 255,
      g: 25 / 255,
      b: 27 / 255,
      a: 0.4,
    };
  } else if (feature.properties[props] <= 65) {
    colorScheme = {
      r: 243 / 255,
      g: 144 / 255,
      b: 81 / 255,
      a: 0.4,
    };
  } else if (feature.properties[props] <= 70) {
    colorScheme = {
      r: 251 / 255,
      g: 225 / 255,
      b: 149 / 255,
      a: 0.4,
    };
  } else if (feature.properties[props] <= 75) {
    colorScheme = {
      r: 219 / 255,
      g: 238 / 255,
      b: 158 / 255,
      a: 0.4,
    };
  } else if (feature.properties[props] <= 80) {
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
          L.popup({
            minWidth: 300,
          })
            .setLatLng(e.latlng)
            .setContent(
              `<ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Food Security Index <span class="badge rounded-pill bg-info">${feature.properties.IKP_PRED.toFixed(
                      2
                    )}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Availability <span class="badge rounded-pill bg-info">${feature.properties.Ketersediaan_PRED.toFixed(
                      2
                    )}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Accessibility <span class="badge rounded-pill bg-info">${feature.properties.Keterjangkauan_PRED.toFixed(
                      2
                    )}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    Utilization
                    <span class="badge rounded-pill bg-info">${feature.properties.Pemanfaatan_PRED.toFixed(
                      2
                    )}</span>
                </li>
                </ul>
            `
            )
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
          .setContent(
            `<ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  Food Security Index <span class="badge rounded-pill bg-info">${feature.properties.IKP_PRED.toFixed(
                    2
                  )}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  Availability <span class="badge rounded-pill bg-info">${feature.properties.Ketersediaan_PRED.toFixed(
                    2
                  )}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  Accessibility <span class="badge rounded-pill bg-info">${feature.properties.Keterjangkauan_PRED.toFixed(
                    2
                  )}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  Utilization
                  <span class="badge rounded-pill bg-info">${feature.properties.Pemanfaatan_PRED.toFixed(
                    2
                  )}</span>
              </li>
              </ul>
          `
          )
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

const layerControl = new L.control.layers(
  {
    "Grid FSI 2022": gridLayer2022,
    "Grid FSI 2021": gridLayer2021,
  },
  {},
  { collapsed: false }
);

layerControl.addTo(map);

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Color Range</h4>";
  div.innerHTML +=
    '<i style="background: #249A44"></i><span> 80 < FSI <= 100 </span><br>';
  div.innerHTML +=
    '<i style="background: #A0D97B"></i><span> 75 < FSI <= 80</span><br>';
  div.innerHTML +=
    '<i style="background: #DFF1A3"></i><span> 70 < FSI <= 75</span><br>';
  div.innerHTML +=
    '<i style="background: #FFFFB1"></i><span> 65 < FSI <= 70 </span><br>';
  div.innerHTML +=
    '<i style="background: #F69657"></i><span> 60 < FSI <= 65 </span><br>';
  div.innerHTML +=
    '<i style="background: #DE332C"></i><span> FSI <= 60 </span><br>';
  return div;
};
// layerControl.addTo(map);
legend.addTo(map);

map.on("baselayerchange", function (e) {
  baseLayer = e.layer;
});

function onSelectionChange(e) {
  selectedLayer = document.getElementById("metrics-select").value;
  const currentLayer = baseLayer ?? gridLayer2022;
  currentLayer.setStyle({
    color: resolveColor,
  });
}
document
  .getElementById("metrics-select")
  .addEventListener("change", onSelectionChange);

// handling checkboxes
function handleCheckboxChange(e) {
  if (e.target.checked) {
    if (e.target.value == "transportation") {
      transportation.geometries.forEach((geom) => {
        transportationMarkers.push(
          L.marker([geom.coordinates[1], geom.coordinates[0]], {
            icon: busMarker,
          }).addTo(map)
        );
      });
    } else if (e.target.value == "healthcare") {
      healthcare.geometries.forEach((geom) => {
        healthcareMarkers.push(
          L.marker([geom.coordinates[1], geom.coordinates[0]], {
            icon: healthcareMarker,
          }).addTo(map)
        );
      });
    } else if (e.target.value == "shop") {
      shop.geometries.forEach((geom) => {
        shopMarkers.push(
          L.marker([geom.coordinates[1], geom.coordinates[0]], {
            icon: shopMarker,
          }).addTo(map)
        );
      });
    } else if (e.target.value == "business-center") {
      bussiness.geometries.forEach((geom) => {
        businessMarkers.push(
          L.marker([geom.coordinates[1], geom.coordinates[0]], {
            icon: businessMarker,
          }).addTo(map)
        );
      });
    }
  } else {
    if (e.target.value == "transportation") {
      transportationMarkers.forEach((geom) => {
        map.removeLayer(geom);
      });
    } else if (e.target.value == "healthcare") {
      healthcareMarkers.forEach((geom) => {
        map.removeLayer(geom);
      });
    } else if (e.target.value == "shop") {
      shopMarkers.forEach((geom) => {
        map.removeLayer(geom);
      });
    } else if (e.target.value == "business-center") {
      businessMarkers.forEach((geom) => {
        map.removeLayer(geom);
      });
    }
  }
}
var checkboxElems = document.querySelectorAll(".marker-checkbox");
checkboxElems?.forEach((elem) => {
  elem.addEventListener("change", handleCheckboxChange);
});
