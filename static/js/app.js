
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

    // --------------------------
    // Layout for Bubble Chart
    //---------------------------
        var LayoutBubble = {
        xaxis: { title: "OTU ID"},
        hovermode: "closest",
        };
        
    // --------------------------
    // Data for Bubble Chart
    //---------------------------
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
    
        
    
    
    // --------------------------
    // Data for bar Chart
    //---------------------------
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

    // ---------------------------
    // layout for bar Chart
    // ---------------------------

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
    // find an angle for each washfrequency portion on the chart
    var angle = (washFreq / 9) * 180;

    // Trig to calc meter point
    var degrees = 180 - angle,
        radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
        pathX = String(x),
        space = ' ',
        pathY = String(y),
        pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    // --------------------------
    // data for the Gauge chart
    //---------------------------
    var data = [{ type: 'scatter',
        x: [0], y:[0],
        marker: {size: 35, color:'rgb(34,94,168)'},
        showlegend: false,
        name: 'speed',
        text: angle,
        hoverinfo: 'text+name'},
    { values: [100/9,100/9,100/9,100/9,100/9,100/9,100/9,100/9,100/9, 100],
        rotation: 90,
        text: ['8-9', '7-8', '6-7', '5-6',
                    '4-5', '3-4', '2-3', '1-2','0-1', ''],
        textinfo: 'text',
        textposition:'inside',
        marker: {colors:[ "#bd4242", 
            "#cf7474","#c65b5b" ,"#cf7474" ,"#d78e8e" ,"#e0a7a7", "#e9c0c0","#f2d9d9" ,"#fbf2f2", "white"]},
        labels: ['8-9', '7-8', '6-7', '5-6',
                    '4-5', '3-4', '2-3', '1-2', '0-1',''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false,
        hole: 0.5,
    }];

    // --------------------------
    // layout for Gauge chart
    //---------------------------
    var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: 'rgb(34,94,168)',
            line: {
                color: 'rgb(34,94,168)', 
                linewidth: 5
            }
            }],
        title: { text: `<b>Belly Button Washing Frequency</b><br>Scrubs per Week`,  font: {
                        size: 18,
                        color: 'rgb(34,94,168)'}
                    },
        height: 500,
        width: 500,
        xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout, {responsive: true});

        })
    }
    //  #################################   // 
        // Plots for new samples 
    //  #################################  // 

    function optionChanged(newData) {

        metadataSample(newData);
        Charts(newData);
    }

init();

