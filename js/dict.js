
//a Function that call the two function it depends on the success
$(document).ready(function () {
    $("#onLookup").click(lookupWord);
    $(document).keydown(function (event) {
      if(event.keyCode == 13){
        lookupWord();
      }   
    });
  });
  //a function that will fire a connection to DB and get tha data, when the lookup button clicked
  function lookupWord() {
    $.ajax({
      url: "http://localhost:2023/searchWord",
      type: "get",
      data: { term: $("#term").val() },
      dataType: "json",
      success: showSearchedResult,
      error: failedToShow,
    });
  }
  //if the connection word will call this 
  function showSearchedResult(data) {

    $("#tableBodyId").empty(); 
    $("#word").html($("#term").val().trim());
    
    if($("#term").val().trim()==""){
      $("#tableBodyId").append(
      "<th>Please enter a valid term Thanks. </th>"
      );
    }else if(data.length == 0){
      $("#tableBodyId").append(
        "<th>Sorry,The word ( "+$("#term").val()+" ) was not found, try different Term Please. </th>"
      );
    }else{
      
      for (var i in data) {
        $("#tableBodyId").append(
          "<tr><td>" +
            (parseInt(i) + 1) + " (" + data[i].wordtype + ")" + " :: " + data[i].definition +
            "</td></tr>"
        );
      }
    }
  }
  //if the connection is failed it will display this
  function failedToShow(error) {
    console.log(`Error ocured on the connection ${error.responseText}`);
  }