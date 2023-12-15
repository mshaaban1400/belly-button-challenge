// Display the default plot
function init() {
    // use the D3 library to read in the json from the url
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data) {

        console.log(data);
        
        // Store the samples and the metadata into variables
        let samples = data.samples;
        let metadata = data.metadata;

        // Populate dropdown menu
        let dropdown = d3.select("#selDataset");
            samples.forEach(sample => {
            dropdown.append("option").text(sample.sample_values).property("value", sample.sample_values);
        });

        // Initial rendering of charts
        Plotly.newPlot("pie", data, layout);

});

// // display the default plot
// function init() {
//     let data = [{
//         values: samples.sample_values,
//         labels: samples.otu_ids,
//         type: "bar"
//     }];

//     let layout = {
//         title: 'Top 10 OTUs Found in the Belly Button',
//         xaxis: 'Incidence',
//         yaxis: 'OTU'
//     };

//     Plotly.newPlot("plot", data, layout);
// };

// // Function called by DOM changes
// function getData() {
//     // Use D3 to select the dropdown menu
//     let dropdownMenu = d3.select("#selDataset");

//     // Assign the value of the dropdown menu option to a variable
//     let dataset = dropdownMenu.property("value");

//     // Initialize x and y arrays
//     let x = [];
//     let y = [];

//     // use a conditional to search for specific OTUs
//     if (dataset == '')

//     // Call function to update the chart
//     updatePlotly(data);
// };


// // // Trace for the OTU data
// // let trace1 = {
// //     x: xData,
// //     y: yData
// //   };

// // // Data array
// // let data = [trace];

// // // Apply a title to the layout
// // let layout = {
// //     title: "A Plotly plot"
// //   };

// // // Render the plot to the div tag with id "plot"
// // Plotly.newPlot('plot', data, layout);