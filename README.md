# Plotly-Challenge - Belly Button Biodiversity


![Bacteria by filterforge.com](http://robdunnlab.com/wp-content/uploads/microbes-sem.jpg)

In this assignment, an interactive dashboard was built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Demographics information is dynamically populated based upon a user-selected test subject ID. A bar chart, bubble chart and a bonus gauge chart also update once the ID is changed. Code has been written using Plotly, JavaScript, HTML, CSS, and D3.js.

All CSS and JS required are under the static folder. The main HTML file index.html and images are in the root folder of the Github repo.


### Deployed Dashboard can be viewed here : [Belly Button Diversity Dashboard](https://mriganv.github.io/Plotly-Challenge/) 

## Plotly

The following plots are included in the dashboard using the Plotly.js framework:

1. Used  D3 library to read in `samples.json`.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Used `sample_values` as the values for the bar chart.

* Used `otu_ids` as the labels for the bar chart.

* Used `otu_labels` as the hovertext for the chart.

![Bar Graph - Top 10 Otu_Ids](https://user-images.githubusercontent.com/81407869/134235956-27d54cc1-3e48-4d41-893a-696fbf135405.png)

3. Created a bubble chart that displays each sample.

* Used `otu_ids` for the x values.

* Used `sample_values` for the y values.

* Used `sample_values` for the marker size.

* Used `otu_ids` for the marker colors.

* Used `otu_labels` for the text values.

![Bubble Chart](https://user-images.githubusercontent.com/81407869/134236013-255fa55e-aa84-4fb9-9d6a-a7d05d008f22.png)


* Created  a Gauge Chart  to plot the weekly washing frequency of the individual for the gauge values ranging from 0 to 9. 

* Updates the chart whenever a new sample is selected.
 
![Gauge Chart](https://user-images.githubusercontent.com/81407869/134561928-310374e7-6067-4ca1-9b06-f5e6ca1d3f55.png)

4. Displayed the sample metadata, i.e., an individual's demographic information.

5. Displayed each key-value pair from the metadata JSON object on the page.

 ![Demographic Info](https://user-images.githubusercontent.com/81407869/134236130-e1f5c1cc-044d-4d9e-a2ca-6c00d9d5e583.jpg)


6. Updates all of the plots every time a new sample is selected.

Additionally, created layout that you would like for your dashboard. 

![Dashboard](https://user-images.githubusercontent.com/81407869/134287321-c0c11f8a-6919-4a1d-8416-1639078bf6e7.png)

## References

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)


