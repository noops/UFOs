//import the data from data.js
const tableData = data;

//reference the HTML table using D3
var tbody = d3.select("tbody");

function buildTable(data){
    //first clear out any existing data
    tbody.html("");
    //loop through each object in the data and append a row and cells for each value in the row
    data.forEach((dataRow) => {
        //append a row to the table body
        let row = tbody.append("tr");
        //loop through each field in the dataRow and add each value as a table cell (td)
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });

}

function handleClick(){
    //get datetime value from filter
    let date = d3.select("#datetime").property("value");
    let filteredData = tableData;
    //check if a date was entered and filter data using that date
    if (date){
        //filter the default data to show only the date entered
        filteredData = filteredData.filter(row => row.datetime === date);
    };
    //rebuild table using filtered data. if no date was entered, then filteredData will just be original tableData
    buildTable(filteredData);

}
//attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

//build table when page loads
buildTable(tableData)


