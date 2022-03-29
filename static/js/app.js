// Function that populates the metadata
function demoInfo(sample) {
    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;

        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];

        d3.select("#sample-metadata").html("");

        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });
    });
}

// Function that build bar chart
function buildBarChart(sample) {
    let data = d3.json("samples.json");

    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // Bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout)

    });
}

// Function that build bubble chart
function buildBubbleChart(sample) {
    let data = d3.json("samples.json");

    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0];

        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;

        // Bubble chart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }

        let layout = {
            title: "Bacteria Cultures per Sample",
            hovermode: "closest",
            xaxis: { title: "OTU ID" }
        };

        Plotly.newPlot("bubble", [bubbleChart], layout)

    });
}


// Gauge chart
function buildGaugeChart(sample) {
    let data = d3.json("samples.json");

    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;

        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        let resultData = result[0].wfreq;

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: resultData,
                title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 400 },
                gauge: { axis: { range: [null, 9] } }
            }
        ];

        var layout = { height: 400 };
        Plotly.newPlot('gauge', data);
    });
}

// Function that initializes the dashboard
function initialize() {
    var select = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        let firstSample = sampleNames[0];
        demoInfo(firstSample);
        buildBarChart(firstSample);
        buildBubbleChart(firstSample);
        buildGaugeChart(firstSample);
    });


}

// Function that updates the dashboard
function optionChanged(item) {
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);
    buildGaugeChart(item);
}

initialize();