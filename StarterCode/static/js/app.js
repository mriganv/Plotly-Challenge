
// Loading Json Data
const path = "samples.json"
const data = d3.json(path)
d3.json(path).then (function(data){
    // console.log(data);
    }); 

//  #######################   // 
    // Sample id's 
//  #######################   // 

function init() {

d3.json("samples.json").then((data) => {

// Appending the select id (#selDataset) with the names of the Id's 
let selector = d3.select("#selDataset");

let firstData = data.names[0]; 

// console.log(data.names);

// Appending with the dropdown names in the Text subject ID
data.names.forEach((name => {
            var option = selector.append("option");
            option.text(name);
        }))

// Calling the metadataSample and Charts to display the first ID(940) charts 
metadataSample(firstData)
Charts(firstData);


});
}

//  #######################   // 
    // Metadata sample
//  #######################   // 

    function metadataSample(sample) {

    d3.json("samples.json").then((data) => {

        // Selecting the Metadata
        var metadata = data.metadata;

        // Filtering the Metadata samples
        var sampleData = metadata.filter(item => item.id == sample);

        // Clearing the duplicates everytime a new sample is initiated to display
        var sampleMetadata = d3.select("#sample-metadata").html("");
        
        // Appending the Div(#sample-metadata) with metadata paragraph
        Object.entries(sampleData[0]).forEach(([key, value]) => {

            sampleMetadata.append("p").text(`${key}: ${value}`);
        });

        // console.log(metadata);
    });
}

//  #########################################################  // 
    // Plotting all three charts (Bar, Bubble and Gauge)
//  #########################################################  // 

function Charts(selection) {

    //  #######################   // 
    //      Bubble Chart
    //  #######################   // 

    d3.json("samples.json").then((data) => {

        var parsedData = data.samples;

        // Filtering the Sample id's
        var samples = parsedData.filter(item => item.id == selection)[0];

        // Selecting all sample values
        var sample_values = samples.sample_values;

        // Selecting all otu_Ids
        var otu_Ids = samples.otu_ids;

        // Selecting all otu_labels
        var otu_Labels = samples.otu_labels; 

        // Filtering the Wash Frequency Numbers
        var wash = data.metadata.filter(d => d.id.toString() === selection)[0];

        var washFreq = wash.wfreq;

        // Layout for Bubble Chart
        var LayoutBubble = {
        xaxis: { title: "OTU ID"},
        hovermode: "closest",
        };
        
        // Data for Bubble Chart
        var DataBubble = [ 
        {
        x: otu_Ids,
        y: sample_values,
        text: otu_Labels,
        mode: "markers",
        marker: {
            color: otu_Ids,
            size: sample_values,
            colorscale:"Jet"
            }
        }
    ];

    // Plotting the Bubble Chart
    Plotly.newPlot("bubble", DataBubble, LayoutBubble);

    //  #######################   // 
    //      Bar Chart
    //  #######################   // 

        // Slicing the samples values to the top 10
        let sliced_array = samples.sample_values.slice(0,10);

        // Reversing the samples
        let sample_values1 = sliced_array.reverse();

        // Slicing the otu_Ids to the top 10
        let sliced_otuids = samples.otu_ids.slice(0,10);
    
        // Reversing the Sliced otuids
        let otu_ids1 = sliced_otuids.reverse();

        // Slicing the otu_lables to the top 10
        let sliced_otu_labels = samples.otu_labels.slice(0,10); 

        // Reversing the Sliced labels
        let otu_labels1 = sliced_otu_labels.reverse()

        // Concatinating the word OTU  for each otu_ids to display in the chart
        let labels = otu_ids1.map(item => "OTU"+ " " + item)
    
        
    // Data for bar Chart
    let tracebar = [{

        x: sample_values1, 
        y: labels, 
        text:otu_labels1 , 
        type: "bar",
        orientation:"h",
        marker:{
                color: 'indianred'
            }
        
    }] 

    // layout for bar Chart
    let layoutbar = {
    title: {
            text: `<b>Top 10 OTUs</b>`,
            font: {
                size: 18,
                color: 'rgb(34,94,168)'
            }
        }
    }
    // Plotting Bar Chart
    Plotly.newPlot("bar", tracebar, layoutbar);

    //  #######################   // 
    //      Gauge Chart
    //  #######################   // 

    // I see a lot of Wash Frequencies with null values
    // Assigning them to zero, as it will be easy to display in the chart with the indicator pointing to Zero
    if (washFreq == null) {
            washFreq = 0;
        }
    // Data for Gauge chart
    var data = [
    {
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: `<b>Belly Button Washing Frequency</b><br><br>Scrubs per Week`,  font: {
                    size: 18,
                    color: 'rgb(34,94,168)'
                },},
        type: "indicator",
        mode: "gauge+number+delta",
        gauge: {
            bar: {'color': "rgb(34,94,168)"}, 
            bgcolor: "white",
            borderwidth: 1,
            bordercolor: "rgb(46,0,0)",
            axis: { range: [0, 9],   tickmode: 'linear', 
                    tickfont: {
                        size: 15
                    }},
            steps: [
                        { range: [0, 1], color: "#fbf2f2" },
                        { range: [1, 2], color: "#f2d9d9"  },
                        { range: [2, 3], color: "#e9c0c0" },
                        { range: [3, 4], color: "#e0a7a7" },
                        { range: [4, 5], color: "#d78e8e" },
                        { range: [5, 6], color: "#cf7474" },
                        { range: [6, 7], color: "#c65b5b" },
                        { range: [7, 8], color: "#bd4242" },
                        { range: [8, 9], color: "#a43939"},
                        
        ],
        }
    }];
        // Layout for Gauge Chart
        var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

        // Plotting Gauge Chart
        Plotly.newPlot('gauge', data, layout);

    });

}

//  #################################   // 
    // Plots for new samples 
//  #################################  // 

function optionChanged(newData) {

    metadataSample(newData);
    Charts(newData);
}

init();

