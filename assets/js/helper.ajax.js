var AJAX = {};

$.ajaxSetup({
  type: 'GET',
  dataType: 'jsonp',
  data: { 
      output: 'json',
      apiKey: 'YOURNPRAPIKEY'
  }  
});

(function(async){
  
  function requestList(options){
    console.info('request ' + options.type);
    return $.ajax(options.uri,{
        data: options.data,
        context: options,
        success: requestListSuccess,
        error: requestListError
    });  
  }
  
  function requestListSuccess(data, status, xhr){
    console.info('request ' + this.type + ' list success');
  }
  
  function requestListError(xhr, status, error){
    console.info('request ' + this.type + ' list error');
    $('#content').text('An error occurred: ' + error + ': ' + status);    
  }
  
  async.requestList = requestList;
})(AJAX || (AJAX = {}));