var myNPR = {};

$(document).ready(function(e){
  $('#topics').on('click', myNPR.showTopics);
  $('#tags').attr('disabled','disabled').on('click', myNPR.showTags);
  $('#genres').on('click', myNPR.showGenres); 
  myNPR.loadTopicsAndGenres();
  myNPR.loadTags();
});

(function(app){
  app.topics = null;
  app.genres = null;
  app.tags = null;
  
  var uri = {
    list : 'http://api.npr.org/list'
  },
  types = {
    topics : {text: 'topics', id: 3002},
    genres : {text: 'genres', id: 3018},
    tags : {text: 'tags', id: 3024}
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
    console.info('show topics');
    if(!app.topics)
    {
      $.when(AJAX.requestList(topicsRequestData))
        .then(function(data){app.topics = data; updateContentDiv(app.topics);});
    }
    else {
      updateContentDiv(app.topics);
    }
  }
  
  function showTags(){
    console.info('show tags');
    if(!app.tags)
    {
      $.when(AJAX.requestList(tagsRequestData))
        .then(function(data){
          app.tags = data; 
          updateContentDiv(app.tags);
        });
    }
    else {
      updateContentDiv(app.tags);
    }
  }
  
  function showGenres(){
    console.info('show genres');
    if(!app.genres)
    {
      $.when(AJAX.requestList(genresRequestData))
        .then(function(data){
          app.genres = data; 
          updateContentDiv(app.genres);
        });
    }
    else {
      updateContentDiv(app.genres); 
    }
  }
  
  function updateContentDiv(content){
    console.info('show content div');
    $('#content').text(JSON.stringify(content)); 
  }
  
  app.showTopics = showTopics;
  app.showGenres = showGenres;
  app.showTags = showTags;
  app.loadTopicsAndGenres = loadTopicsAndGenres;
  app.loadTags = loadTags;
})(myNPR || (myNPR = {}));

