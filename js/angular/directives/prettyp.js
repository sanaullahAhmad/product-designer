// See more at: http://alvincheung.com/blog/angularjs-and-prettyphoto/#sthash.Hu3voDdf.dpuf
angular.module('kp_clothes').directive('prettyp', function(){ 
  return function(scope, element, attrs){ 
    $("[rel^='prettyPhoto']").prettyPhoto({deeplinking: false}); 
    
  } 
  
})