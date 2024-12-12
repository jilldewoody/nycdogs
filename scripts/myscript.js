/* Below is code used in R to generate json with data

top_breeds_by_year <- dog_license_data |>
  filter(BreedName != "Not Provided") |>
  mutate(BreedName = recode(BreedName, "American Pit Bull Mix / Pit Bull Mix" = "Pit Bull Mix", "American Pit Bull Terrier/Pit Bull" = "Pit Bull Terrier")) |>
  group_by(Year, BreedName) |>
  summarize(count = n()) |>
  arrange(desc(count)) |>
  slice_head(n=10) |>
  rename(year = `Year`) |>
  rename(breed_name = `BreedName`)

library(jsonlite)
write_json(top_breeds_by_year, "dog_license_breed_by_year.json") */

const data = [{"year":2016,"breed_name":"Yorkshire Terrier","count":7229},{"year":2016,"breed_name":"Shih Tzu","count":6609},{"year":2016,"breed_name":"Chihuahua","count":5405},{"year":2016,"breed_name":"Maltese","count":3988},{"year":2016,"breed_name":"Labrador Retriever","count":3788},{"year":2016,"breed_name":"Pit Bull Mix","count":3173},{"year":2016,"breed_name":"Pit Bull Terrier","count":3078},{"year":2016,"breed_name":"Labrador Retriever Crossbreed","count":2573},{"year":2016,"breed_name":"Pomeranian","count":2069},{"year":2016,"breed_name":"Beagle","count":1959},{"year":2017,"breed_name":"Yorkshire Terrier","count":4769},{"year":2017,"breed_name":"Shih Tzu","count":4293},{"year":2017,"breed_name":"Chihuahua","count":3405},{"year":2017,"breed_name":"Maltese","count":2429},{"year":2017,"breed_name":"Labrador Retriever","count":2407},{"year":2017,"breed_name":"Pit Bull Mix","count":2251},{"year":2017,"breed_name":"Labrador Retriever Crossbreed","count":1857},{"year":2017,"breed_name":"Pit Bull Terrier","count":1631},{"year":2017,"breed_name":"Pomeranian","count":1365},{"year":2017,"breed_name":"Havanese","count":1299},{"year":2018,"breed_name":"Yorkshire Terrier","count":4425},{"year":2018,"breed_name":"Shih Tzu","count":4045},{"year":2018,"breed_name":"Chihuahua","count":3002},{"year":2018,"breed_name":"Maltese","count":2248},{"year":2018,"breed_name":"Labrador Retriever","count":2159},{"year":2018,"breed_name":"Labrador Retriever Crossbreed","count":1882},{"year":2018,"breed_name":"Pit Bull Mix","count":1851},{"year":2018,"breed_name":"Havanese","count":1326},{"year":2018,"breed_name":"Pomeranian","count":1299},{"year":2018,"breed_name":"Pit Bull Terrier","count":1293},{"year":2022,"breed_name":"Yorkshire Terrier","count":13789},{"year":2022,"breed_name":"Shih Tzu","count":12676},{"year":2022,"breed_name":"Chihuahua","count":9223},{"year":2022,"breed_name":"Labrador Retriever","count":7339},{"year":2022,"breed_name":"Labrador Retriever Crossbreed","count":7088},{"year":2022,"breed_name":"Maltese","count":7007},{"year":2022,"breed_name":"Pit Bull Mix","count":5561},{"year":2022,"breed_name":"Shih Tzu Crossbreed","count":5487},{"year":2022,"breed_name":"Poodle Crossbreed","count":5407},{"year":2022,"breed_name":"Pomeranian","count":5105},{"year":2023,"breed_name":"Yorkshire Terrier","count":5151},{"year":2023,"breed_name":"Shih Tzu","count":4809},{"year":2023,"breed_name":"Chihuahua","count":3599},{"year":2023,"breed_name":"Labrador Retriever","count":3209},{"year":2023,"breed_name":"Labrador Retriever Crossbreed","count":3132},{"year":2023,"breed_name":"Poodle Crossbreed","count":2815},{"year":2023,"breed_name":"Shih Tzu Crossbreed","count":2745},{"year":2023,"breed_name":"Maltese","count":2705},{"year":2023,"breed_name":"Goldendoodle","count":2489},{"year":2023,"breed_name":"Pit Bull Mix","count":2247}]

