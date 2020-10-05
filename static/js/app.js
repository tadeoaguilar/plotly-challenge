console.log("Entre")
// Fetch the JSON data and console log it

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */
function unpack(rows, index) {
    console.log(rows)
    return rows.map(function(row) {
      return row[index];
    });
  }
filter = "940"
ids = []
d3.selectAll("#selDataset").on("change", updatePlotly);

d3.json("samples.json").then(function(data) {
  
    console.log("33")
    console.log(data.samples[0].id)

data.samples.forEach(d => ids.push(d.id))
dataf = data.samples.filter(n => n.id == filter)
datam = data.metadata.filter(n => n.id == filter)
console.log(data)
  otu_ids = dataf[0].otu_ids.slice(0,10)
  otu_labels = dataf[0].otu_labels.slice(0,10)
  values = dataf[0].sample_values.slice(0,10)
  console.log(otu_ids)
  
  otu_ids = otu_ids.map(element => {return `OTU ${element}`
      
  });   
  console.log(datam[0].age)

  var select = d3.select('#selDataset')
    
  	.attr('class','select')
  
  var options = select
  .selectAll('option')
	.data(ids).enter()
	.append('option')
		.text(function (d) { return d; });


        var select2 = d3.select('.demo')
    
        .attr('class','select')
    
    var options = select2
    .selectAll('option')
      .data(datam).enter()
      .append('option')
          .text(function (d) { return `ID: ${d.id}`})



  var trace1 = {
    y: otu_ids,
    x: values,
    text: otu_labels ,
    orientation:'h',
    type: "bar"
  };
  
  // Create the data array for the plot
  var data = [trace1];
  
  // Define the plot layout
  var layout = {
    title: "OTUS",
    yaxis: { title: "OTU" },
    xaxis: { title: "Value" }
  };
  
  // Plot the chart to a div tag with id "bar-plot"
  Plotly.newPlot("bar", data, layout);

  var data = [
    {
      x: otu_ids,
      y: values,
      mode: 'markers',
      marker: {size:values},
      text: otu_labels,
      type: 'bubble'
    }
  ];
  var layout = {title: 'Bubble Chart'};
  Plotly.newPlot('bubble', data, layout);
 

});

function updatePlotly() {

    d3.json("samples.json").then(function(data) {
        console.log("As")
        console.log(data)
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    filter = dataset
    console.log(filter)

  dataf = data.samples.filter(n => n.id == filter)
  console.log(dataf)
  otu_ids = dataf[0].otu_ids.slice(0,10)
  otu_labels = dataf[0].otu_labels.slice(0,10)
  values = dataf[0].sample_values.slice(0,10)
  
  otu_ids = otu_ids.map(element => {return `OTU ${element}`
      
  });



  
  Plotly.restyle("bar", "x", [values]);
  Plotly.restyle("bar", "y", [otu_ids]);
  Plotly.restyle("bubble", "x", [otu_ids]);
  Plotly.restyle("bubble", "y", [values]);
  Plotly.restyle("bubble", "marker.size", [values]);

    })

}