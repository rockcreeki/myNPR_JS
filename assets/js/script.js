$(document).ready(function(e){
  $('#topics').on('click', myNPR.showTopics);
  $('#tags').attr('disabled','disabled').on('click', myNPR.showTags);
  $('#genres').on('click', myNPR.showGenres); 
  $('#programs').on('click', myNPR.showPrograms); 
  $('#bios').on('click', myNPR.showBios); 
  //myNPR.loadTopicsAndGenres();
  //myNPR.loadTags();
});

