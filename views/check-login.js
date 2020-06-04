    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (res && !res.error) {
        $("#navbar-main-collapse>ul.d-none>li.logoutonly").hide();
        $("#navbar-main-collapse>ul.d-none>li.loginonly").show();
        $("#navbar-main-collapse>ul.mx-auto>li.loginonly").show();
      } else {
        $("#navbar-main-collapse>ul.d-none>li.logoutonly").show();
        $("#navbar-main-collapse>ul.d-none>li.loginonly").hide();
        $("#navbar-main-collapse>ul.mx-auto>li.loginonly").hide();
      }
    });