    $.ajax({
      url: "/user/checkcookie",
      mehtod: "GET",
    }).then((res) => {
      if (res && !res.error) {
        $("#navbar-main-collapse>ul.d-none>li:nth-child(1)").hide();
        $("#navbar-main-collapse>ul.d-none>li:nth-child(2)").show();
        $("#navbar-main-collapse>ul.mx-auto>li:nth-child(2)").show();
      } else {
        $("#navbar-main-collapse>ul.d-none>li:nth-child(1)").show();
        $("#navbar-main-collapse>ul.d-none>li:nth-child(2)").hide();
        $("#navbar-main-collapse>ul.mx-auto>li:nth-child(2)").hide();
      }
    });