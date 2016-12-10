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
      TeamRepository.save();
      history.back();
      //history.pushState(null, null, "#team-list");
      //app("team-list");

    }

    removeBtn.onclick = function(e){
      e.preventDefault();
      var res = window.confirm("are you sure you want to remove "+ $name.value);
      if (res){
        TeamRepository.removeMember(parseInt($id.value));
        //TODO handle error
        history.back();
      }

      //history.pushState(null, null, "#team-list");
      //app("team-list");
    }

    // present the view - load data and show:
    return function(params) {
      var id = parseInt(params);
      selectedMember = TeamRepository.findMember(id);

      $id.value = selectedMember.id;
      $name.value = selectedMember.name;
    }
  });
