//https://www.d3indepth.com/selections/
//stackoverflow for "this" d3 keyword
//https://stackoverflow.com/questions/39607389/what-does-d3-selectthis-return 
//https://www.w3schools.com/howto/howto_js_filter_lists.asp
//https://www.w3schools.com/howto/howto_js_filter_table.asp

// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");


function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// Keep track of all filters
var filters = [];

// This function will replace your handleClick function
function updateFilters() {

  // Save the element, value, and id of the filter that was changed
  
  
  //element
  let inputElement = d3.select(this);
  //id
  let inputValue = inputElement.property("value");
  //value
  let inputID = inputElement.attr("id");
  
  console.log(inputValue, inputID);

  // If a filter value was entered then add that filterId and value to the filters list. Otherwise, clear that filter from the filters object
  if(inputValue){
    filters[inputID] = inputValue;
  }
  else{
    delete filters[inputID];
  }
  // Call function to apply all filters and rebuild the table
  filterTable();
}

function filterTable() {

  // Set the filteredData to the tableData
    let filteredData = tableData;
  // Loop through all of the filters and keep any data that matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key]===value)
    });
    
  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}


// Attach an event to listen for changes to each filter. selects all input=text
d3.selectAll("input").on("change", updateFilters);



// Build the table when the page loads
buildTable(tableData);
