//reusable components
app.checkList = (function(){

  var $cl = document.getElementById('check-list');
  var tplCheckList = doT.template($cl.innerHTML);
  //empty component
  $cl.innerHTML =null;

  //provide a memberId->member object key-value
  function mapMembers(teams){
    var currentSelection = {};
    for (var t_id in teams){
      var members = teams[t_id].members;
      for (var i=0; i < members.length; i++){
        var m = members[i];
        currentSelection[m.id] = m;
      }
    }
    return currentSelection;
  }

  function applyTo($target){
    var $this = $target;
    var members= null;

    $this.render = function(teams){
      members = mapMembers(teams);
      $this.innerHTML = tplCheckList(teams);
      $this.querySelector('input[name="tick_all"]').onclick = $this.selectAll;
    }

    $this.selectAll =function(){
      var $checkbox_members = $this.querySelectorAll('input[name="member_id"]');
        var checked = this.checked;
        for (var i=0; i < $checkbox_members.length; i++){
          $checkbox_members[i].checked = checked;
        }
    }

    $this.getSelectedItems = function(){
        var $checkboxes = $this.querySelectorAll('input[name="member_id"]');
        var items = [];
        for (var i=0; i < $checkboxes.length; i++){
          if ($checkboxes[i].checked){
            items.push(members[$checkboxes[i].value]);
          }
        }
        return items;
    }



  }

  return {
    applyTo: applyTo
  }

})();


app.selectList = (function(){

  var $select = document.getElementById('select-list');
  var tplList = doT.template($select.innerHTML);
  //empty component
  $select.innerHTML =null;

  function applyTo($target){
    var $this = $target;
    var _teams = null;

    $this.populate = function(){
      remoteStorage.teams.findAll().then(
        function(teams){

          if (Object.keys(teams).length === 0){
            app.alert('alert-info','humm, no members found, you can add members by clicking on the "<a href="#team-list">My Groups</a>" menu');
          }
          $this.render(teams);
        }
      );
    }

    $this.render = function(teams){
      _teams = teams;
      $this.innerHTML = tplList(teams);
    }

    $this.getSelectedItems = function(){
      if ($this.value==-1){
        return _teams;
      }else{
        var t = {};
        t[$this.value] = _teams[$this.value];
        return t;
      }
    }

  }

  return {
    applyTo: applyTo
  }

})();

app.list = (function(){

  var $list = document.getElementById('list');
  var tplList = doT.template($list.innerHTML);
  //empty component
  $list.innerHTML =null;


  function applyTo($target){
    var $this = $target;

    $this.render = function(teams){
      $this.innerHTML = tplList(teams);
    }

  }

  return {
    applyTo: applyTo
  }

})();
