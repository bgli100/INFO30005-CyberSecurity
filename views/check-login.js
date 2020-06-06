    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (res && !res.error) {
        $(".logoutonly").hide();
        $(".loginonly").show();
      } else {
        $(".logoutonly").show();
        $(".loginonly").hide();
      }
    });