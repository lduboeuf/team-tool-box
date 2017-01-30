app.page("archive-save", function()
{

  var $form = document.querySelector('#archive-save form');
  var $name = $form.querySelector('input[name="name"]');
  var $desc = $form.querySelector('textarea[name="description"]');
  var $btnCancel = $form.querySelector('button[name="cancel"]');
  var $btnSave = $form.querySelector('input[type="submit"]');


  var currentOutput;
  $btnCancel.onclick = function(e){
    e.preventDefault();
    app.back();
  }

  $btnSave.onclick = function(e){
    e.preventDefault();
    if ($name.value.length==0){
      return false;
    }
    var dt = new Date();
    var newdate = dt.getFullYear() + "/" + (dt.getMonth() + 1) + "/" + dt.getDate();
    var data = {
      name: $name.value,
      description: $desc.value,
      date: newdate,
      teams: currentOutput
    }
    remoteStorage.archives.store(data).then(function(){
      alert('cool, generated teams archived, you can retrieve it in Archives menu');
      app.back({event:'onSavedOutput'});
    });

  }

  return function(params) {
    currentOutput = params;

    $name.value ="";
    $desc.value="";
  }
});
