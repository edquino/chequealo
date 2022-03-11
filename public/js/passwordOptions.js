function showoptions() {

    if (document.getElementById('showinput').checked) {
        document.getElementById('content-options-link').style.display = 'none';
    }else{ 
        document.getElementById('content-options-link').style.display = 'block';
        $("#passwordOption").attr('required', '');
    }

}
