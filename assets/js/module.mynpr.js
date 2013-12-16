var myNPR = {};

(function(app){
  app.topics = null;
  app.genres = null;
  app.tags = null;
  app.programs = null;
  app.bios = null;
  
  var uri = {
    list : 'http://api.npr.org/list'
  },
  types = {
    topics : {text: 'topics', id: 3002},
    genres : {text: 'genres', id: 3018},
    tags : {text: 'tags', id: 3024},
    programs: {text: 'programs', id: 3004},
    bios: {text: 'bios', id: 3007}
  },
  topicsRequestData = {
    type  : types.topics.text,
    uri   : uri.list,
    data  : {
      id  : types.topics.id
    }
  },
  genresRequestData = {
    type  : types.genres.text,
    uri   : uri.list,
    data  : {
      id  : types.genres.id
    }
  }
  tagsRequestData = {
    type  : types.tags.text,
    uri   : uri.list,
    data  : {
      id  : types.tags.id
    }
  },
  programsRequestData = {
    type  : types.programs.text,
    uri   : uri.list,
    data  : {
      id  : types.programs.id
    }
  },
  biosRequestData = {
    type  : types.bios.text,
    uri   : uri.list,
    data  : {
      id  : types.bios.id
    }
  };
  
  function loadTags(){
    $.when(AJAX.requestList(tagsRequestData))
      .then(function(tags){
        app.tags = tags[0];
        // Over 17k tags so it takes a while to load  =)
        // The tags button is disabled until they're done loading
        $('#tags').removeAttr('disabled');
      });  
  }
  
  function loadTopicsAndGenres(){
    $.when(AJAX.requestList(topicsRequestData), AJAX.requestList(genresRequestData))
      .then(function(topics, genres){
        app.topics = topics[0];
        app.genres = genres[0];
      });  
  }
  
  function showTopics(){
    showList(topicsRequestData)
  }
  
  function showTags(){
    showList(tagsRequestData)
  }
  
  function showGenres(){
    showList(genresRequestData);
  }
  
  function showPrograms(){
    showList(programsRequestData);
  }
  
  function showBios(){
    showList(biosRequestData);
  }
  
  function showList(requestData){
    console.info('show ' + requestData.type);
    if(!app[requestData.type])
    {
      $.when(AJAX.requestList(requestData))
        .then(function(data){
          app[requestData.type] = data; 
          updateContentDiv(app[requestData.type]); 
        });
    }
    else {
      updateContentDiv(app[requestData.type]);   
    }
  }
  
  function updateContentDiv(content){
    console.info('show content div');
    $('#content').text(JSON.stringify(content)); 
  }
  
  app.showTopics = showTopics;
  app.showGenres = showGenres;
  app.showTags = showTags;
  app.showPrograms = showPrograms;
  app.showBios = showBios;
  app.loadTopicsAndGenres = loadTopicsAndGenres;
  app.loadTags = loadTags;
})(myNPR || (myNPR = {}));

