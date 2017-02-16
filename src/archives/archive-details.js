app.page("archive-details", function()
{

  var $section = document.getElementById('archive-details');

  var tpl = doT.template($section.innerHTML);

  var currentArchive = null;

  //default is not shown
  $section.innerHTML=null;

  var remove = function(){
    if (confirm('sure you want to remove this archive ?')){
      remoteStorage.archives.remove(currentArchive.id).then(function(){
        history.back();
      })

    }
    return false;
  }

  var update = function(e){
    e.preventDefault();
    var $comment = $section.querySelector('textarea');
    if ($comment.value.length==0){
      return false;
    }
    currentArchive.comment = $comment.value;

    remoteStorage.archives.store(currentArchive).then(function(archive){
      applyTemplate(archive);
    });
  }

  var applyTemplate = function(archive){
    $section.innerHTML = tpl(archive);
    $section.querySelector('button[name="remove"]').onclick=remove;
    $section.querySelector('input[name="add"]').onclick=update;
  }


  return function(params) {

    remoteStorage.archives.find(params).then(
      function(archive){
        currentArchive = archive;
        applyTemplate(archive);
      }
    )


  }
});
