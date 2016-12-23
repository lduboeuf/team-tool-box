app.page("archive-save", function()
{

  var $form = document.querySelector('#archive-save form');
  var $name = $form.querySelector('input[name="name"]');
  var $desc = $form.querySelector('textarea[name="description"]');
  var $save = $form.querySelector('.button');
  var $teamList = document.querySelector('#archive-save .team-list');

  var tplTeamList = doT.template($teamList.innerHTML);

  var currentOutput;

  $save.onclick = function(e){
    e.preventDefault();
    if ($name.value.length==0){
      return false;
    }
    var data = {
      name: $name.value,
      description: $desc.value,
      teams: currentOutput
    }
    remoteStorage.archives.store(data).then(function(){
      alert('cool, generated teams archived, you can retrieve it in Archives menu');
      app.back({event:'onSavedOutput'});
    });

  }

  return function(params) {
    currentOutput = params;

    $teamList.innerHTML = tplTeamList(currentOutput);
    $name.value ="";
    $desc.value="";
  }
});
