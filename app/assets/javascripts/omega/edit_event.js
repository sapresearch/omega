    $('.datepickr').live('focus', function() {
        $(this).datepicker({

            dateFormat: 'yy-mm-dd',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            yearRange: '2010:2020'
        })
    });

    $('.tpickr').timepicker();