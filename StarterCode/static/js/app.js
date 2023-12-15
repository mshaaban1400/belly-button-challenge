// Use D3 to read in the samples.json file
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    console.log(data);

    // Extract necessary data from the JSON
    const samples = data.samples;
    const metadata = data.metadata;

    // Populate the dropdown menu with sample names
    const dropdown = d3.select("#selDataset");
    dropdown.selectAll("option")
        .data(samples)
        .enter()
        .append("option")
        .text(d => d.id)
        .attr("value", d => d.id);

    // Populate the dropdown menu with the name for each individual
    // iterate over each name in the data.names array
    data.names.forEach((name) => {
        // append an object element to the dropdown 
        dropdown.append("option")
            // set the text content of the option to the name
            .text(name)
            // set the value attribute of the option to the name
            .property("value", name);
});

// Function to update charts and metadata based on selected sample
function updateCharts(selectedSample) {

    const barValues = selectedSample.sample_values.slice(0, 10).reverse();
    const barLabels = selectedSample.otu_ids.slice(0, 10).reverse();
    const barHoverText = selectedSample.otu_labels.slice(0, 10).reverse();

    // Update bar chart
    // select the bar chart container
    const barChart = d3.select("#bar");

    // Clear the existing chart
    barChart.html("");

    // trace the data
    var trace = {
        x: barValues,
        y: barLabels.map(id => `OTU ${id}`),
        text: barHoverText,
        type: "bar",
        orientation: "h"
    };

    // Create data array for the plot
    var data = [trace];

    // Define layout
    var layout = {
        title: 'Top 10 OTUs Found in the Belly Button',
        xaxis: { 
            title: 'Incidence'
            },
        yaxis: {
             title: 'OTU ID'    
            }
    };

    // Use Plotly to create the chart
    Plotly.newPlot("bar", data, layout);


    // Update bubble chart
    const bubbleChart = d3.select("#bubbleChart");

    // clear the existing chart
    bubbleChartContainer.html("");

    // pull the data
    var sampleValues = selectedData.sample_values;
    var otuIDs = selectedData.otu_ids;
    var otuLabels = selectedData.otu_labels;

    // Create trace for the bubble chart
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

    // Create data array for the plot
    var data = [trace];

    // Define layout
    var layout = {
    title: "Bubble Chart - OTU ID vs Sample Values",
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Values" }
    };

    // Use Plotly to create the chart
    Plotly.newPlot("bubble", data, layout);

    // Update metadata
    const selectedMetadata = metadata.find(d => d.id === parseInt(selectedSample));
    const metadataDiv = d3.select("#metadata");
    metadataDiv.html(""); // Clear previous metadata
    // ... (code to display key-value pairs from metadata)

    }

    // Initial update with the first sample
    updateCharts(samples[0].id);

    // Event listener for dropdown change
    dropdown.on("change", function() {
    const selectedSample = this.value;
    updateCharts(selectedSample);
    });

})
.catch(error => console.error("Error fetching data:", error));