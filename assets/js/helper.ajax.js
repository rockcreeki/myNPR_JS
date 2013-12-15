var AJAX = {};

$.ajaxSetup({
  type: 'GET',
  dataType: 'jsonp',
  data: { 
      output: 'json',
      apiKey: 'YOURNPRAPIKEY'
  }  
});

/*** Topics ***/
function requestTopics(){
  console.info('request topics');
  return $.ajax(as.uri.list,{
      data: {
          id : 3002   
      },
      success: requestTopicsSuccess,
      error: requestTopicsError
  });  
}

function requestTopicsSuccess(data, status, xhr){
  console.info('request topics success');
}

function requestTopicsError(xhr, status, error){
  console.info('request topics error');
  $('#content').text('An error occurred: ' + error + ': ' + status);    
}

/*** Tags ***/
function requestTags(){
  console.info('request tags');
  return $.ajax(as.uri.list,{
      data: {
          id : 3024
      },
      success: requestTagsSuccess,
      error: requestTagsError,
      cache: true 
  });  
}

function requestTagsSuccess(data, status, xhr){
  console.info('request tags success');
}

function requestTagsError(xhr, status, error){
  console.info('request tags error');
  $('#content').text('An error occurred: ' + error + ': ' + status);    
}

/*** GENRES ***/
function requestGenres(){
  console.info('request genres');
  return $.ajax(as.uri.list,{
      data: {
          id : 3018   
      },
      success: requestGenresSuccess,
      error: requestGenresError
  });  
}

function requestGenresSuccess(data, status, xhr){
  console.info('request genres success');
}

function requestGenresError(xhr, status, error){
  console.info('request genres error');
  $('#content').text('An error occurred: ' + error + ': ' + status);    
}


(function(async){
  as = async;
  as.uri = {
      list: 'http://api.npr.org/list'
  };
  as.requestTopics = requestTopics;
  as.requestGenres = requestGenres;
  as.requestTags = requestTags;
})(AJAX || (AJAX = {}));