
angular.module('ng-dialog', ['ui.bootstrap'])
    .directive('ngDialogClick', ['$uibModal',
        function($uibModal) {
            var ModalInstanceCtrl = function($scope, $uibModalInstance) {
                $scope.ok = function() {
                    $uibModalInstance.close();
                };

                $scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            };

            return {
                restrict: 'A',
                scope:{
                    ngDialogClick:"&",
                    item:"="
                },
                link: function(scope, element, attrs) {
                    element.bind('click', function() {
                        var message = attrs.ngDialogMessage || "Are you sure to do this?";
                        var title = attrs.ngDialogTitle || "Are you sure!";
                        var css_classes = attrs.ngDialogClass || "vd_bg-green vd_white";
                        var btn_close = attrs.ngDialogClose || "Close";
                        var btn_action = attrs.ngDialogAction || "Yes";
                        var btn_action_class = attrs.ngDialogActionClass || "vd_btn vd_bg-red";
                        var btn_close_class= attrs.ngDialogCloseClass || "vd_btn vd_bg-green";
                        var modalHtml ='<div class="modal-header '+css_classes+' ">'+
                                            '<button ng-click="cancel()" aria-hidden="true" data-dismiss="modal" class="close" type="button"><i class="fa fa-times"></i></button>'+
                                            '<h4 class="modal-title">'+
                                                title +
                                            '</h4>'+
                                        '</div>'+
                                        '<div class="modal-body">'+
                                            message +
                                        '</div>'+
                                        '<div class="modal-footer background-login">'+
                                            '<button ng-click="cancel()" class="btn '+ btn_close_class+'" type="button">'+btn_close+'</button>'+
                                            '<button class="btn  '+ btn_action_class +'" ng-click="ok()" type="button">'+btn_action+'</button>'+
                                        '</div>';

                        var modalInstance = $uibModal.open({
                            template: modalHtml,
                            controller: ModalInstanceCtrl
                        });

                        modalInstance.result.then(function() {
                            scope.ngDialogClick({item:scope.item});
                        }, function() {
                            //Modal dismissed
                        });
                    });
                }
            }
        }
    ]);

