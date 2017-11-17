(function() {
    /**
    * @function seekBar
    * @desc handle seek bars (is a custom directive)
    * @param {Object} $document
    * @return {Number} offsetXpercent
    */
    // function seekBar() {    inject $document as dependency to access window.document object
    function seekBar($document) {
      var calculatePercent = function(seekBar, event) {
           var offsetX = event.pageX - seekBar.offset().left;
           var seekBarWidth = seekBar.width();
           var offsetXPercent = offsetX / seekBarWidth;
           offsetXPercent = Math.max(0, offsetXPercent);
           offsetXPercent = Math.min(1, offsetXPercent);
           return offsetXPercent;
       };

      return {
         templateUrl: '/templates/directives/seek_bar.html',
         replace: true,
         restrict: 'E',
         scope: {
            onChange: '&'
         },
         link: function(scope, element, attributes) {
             // directive logic to return
            scope.value = 0;
            scope.max = 100;

            /**
            * @var seekBar
            * @desc holds element for seek-bar directive
            */
            var seekBar = $(element);

            attributes.$observe('value', function(newValue) {
                scope.value = newValue;
            });

            attributes.$observe('max', function(newValue) {
                scope.max = newValue;
            });

            /**
            * @function percentString
            * @desc calcuates percent of value/max of seek bar
            * @return {String} percent+"%"
            */
            var percentString = function () {
                var value = scope.value;
                var max = scope.max;
                var percent = value / max * 100;
                return percent + "%";
            };

            /**
            * @function scope.fillStyle
            * @desc returns width of seek bar by percent
            * @return {Object} width:percentString()
            */
            scope.fillStyle = function() {
                // console.log("fillstyle %: " + percentString());
                return {width: percentString()};
            };

            // 9.1A
            /**
            * @function scope.thumbStyle
            * @desc returns position of seek bar thumb
            * @return {Object} left:percentString()
            */
            scope.thumbStyle = function () {
              // console.log("thumbStyle %: " + percentString());
              return {left: percentString()};
            };

            scope.onClickSeekBar = function(event) {
                var percent = calculatePercent(seekBar, event);
                scope.value = percent * scope.max;
                notifyOnChange(scope.value);
             };

             scope.trackThumb = function() {
                 $document.bind('mousemove.thumb', function(event) {
                     var percent = calculatePercent(seekBar, event);
                     scope.$apply(function() {
                         scope.value = percent * scope.max;
                         notifyOnChange(scope.value);
                     });
                 });

                 $document.bind('mouseup.thumb', function() {
                     $document.unbind('mousemove.thumb');
                     $document.unbind('mouseup.thumb');
                 });
             };

             // checkpoint 10 --passing updated value to onChange
             var notifyOnChange = function(newValue) {
                  if (typeof scope.onChange === 'function') {
                      scope.onChange({value: newValue});
                  }
             };
         }
     };
    }

    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();
