# Plotly-Challenge - Belly Button Biodiversity


![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, an interactive dashboard was built to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

Demographics 
## Step 1: Plotly

The following plots are included in the dashboard using the Plotly.js framework:

1. Used  D3 library to read in `samples.json`.

2. Created a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Used `sample_values` as the values for the bar chart.

* Used `otu_ids` as the labels for the bar chart.

* Used `otu_labels` as the hovertext for the chart.

  ![bar Chart](/Images/Bar Graph - Top 10 Otu_Ids.png)

3. Created a bubble chart that displays each sample.

* Used `otu_ids` for the x values.

* Used `sample_values` for the y values.

* Used `sample_values` for the marker size.

* Used `otu_ids` for the marker colors.

* Used `otu_labels` for the text values.

![Bubble Chart](/Images/Bubble Chart.png)

* Created  a Gauge Chart  to plot the weekly washing frequency of the individual for the gauge values ranging from 0 to 9. 

* Updates the chart whenever a new sample is selected.

![Weekly Washing Frequency Gauge](/Images/Gauge Chart.png)



4. Displayed the sample metadata, i.e., an individual's demographic information.

5. Displayed each key-value pair from the metadata JSON object on the page.

 ![Demographics Info](/Images/Demographic Info.jpb)

6. Updates all of the plots every time a new sample is selected.

Additionally, created layout that you would like for your dashboard. 

![Dashboard](/Images/Dashboard.png)


## Deployment

* The dashboard can be viewed here: ![Belly Button Diversity Dashboard](/Images/Dashboard.png) 



## Hints

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.

## Rubric

[Unit 14 Rubric - Plot.ly Homework - Belly Button Biodiversity](https://docs.google.com/document/d/1wD_hOEJELD2hifTaECfx66xlpEdJeYm3mL8q2Zoq1vo/edit?usp=sharing)

- - -

## References

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

- - -

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
