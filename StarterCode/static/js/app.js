// Declare the dropdown variable in a higher scope
const dropdown = d3.select("#selDataset");
let samples;  // Declare samples variable in a higher scope
let metadata;  // Declare metadata variable in a higher scope

// Define function to initialize the page
function init() {
    // Use D3 to read in the samples.json file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        console.log(data);

        // Extract necessary data from the JSON
        samples = data.samples;
        metadata = data.metadata;

        // Populate the dropdown menu with sample names
        data.names.forEach((name) => {
            dropdown.append("option")
                .text(name)
                .property("value", name);
        });

        // Call the functions to create the charts and display metadata for the first ID
        optionChanged(data.names[0]);
    });
}

// Define function to handle dropdown change
function optionChanged(selectedID) {
    // Filter data based on the selected ID
    var selectedData = samples.find((sample) => sample.id === selectedID);
    var selectedMetadata = metadata.find((meta) => meta.id == selectedID);

    // Update the bar chart
    updateBar(selectedData);

    // Update the bubble chart
    updateBubble(selectedData);

    // Update the demographic information
    updateDemo(selectedMetadata);
}

// Function to update bar chart based on selected sample
function updateBar(selectedSample) {
    // Pull the data
    const barValues = selectedSample.sample_values.slice(0, 10).reverse();
    const barLabels = selectedSample.otu_ids.slice(0, 10).reverse();
    const barHoverText = selectedSample.otu_labels.slice(0, 10).reverse();

    // Update bar chart
    const barChart = d3.select("#bar");
    barChart.html("");  // Clear the existing chart

    // Trace the data
    var trace1 = {
        x: barValues,
        y: barLabels.map(id => `OTU ${id}`),
        text: barHoverText,
        type: "bar",
        orientation: "h"
    };

    // Put the trace into an array
    var data = [trace1];

    // Define layout
    var layout = {
        title: 'Top 10 OTUs Found in the Belly Button',
        xaxis: { title: 'Incidence' },
        yaxis: { title: 'OTU ID' }
    };

    // Use Plotly to create the chart
    Plotly.newPlot("bar", data, layout);
}

// Function to update bubble chart based on selected sample
function updateBubble(selectedSample) {
    // Update bubble chart
    const bubbleChart = d3.select("#bubble");
    bubbleChart.html("");  // Clear the existing chart

    // Pull the data
    var sampleValues = selectedSample.sample_values;
    var otuIDs = selectedSample.otu_ids;
    var otuLabels = selectedSample.otu_labels;

    // Trace the data
    var trace = {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIDs,
            colorscale: 'Earth'
        }
    };

    // Put the data into an array
    var data = [trace];

    // Define layout
    var layout = {
        title: 'Comparison of Incidence of OTU per Individual',
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Incidence" }
    };

    // Use Plotly to create the chart
    Plotly.newPlot("bubble", data, layout);
}

// Function to update metadata based on selected sample
function updateDemo(metadata) {
    // Pull the data
    var metaData = d3.select('#sample-metadata');

    // Clear existing metadata
    metaData.html("");

    // Put the information into an object
    Object.entries(metadata).forEach(([key, value]) => {
        metaData.append('p').text(`${key}: ${value}`);
    });
}

// Call init function to initialize the page
init();