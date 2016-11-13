var app = angular.module('app',['ngScrollbars']).config(['ScrollBarsProvider', function(ScrollBarsProvider) {
    ScrollBarsProvider.defaults = {
       /* scrollButtons: {
            scrollAmount: 'auto', // scroll amount when button pressed
            enable: true // enable scrolling buttons by default
        },*/
        advanced: {
            updateOnContentResize: true
        },
        setHeight:($(window).height() - 80),
        scrollInertia: 400, // adjust however you want
        axis: 'y', // enable 2 axis scrollbars by default,
        theme:'minimal-dark',//"dark",//theme: 'dark-3',//'3d-dark',//'dark-3',
        autoHideScrollbar: false
    };
}]);














app.controller('productDesignerController',['$scope','$timeout','$log', function ($scope,$timeout,$log) {
    $log.debug('Product Designer Controller');
    $scope.ngScrollbarsConfig = {
        callbacks: {
            onTotalScrollOffset: 100,
            onTotalScroll: function () {
                //$scope.scroll_finish();
            }
        }
    };
    $scope.canvas = document.getElementById('product-canvas');
    $scope.context = $scope.canvas.getContext('2d');
    $scope.default_sources = {
        body: {
            images:{
                overlay:'images/default-overlay.png',
                //overlay:'images/black-overlay.png',
                fabric: 'images/fabrics/6.png',
            },
            default_fabric:1
        },
        collar: {
            images:{
                overlay: 'images/collars/1.png',
                //overlay: 'http://www.itailor.com/blog/wp-content/uploads/2015/05/iTailor-Collar-Styles-Spread.png',
                fabric: 'images/fabrics/4.png'
            },
            default_fabric:1
        },
        cuff:{
            images:{
                overlay:'images/cuff-overlay.png',
                // overlay:'https://www.cliverichard.com/img/seo-landing-icon-2.png',
                fabric: 'images/fabrics/3.png'
            },
            default_fabric:1,
            status:true
        },
        placket:{
            images:{
                overlay:'images/placket-overlay.png',
                fabric: 'images/fabrics/6.png'
            },
            default_fabric:1

        },
        button:{
            images:{
                overlay:'images/buttons/21.png'
            },
            default_fabric:1

        }

    };

    $scope.sources = angular.copy($scope.default_sources);
    /* ======================================= Clear Canvas ============================== */
    $scope.clear_canvas = function () {
        var w = $scope.canvas.width;
        $scope.context.clearRect(0, 0, w, $scope.canvas.height);
        $scope.canvas.width = w;
    };



    /* ======================================= Function info ============================== */
        $scope.loadImages=     function (sources, callback) {
        var images ={};
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
            for (var img in sources[src].images){
                numImages++;
            }
        }
        //    $log.debug(numImages);
        for(var src in sources) {
            images[src] = {
                overlay:new Image(),
                fabric:new Image(),

            };
            //images[src] = new Image();
            images[src].fabric.onload = images[src].overlay.onload  = function() {
                if(++loadedImages >= numImages) {
                    callback(images);
                }
            };
            images[src].overlay.src = sources[src].images.overlay;
            images[src].fabric.src = sources[src].images.fabric;
        }
    };


    /* ======================================= Draw images from sources ============================== */
        $scope.draw_all = function () {
            $scope.clear_canvas();
            $scope.loadImages($scope.sources,function(images) {
               // $log.debug($scope.sources);
                for(var img in images){
                    if(img=='body'){
                        var temp_canvas =  $scope.draw(images[img].overlay,images[img].fabric,0,0,180,140);
                        $scope.context.drawImage(temp_canvas, 100, 30, 260, 260);
                    }else if(img=='collar') {
                        var temp_canvas = $scope.draw(images[img].overlay,images[img].fabric,130,0,120,120);
                        $scope.context.drawImage(temp_canvas,103, 20,120, 50);
                    }else if(img=='cuff' && $scope.sources[img].status ==true) {
                        var temp_canvas = $scope.draw(images[img].overlay,images[img].fabric,130,0,120,120);
                        $scope.context.drawImage(temp_canvas,207, 215, 60, 35);
                        $scope.context.drawImage(temp_canvas,74, 215, 60, 35);
                    }else if(img=='placket') {
                        var temp_canvas = $scope.draw(images[img].overlay,images[img].fabric,130,0,120,120);
                        $scope.context.drawImage(temp_canvas,160, 50, 30, 280);
                    }else if(img=='button'){
                        $scope.context.drawImage(images[img].overlay,175, 38, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 65, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 105, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 145, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 185, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 225, 8, 8);
                        $scope.context.drawImage(images[img].overlay,175, 260, 8, 8);


                    }

                }
                //console.log(images);
                //context.drawImage(images.body, 0, 0, 320, 320);
                //context.drawImage(images.collar, 130, 0, 60, 60);
            });
        };
        $scope.draw_all();

    /* ======================================= Draw & fill images in temporary canvas ============================== */
        $scope.draw = function (img1,img2,left,top,width,height) {
        var temp_canvas = document.createElement('canvas');
        var temp_context = temp_canvas.getContext('2d');
        try {
            temp_context.fillStyle = temp_context.createPattern(img2, "repeat");
            // fill canvas with pattern
            temp_context.fillRect(0, 0, temp_canvas.width, temp_canvas.height);
            // use blending mode multiply
            temp_context.globalCompositeOperation = "multiply";



            temp_context.drawImage(img1, left, top, width, height);

            // change composition mode (blending mode is automatically set to normal)
            temp_context.globalCompositeOperation = "destination-in";
            // draw to cut-out sofa
            //context.drawImage(img1, 0, 0, img1.width*.5, img1.height*.5);
            temp_context.drawImage(img1, left, top,width, height);
        }catch (e){
           // $log.debug(e);
        }
        return temp_canvas;
    };






    function set_images(key,overlay,fabric){
        $scope.sources[key].images = {
            overlay:overlay,
            fabric:fabric
        }
    }
    /* ======================================= Change fabric ============================== */
    $scope.change_fabric = function (name) {
        for(var key in $scope.sources){
            if($scope.sources[key].default_fabric!= null && $scope.sources[key].default_fabric ==1){
                $scope.sources[key].images.fabric = "images/fabrics/"+name;
            }
        }
        $scope.draw_all();
    };


    /* ======================================= Change Sleeve ============================== */
    $scope.change_sleeve = function (sleeve,cuffs) {
         $scope.sources.body.images.overlay = "images/"+sleeve;
        if(cuffs){
            $scope.sources.cuff.status = true;
        }else {
            $scope.sources.cuff.status = false;
        }
        $scope.draw_all();
    };


    /* ======================================= Change Collar ============================== */
    $scope.change_collar = function (collar_name) {
        $scope.sources['collar'].images.overlay = "images/collars/"+collar_name;
        $scope.draw_all();
    };



    $scope.change_button = function (button_name) {
        $scope.sources['button'].images.overlay = "images/buttons/"+button_name;
        $scope.draw_all();
     };
    
    $scope.reset = function () {
        $scope.sources = angular.copy($scope.default_sources);
        $scope.draw_all();
    };
    
}]);

