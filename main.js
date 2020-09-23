const width = 923;
const height = 600;

const svg = d3
  .select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .call(
    d3
      .zoom()
      .on("zoom", function () {
        svg.attr("transform", d3.event.transform);
      })
      .scaleExtent([1, 6])
      .translateExtent([
        [0, 0],
        [width, height],
      ])
  )
  .append("g");

const projection = d3
  .geoMercator()
  .scale(140)
  .translate([width / 2, height / 1.4]);

const path = d3.geoPath(projection);

const g = svg.append("g");

d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json").then(
  (data) => {
    const countries = topojson.feature(data, data.objects.countries);
    g.selectAll("path")
      .data(countries.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path);
  }
);
var marks = [
  { long: 78.4867, lat: 17.385 }, // corsica
  { long: 77.209, lat: 28.6139 },
];

svg
  .selectAll(".mark")
  .data(marks)
  .enter()
  .append("image")
  .attr("class", "mark")
  .attr("width", 30)
  .attr("height", 30)
  .attr(
    "xlink:href",
    "https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png"
  )
  .attr(
    "transform",
    (d) => `translate(${projection([d.long, d.lat]).join(",")})`
  );

// $(document).on("keydown", function (event) {
//   if (event.onkeydown) {
//     $("#map").css("cursor", "grab");
//   }
// });
