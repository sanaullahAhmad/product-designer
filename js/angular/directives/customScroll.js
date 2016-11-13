// scroll directive
angular.module("kp_clothes").directive('customScroll', function ($log) {
    return {
        restrict: 'A',
        scope: {
            config: '&customScroll',
            onComplete: '&onEnd'
        },
        link: function postLink(scope, iElement, iAttrs, controller, transcludeFn) {
            var config = scope.config();
          // $log.debug('config: ', config);
            // create scroll elemnt
            var elem = iElement.mCustomScrollbar({
                theme: '3d-dark',
                autoDraggerLength:true,
                autoHideScrollbar:false,
                mouseWheel:true,
                scrollButtons:{
                    enable: config.buttons
                },
                advanced:{
                    updateOnImageLoad: true,
                },
                callbacks:{
                    onTotalScrollOffset:20,
                    onTotalScroll: function(){
                        scope.onComplete();
                    }
                }
            });
            // the live options object

        }
    };
});
