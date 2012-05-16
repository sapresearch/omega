$(document).ready(function () {
    $("#new_user").validate({
//        debug: true,
        rules: {
            "user[contact_attributes][first_name]": {
                required: true
                ,minlength: 1
                ,maxlength: 255
            }
            ,"user[contact_attributes][last_name]": {
                required: true
                ,minlength: 1
                ,maxlength: 255
            }
            ,"user[contact_attributes][birthday]": {
                date: true
            }
            ,"user[contact_attributes][addresses_attributes][0][city]": {
                required: true
                ,minlength: 1
                ,maxlength: 255
            }
            ,"user[contact_attributes][addresses_attributes][0][zip_code]": {
                required: true
                ,minlength: 5
                ,maxlength: 10
            }
            ,"user[contact_attributes][phone_numbers_attributes][0][number]": {
                required: true
                ,minlength: 10
                ,maxlength: 20
            }
            ,"user[contact_attributes][email]": {
                required: true
                ,minlength: 4
                ,maxlength: 30
                ,email: true
                ,remote: account_prefix_path + "/users/check_email_uniqueness"
            }
            ,"user[contact_attributes][email_confirmation]": {
                required: true
                ,equalTo: "#user_contact_attributes_email"
            }
            ,"user[username]": {
                required: true
                ,minlength: 2
                ,maxlength: 20
                ,remote: account_prefix_path + "/users/check_username_uniqueness"
            }
            ,"user[password]": {
                required: true
                ,minlength: 6
                ,maxlength: 30
            }
            ,"user[password_confirmation]": {
                required: true
                ,equalTo: "#user_password"
            }
        }
    });
});