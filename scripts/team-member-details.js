app.page("team-member-details", function()
  {
    // initialize view variables

    var form = document.querySelector('#team-member-details form');
    var $id = form.querySelector('[name="id"]');
    var $name = form.querySelector('[name="name"]');
    var submitBtn = form.querySelector('input[name="update-member"]');
    var removeBtn = form.querySelector('input[name="remove-member"]');

    var selectedMember = null;

    submitBtn.onclick = function(e){
      e.preventDefault();
      //var member = TeamRepository.findMember(parseInt($id.value));
      selectedMember.name = $name.value;
      remoteStorage.teams.updateMember(selectedMember).then(function(){
        history.back();
      });
      //TeamRepository.save();

      //history.pushState(null, null, "#team-list");
      //app("team-list");

    }

    removeBtn.onclick = function(e){
      e.preventDefault();
      var res = window.confirm("are you sure you want to remove "+ $name.value);
      if (res){
        //TODO handle error
        remoteStorage.teams.removeMember(selectedMember.id).then(function(){
          history.back();
        })

      }

      //history.pushState(null, null, "#team-list");
      //app("team-list");
    }

    // present the view - load data and show:
    return function(params) {

      //var id = parseInt(params);
      remoteStorage.teams.findMember(params).then(function(member){
        if (member){
          selectedMember = member;
          $id.value = selectedMember.id;
          $name.value = selectedMember.name;
        }
      })

    }
  });
