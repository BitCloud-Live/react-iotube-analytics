# IoTube Analytic Dashboard

A dynamic powerful, well-structured dashboard front-end for IoTube analytics. 

## Available Scripts

In the project directory, you can run:

### `yarn install`

This will install the third party modules.

### `yarn start`

This will start the dashboard on http://localhost:3000/

# List of components 
## SearchBox

This component is intent to be a search mechanism but currently work as a select option
for bridges 

## NumberIconBox

This component is responsible for rendering the Cards at the top of the page. 

## StackedBarChart

This is a dynamic component which can run influxdb queries and show them as stacked bar chart.
This chart component dynamically creates the stacks based on the influxdb queries, 
So just by designing query a chart could be generated dynamically, also queries can have dynamic parameters every parameter inside %some_parameter% could be named and replaced dynamically. 

## TopCards

This component contains some NumberIconBox 

## AnalticsList 

This component is responsible for displaying the list at the bottom of charts. 

# Utils 
## query_runner 

Simple utility function to call go api for running influxdb queries 

# TODO 
- Some dates in components such as NumberIconBox are statically set to last 30 days which is better to be handled by a date picker. 
