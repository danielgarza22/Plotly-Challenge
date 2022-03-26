








// Function that populates the metadata
function demoInfo(sample)
{
    // console.log(sample);
    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
        // console.log(metaData);

        let result = metaData.filter(sampleResult => sampleResult.id == sample);
        // console.log(result);

        let resultData = result[0];
        console.log(resultData);

        d3.select("#sample-metadata").html("");

        Object.entries(resultData).forEach(([key, value]) =>{
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
    
        });
    });
}

// Function that build the graphs
function buildBarChart(sample)
{
    console.log(sample)
}


// Function that initializes the dashboard
function initialize()
{
    // let data = d3.json("samples.json")
    // console.log(data);

    var select = d3.select("#selDataset");
    
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        // console.log(sampleNames);
    
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        let firstSample = sampleNames[0];
        demoInfo(firstSample);
        buildBarChart(firstSample);
    });

    
}

// Function that updates the dashboard
function optionChanged(item)
{
    demoInfo(item);
    // console.log(item);
    buildBarChart(item);
}


initialize();