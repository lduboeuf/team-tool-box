app.page("sync", function()
{

  var $textAreaTeams = document.querySelector('textarea[name="teams"]');
  var $textAreaArchive = document.querySelector('textarea[name="archives"]');

  var $restoreTeamsBtn = document.querySelector('#sync button[name="restore_teams"]');
  var $restoreArchivesBtn = document.querySelector('#sync button[name="restore_archives"]');
  //$textAreaArchive.value = LZString.compressToEncodedURIComponent(localStorage.getItem('ttb-archive'));
  //$textAreaTeams.value = LZString.compressToEncodedURIComponent(localStorage.getItem('ttb-team'));


  $restoreArchivesBtn.onclick = function(){
    var ret = confirm('sure you want to restore archives ?, this will erase all datas...');
    if (ret){
      ArchiveRepository.import($textAreaArchive.value);
      alert('cool, data restored');
    }

  }

  $restoreTeamsBtn.onclick = function(){
    var ret = confirm('sure you want to restore teams ?, this will erase all datas...');
    if (ret){
      TeamRepository.import($textAreaTeams.value);
      alert('cool, data restored');
    }

  }


  return function(params) {
    $textAreaTeams.value = TeamRepository.export();
    $textAreaArchive.value = ArchiveRepository.export();
  }
});
