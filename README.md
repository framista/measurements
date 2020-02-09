# measurements

## General info
Application to saving data from measurement of 4 temperatures in database, showing the data on the chart, generating report file (pdf and csv).

## Technologies
* NodeJS
  * sqlite3 (dao)
  * express
  * axios
  * webpack and babel
  * chart.js
  * jspdf
* Javascript
* CSS3
    * Grid
* HTML5

## Setup
To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer. From your command line:
```
# Clone this repository
$ git clone https://github.com/framista/measurements.git

# Go into the repository
$ cd measurements

# Go into the server
$ cd server/
# Install dependencies 
$ npm install
# Run the server
$ node index

# Go into the client
$ cd client/
# Install dependencies 
$ npm install
# Open index.html
```

## Features
* display data from sqlite db on chart for selected date (try for date 10.02.2020)
* generate pdf raport with parameters and chart
* generate csv file with data - temperatures and time
* insert, update data to sqlite db from site
