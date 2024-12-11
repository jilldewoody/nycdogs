// add your JavaScript/D3 to this file
// add your JavaScript/D3 to this file

// Set up margins and dimensions
const margin = { top: 40, right: 150, bottom: 40, left: 150 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append SVG element
const svg = d3.select("#plot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create scales
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([0, height]).padding(0.1);

// Create axes groups
const xAxis = svg.append("g").attr("transform", `translate(0, ${height})`);
const yAxis = svg.append("g");

// Create a color scale
const color = d3.scaleOrdinal(d3.schemeTableau10);

// Add a year label
const yearLabel = svg.append("text")
  .attr("class", "year-label")
  .attr("x", width / 2)
  .attr("y", -10)
  .attr("text-anchor", "middle")
  .style("font-size", "24px")
  .style("font-weight", "bold")
  .text("");

// Update function
function update(data) {
  // Update scales
  x.domain([0, d3.max(data, d => d.count)]);
  y.domain(data.map(d => d.dog_breed));

  // Update axes
  xAxis.transition().duration(500).call(d3.axisBottom(x));
  yAxis.transition().duration(500).call(d3.axisLeft(y));

  // Bind data to bars
  const bars = svg.selectAll(".bar").data(data, d => d.dog_breed);

  // Enter bars
  bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.dog_breed))
    .attr("width", 0)
    .attr("height", y.bandwidth())
    .style("fill", d => color(d.dog_breed))
    .transition()
    .duration(500)
    .attr("width", d => x(d.count));

  // Update bars
  bars.transition()
    .duration(500)
    .attr("y", d => y(d.dog_breed))
    .attr("width", d => x(d.count))
    .style("fill", d => color(d.dog_breed));

  // Exit bars
  bars.exit().transition().duration(500).attr("width", 0).remove();
}

// Add a legend
const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", `translate(${width + 20}, 20)`);

function createLegend(breeds) {
  legend.selectAll("*").remove(); // Clear previous legend

  breeds.forEach((breed, i) => {
    const legendRow = legend.append("g")
      .attr("transform", `translate(0, ${i * 20})`);

    legendRow.append("rect")
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", color(breed));

    legendRow.append("text")
      .attr("x", 20)
      .attr("y", 12)
      .text(breed)
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");
  });
}

const data = [{"year":2016,"dog_breed":"Yorkshire Terrier","count":7147},{"year":2016,"dog_breed":"Shih Tzu","count":6532},{"year":2016,"dog_breed":"Chihuahua","count":5334},{"year":2016,"dog_breed":"Maltese","count":3938},{"year":2016,"dog_breed":"Labrador Retriever","count":3721},{"year":2016,"dog_breed":"American Pit Bull Mix / Pit Bull Mix","count":3139},{"year":2016,"dog_breed":"American Pit Bull Terrier/Pit Bull","count":3057},{"year":2016,"dog_breed":"Labrador Retriever Crossbreed","count":2525},{"year":2016,"dog_breed":"Pomeranian","count":2026},{"year":2016,"dog_breed":"Beagle","count":1933},{"year":2017,"dog_breed":"Yorkshire Terrier","count":4707},{"year":2017,"dog_breed":"Shih Tzu","count":4241},{"year":2017,"dog_breed":"Chihuahua","count":3370},{"year":2017,"dog_breed":"Maltese","count":2405},{"year":2017,"dog_breed":"Labrador Retriever","count":2366},{"year":2017,"dog_breed":"American Pit Bull Mix / Pit Bull Mix","count":2237},{"year":2017,"dog_breed":"Labrador Retriever Crossbreed","count":1832},{"year":2017,"dog_breed":"American Pit Bull Terrier/Pit Bull","count":1620},{"year":2017,"dog_breed":"Pomeranian","count":1330},{"year":2017,"dog_breed":"Havanese","count":1272},{"year":2018,"dog_breed":"Yorkshire Terrier","count":4366},{"year":2018,"dog_breed":"Shih Tzu","count":3998},{"year":2018,"dog_breed":"Chihuahua","count":2965},{"year":2018,"dog_breed":"Maltese","count":2212},{"year":2018,"dog_breed":"Labrador Retriever","count":2122},{"year":2018,"dog_breed":"Labrador Retriever Crossbreed","count":1850},{"year":2018,"dog_breed":"American Pit Bull Mix / Pit Bull Mix","count":1831},{"year":2018,"dog_breed":"Havanese","count":1302},{"year":2018,"dog_breed":"American Pit Bull Terrier/Pit Bull","count":1286},{"year":2018,"dog_breed":"Pomeranian","count":1274},{"year":2022,"dog_breed":"Yorkshire Terrier","count":13584},{"year":2022,"dog_breed":"Shih Tzu","count":12555},{"year":2022,"dog_breed":"Chihuahua","count":9097},{"year":2022,"dog_breed":"Labrador Retriever","count":7211},{"year":2022,"dog_breed":"Labrador Retriever Crossbreed","count":6954},{"year":2022,"dog_breed":"Maltese","count":6907},{"year":2022,"dog_breed":"Not Provided","count":5824},{"year":2022,"dog_breed":"American Pit Bull Mix / Pit Bull Mix","count":5498},{"year":2022,"dog_breed":"Shih Tzu Crossbreed","count":5387},{"year":2022,"dog_breed":"Poodle Crossbreed","count":5287},{"year":2023,"dog_breed":"Yorkshire Terrier","count":5077},{"year":2023,"dog_breed":"Shih Tzu","count":4743},{"year":2023,"dog_breed":"Chihuahua","count":3547},{"year":2023,"dog_breed":"Labrador Retriever","count":3147},{"year":2023,"dog_breed":"Labrador Retriever Crossbreed","count":3086},{"year":2023,"dog_breed":"Poodle Crossbreed","count":2748},{"year":2023,"dog_breed":"Shih Tzu Crossbreed","count":2691},{"year":2023,"dog_breed":"Maltese","count":2660},{"year":2023,"dog_breed":"Goldendoodle","count":2415},{"year":2023,"dog_breed":"American Pit Bull Mix / Pit Bull Mix","count":2225}]

// Get unique years and breeds
const years = Array.from(new Set(data.map(d => d.year)));
const allBreeds = Array.from(new Set(data.map(d => d.dog_breed)));

// Set color domain
color.domain(allBreeds);

// Animation loop
let yearIndex = 0;
setInterval(() => {
  const currentYear = years[yearIndex];

  // Update year label
  yearLabel.text(currentYear);

  // Filter and sort data for the current year
  const filteredData = data
    .filter(d => d.year === currentYear)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Get top 10 dog breeds

  // Update legend
  createLegend(filteredData.map(d => d.dog_breed));

  // Update bars
  update(filteredData);

  yearIndex = (yearIndex + 1) % years.length; // Loop through years
}, 2000);
