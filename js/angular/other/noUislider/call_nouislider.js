function make_noUiSlider(id){

    var snapSlider =  document.getElementById(id);
    if(snapSlider!=null){
        var start = parseFloat(snapSlider.getAttribute('data-start'));
        var end = parseFloat(snapSlider.getAttribute('data-end'));
        var min = parseFloat(snapSlider.getAttribute('data-min'));
        var max = parseFloat(snapSlider.getAttribute('data-max'));

        noUiSlider.create(snapSlider, {
            start: [ start, end ],
            connect: true,
            range: {
                'min': [  min ],
                'max': [ max ]
            }
        });
    }

    return snapSlider;
}
