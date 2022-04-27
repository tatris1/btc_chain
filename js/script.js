//open btn
function openNav() {
  document.getElementById("mySidebar").style.width = "100%";
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
}

//FORMS
//phone
//first form
var input1 = document.querySelector("#phone1");
/* var phoneInput1 = window.intlTelInput(input1, {
  separateDialCode: true,
  utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  initialCountry: "auto",
  excludeCountries: ["UA",  "BY", "MD"],
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () {
    }, "jsonp").always(function (resp) {
      console.log(resp.country);
      $("#country1").val(resp.country);
      $("#country2").val(resp.country);
      var countryCode =
          resp && checkCountry(resp.country) ? resp.country : "DE";
      success(countryCode);
    });
  },
}); */

function checkCountry(code) {
  var arr = ["UA",  "BY", "MD"];
  console.log(code);
  console.log(arr.includes(code));
  return !arr.includes(code);
}
/*$.validator.addMethod("phoneValidation", function(value, element) {
  return this.optional(element) || /^\d+$/g.test( value );
}, "Введите правильный номер!");*/
$.validator.addMethod(
    "validNumber",
    function (value, element, params) {
      var obj = params.object;
      if (obj.isValidNumber()) {
        var num = obj.getNumber().replace("+", "");
        console.log(num);
        $(element)
            .closest("form")
            .find(".hidden-phone")
            .val("+" + num);
      }
      return obj.isValidNumber();
    },
    "Введите правильный номер!"
);

// Запрет ввода в поля больше двух пробелов подряд
const nameForm1 = document.querySelector("#name");
const nameForm2 = document.querySelector("#name2");
const emailForm1 = document.querySelector("#email");
const emailForm2 = document.querySelector("#email2");

function removeExtraSpaces(e) {
  const valueWithoutSpaces = e.target.value.replace(/\s+/g, ' ').replace(/^\s+|\s+$/,'');
  e.target.value = valueWithoutSpaces
}
nameForm1.addEventListener("focusout", removeExtraSpaces);
nameForm2.addEventListener("focusout", removeExtraSpaces);

// Валидация формы
$.validator.addMethod(
    "alphanumeric",
    function (value, element) {
      return this.optional(element) || /^[a-zA-Zа-яА-ЯЁё\s]+$/.test(value.replace(/ +/g, ' ').trim()); //RU
    },
    "Имя может содержать только буквы!"
);
// Email validation
$.validator.addMethod("emailValidation", function(value, element) {
  return this.optional(element) || /^[a-zA-Z0-9_.!#$%&\'*+\-\/=?^_`{|}~]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?){1,61}$/g.test( value );
}, "Введите правильный email!");


function removeDotsHyphens(e){
  const valueWithoutDotsHyphens = e.target.value.replace(/\.+/g,'.').replace(/-{2,}/g,'--').replace(/^\.|^-*/,'').replace(/\.@/,'@');
  e.target.value = valueWithoutDotsHyphens;
}
emailForm1.addEventListener("change", removeDotsHyphens);
emailForm2.addEventListener("change", removeDotsHyphens);

//Trim whitespace on email input
$(function()
{
  $('input[type=email]').on('keypress', function(e)
  {
    if (e.which == 32)
      return false;
  });
});

$("#leadform1").validate({
  rules: {
    phone1: {
      required: true,
      /*phoneValidation: true,*/
      validNumber: {
        object: phoneInput1,
      },
    },
    name: {
      required: true,
      alphanumeric: true,
    },
    email: {
      required: true,
      email:false,
      emailValidation: true,
    }
  },
  messages: {
    phone1: {
      required: "Это поле обязательное",
    },
    name: {
      required: "Это поле обязательное",
    },
    email: {
      required: "Это поле обязательное"
    },
  },
  submitHandler: function (form, event) {
    sendAjaxForm(form);
    return false;

  }
});

$(window).on("load", function () {
  setTimeout(function () {
    var mask1 = jQuery("#phone1").attr("placeholder").replace(/[0-9]/g, 9);

    $(document).ready(function () {
      jQuery("#phone1").mask(mask1);
    });

    jQuery("#phone1").on("countrychange", function (e, countryData) {
      jQuery("#phone1").val("");
      var mask1 = $("#phone1").attr("placeholder").replace(/[0-9]/g, 9);
      jQuery("#phone1").mask(mask1);
    });
  }, 1000);
});
//second form
var input2 = document.querySelector("#phone2");
var phoneInput2 = window.intlTelInput(input2, {
  separateDialCode: true,
  utilsScript:
      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
  initialCountry: "auto",
  excludeCountries: ["UA",  "BY", "MD"],
  geoIpLookup: function (success, failure) {
    $.get("https://ipinfo.io", function () {
    }, "jsonp").always(function (resp) {
      console.log(resp.country);
      var countryCode =
          resp && checkCountry(resp.country) ? resp.country : "DE";
      success(countryCode);
    });
  },
});

$("#leadform2").validate({
  rules: {
    phone2: {
      required: true,
   /*   phoneValidation: true,*/
      validNumber: {
        object: phoneInput2,
      },
    },
    name: {
      required: true,
      alphanumeric: true,
    },
    email: {
      required: true,
      email:false,
      emailValidation: true,
    }
  },
  messages: {
    phone2: {
      required: "Это поле обязательное",
    },
    name: {
      required: "Это поле обязательное",
    },
    email: {
      required: "Это поле обязательное"
    },
  },
  submitHandler: function (form, event) {
    sendAjaxForm(form);
    return false;

  },
});

$(window).on("load", function () {
  setTimeout(function () {
    var mask1 = jQuery("#phone2").attr("placeholder").replace(/[0-9]/g, 9);

    $(document).ready(function () {
      jQuery("#phone2").mask(mask1);
    });

    jQuery("#phone2").on("countrychange", function (e, countryData) {
      jQuery("#phone2").val("");
      var mask1 = $("#phone2").attr("placeholder").replace(/[0-9]/g, 9);
      jQuery("#phone2").mask(mask1);
    });
  }, 1000);
});
//
/*
input2.addEventListener("focusout", function(){
  $("#realPhone2").val($("#second_form .iti__selected-dial-code").html().replace(/\+/, '')+$(this).val());
  console.log( $("#realPhone2").val());
});
input1.addEventListener("focusout", function(){
  $("#realPhone1").val($("#first_form .iti__selected-dial-code").html().replace(/\+/, '')+$(this).val());
  console.log( $("#realPhone1").val());
});*/
