var myNPR = {};

$(document).ready(function(e){
  $('#topics').on('click', myNPR.showTopics);
  $('#tags').attr('disabled','disabled').on('click', myNPR.showTags);
  $('#genres').on('click', myNPR.showGenres); 
  loadTopicsAndTags();
  //loadTopicsAndGenres();
})

function loadTopicsAndTags(){
  $.when(AJAX.requestTopics(), AJAX.requestTags())
    .then(function(topics, tags){
      myNPR.topics = topics[0];
      myNPR.tags = tags[0];
      // Over 17k tags so it takes a while to load  =)
      // The tags button is disabled until they're done loading
      $('#tags').removeAttr('disabled');
    });  
}

function loadTopicsAndGenres(){
  $.when(AJAX.requestTopics(), AJAX.requestGenres())
    .then(function(topics, genres){
      myNPR.topics = topics[0];
      myNPR.genres = genres[0];
    });  
}

function showTopics(){
  console.info('show topics');
  if(!myNPR.topics)
  {
    $.when(AJAX.requestTopics())
      .then(function(data){myNPR.topics = data; updateContentDiv(myNPR.topics);});
  }
  else {
    updateContentDiv(myNPR.topics);
  }
}

function showTags(){
  console.info('show tags');
  if(!myNPR.tags)
  {
    $.when(AJAX.requestTags())
      .then(function(data){myNPR.tags = data; updateContentDiv(myNPR.tags);});
  }
  else {
    updateContentDiv(myNPR.tags);
  }
}

function showGenres(){
  console.info('show genres');
  if(!myNPR.genres)
  {
    $.when(AJAX.requestGenres())
      .then(function(data){myNPR.genres = data; updateContentDiv(myNPR.genres)});
  }
  else {
    updateContentDiv(myNPR.genres); 
  }
}

function updateContentDiv(content){
  console.info('show content div');
  $('#content').text(JSON.stringify(content)); 
}

(function(app){
  a = app;
  a.topics = null;
  a.genres = null;
  a.tags = null;
  a.showTopics = showTopics;
  a.showGenres = showGenres;
  a.showTags = showTags;
})(myNPR || (myNPR = {}));

