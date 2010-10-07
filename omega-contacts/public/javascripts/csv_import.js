$(document).ready(function() {



});

function mapped_fields(header) {

         $.ajax({
           type: "POST",
           url: "/contacts/imports/finalize_csv",

           data: "@header="+header



})}

