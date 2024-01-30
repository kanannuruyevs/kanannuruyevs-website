var sets = [
  {sets: ['Interests'], size: 15, job: 'Designer'},
  {sets: ['Skills'], size: 15, job: 'Developer'},
  {sets: ['Needs'], size: 15, job: 'Webmaster'},
  {sets: ['Interests','Skills'], size: 2, job: 'Front End'},
  {sets: ['Interests', 'Needs'], size: 2, job: 'Unicorn'},
  {sets: ['Skills', 'Needs'], size: 2, job: 'Back End'},
  {sets: ['Interests','Skills', 'Needs'], size: 2, job: 'Full Stack!'}
];

function updateSize() {

// Get the width of the window
var windowWidth = window.innerWidth || document.body.clientWidth;

// Set the size of the Venn diagram based on the window's width
var diagramSize;
if (windowWidth > 800) {
  // Desktop
  diagramSize = 500;
} else if (windowWidth < 800 && windowWidth > 650) {
  diagramSize = 400;
} else if (windowWidth < 650 && windowWidth > 462) {
  diagramSize = 350;
} else {
  // Mobile
  diagramSize = 300;
}

// Use this size for the Venn Diagram
var chart = venn.VennDiagram()
  .width(diagramSize)
  .height(diagramSize); // Keep the height equal to the width for a square aspect ratio

var div = d3.select("#venn");
div.datum(sets).call(chart);

var tooltip = d3.select("body").append("div")
  .attr("class", "tooltip");

div.selectAll("path")
  .style("stroke-opacity", 0)
  .style("stroke", "#fff")
  .style("stroke-width", 0);

div.selectAll("g")
  .on("mouseover", function(d, i) {
    // sort all the areas relative to the current item
    venn.sortAreas(div, d);
    // Display a tooltip with the current size
    tooltip.transition().duration(400).style("opacity", .9);
    tooltip.text(d.job);
    // highlight the current path
    var selection = d3.select(this).transition("tooltip").duration(400);
    selection.select("path")
      .style("stroke-width", 3)
      .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
      .style("stroke-opacity", 1);
  })
  .on("mousemove", function() {
    tooltip.style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  })
  .on("mouseout", function(d, i) {
    tooltip.transition().duration(400).style("opacity", 0);
    var selection = d3.select(this).transition("tooltip").duration(400);
    selection.select("path")
      .style("stroke-width", 0)
      .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
      .style("stroke-opacity", 0);
  });
}

// Call updateSize when the page loads
updateSize();

// Call updateSize when the window size changes
window.addEventListener('resize', updateSize);