const margin = { top: 40, right: 150, bottom: 40, left: 150 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const graphTitle = d3.select("#plot")
  .append("h1")
  .style("font-size", "24px")
  .style("font-weight", "bold")
  .text("Evolution of NYC Dog Breed Composition in a 7-Year Span");

const svg = d3.select("#plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right + 200)
  .attr("height", height + margin.top + margin.bottom + 100)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([0, height]).padding(0.1);

const xAxis = svg.append("g").attr("transform", `translate(0, ${height})`);
const yAxis = svg.append("g");

// Match color scale to that used in our R graphs
const breedColorMap = {
  "Yorkshire Terrier": "#B9D8E9",
  "Shih Tzu Crossbreed": "#5995C4",
  "Shih Tzu": "#C2E5A3",
  "Poodle Crossbreed": "#66B460",
  "Pomeranian": "#FCB0AE",
  "Maltese": "#E94B56",
  "Labrador Retriever Crossbreed": "#3FECC8E",
  "Labrador Retriever": "#FF9A48",
  "Goldendoodle": "#D5C1DF",
  "Chihuahua": "#8C6AAF",
  "Pit Bull Terrier": "#FFFDAE",
  "Pit Bull Mix": "#C17E5E",
  "Beagle": "#B15928",
  "Havanese": "#E7E099",
  "Labrador Retriever Crossbreed": "#6A3D9A"};

// Ensure high enough contrast with text inside bar
const breedToStrokeColorMap = {
  "Yorkshire Terrier": "black",
  "Shih Tzu Crossbreed": "white",
  "Shih Tzu": "black",
  "Poodle Crossbreed": "white",
  "Pomeranian": "black",
  "Maltese": "white",
  "Labrador Retriever Crossbreed": "white",
  "Labrador Retriever": "white",
  "Goldendoodle": "white",
  "Chihuahua": "white",
  "Pit Bull Terrier": "black",
  "Pit Bull Mix": "white",
  "Beagle": "white",
  "Havanese": "black",
  "Labrador Retriever Crossbreed": "white"};

const colorScale = breed => breedColorMap[breed];
const strokeColorScale = breed => breedToStrokeColorMap[breed];

const yearLabel = svg.append("text")
  .attr("class", "year-label")
  .attr("x", width / 2)
  .attr("y", -10)
  .attr("text-anchor", "middle")
  .style("font-size", "24px")
  .style("font-weight", "bold")
  .text("");

const xAxisLabel = svg.append("text")
    .attr("class", "x-axis-label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Count of Licensed Dogs");

const yAxisLabel = svg.append("text")
    .attr("class", "y-axis-label")
    .attr("x", (-height / 2) + 100)
    .attr("y", -125)
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("transform", "rotate(-90deg)")
    .text("Breed Name");

function update(data) {

  x.domain([0, d3.max(data, d => d.count)]);
  y.domain(data.map(d => d.breed_name));

  xAxis.transition().duration(500).call(d3.axisBottom(x));
  yAxis.transition().duration(500).call(d3.axisLeft(y));

  const bars = svg.selectAll(".bar").data(data, d => d.breed_name);
  const texts = svg.selectAll(".bar-text").data(data, d => d.breed_name);

  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.breed_name))
    .attr("width", 0)
    .attr("height", y.bandwidth())
    .style("fill", d => colorScale(d.breed_name))
    .transition()
    .duration(500)
    .attr("width", d => x(d.count));

  bars.transition()
    .duration(500)
    .attr("y", d => y(d.breed_name))
    .attr("width", d => x(d.count))
    .style("fill", d => colorScale(d.breed_name));

  bars.exit().transition().duration(500).attr("width", 0).remove();

  texts.enter()
    .append("text")
    .attr("class", "bar-text")
    .attr("x", d => x(d.count) - 10)
    .attr("y", d => y(d.breed_name) + y.bandwidth() / 2)
    .attr("dy", ".35em")
    .style("fill", d => strokeColorScale(d.breed_name))
    .style("font-size", "12px")
    .style("text-anchor", "end")
    .text(d => d.count);

  texts.transition()
    .duration(500)
    .attr("x", d => x(d.count) - 10)
    .attr("y", d => y(d.breed_name) + y.bandwidth() / 2)
    .text(d => d.count);

  texts.exit().remove();
}

const years = Array.from(new Set(data.map(d => d.year)));
const allBreeds = Array.from(new Set(data.map(d => d.breed_name)));

let yearIndex = 0;
setInterval(() => {

  const currentYear = years[yearIndex];

  yearLabel.text(currentYear);

  const dataForCurrentYear = data
    .filter(d => d.year === currentYear)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Get top 10 dog breeds

  update(dataForCurrentYear);

  yearIndex = (yearIndex + 1) % years.length;
}, 2000);
