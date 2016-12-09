app.page("archive-save", function()
{

  var $form = document.querySelector('#archive-save form');
  var $name = $form.querySelector('name');
  var $desc = $form.querySelector('description');
  var $save = $form.querySelector('.button');

  var $currentOutput;

  $save.onclick = function(){
    var data = {
      name: $name.value,
      description: $desc.value,
      output: currentOutput
    }
    TeamRepository.archiveSave(data);

  }

  return function(params) {
    //nothing to handle here
    $currentOutput = params;
    console.log(params);
  }
});
