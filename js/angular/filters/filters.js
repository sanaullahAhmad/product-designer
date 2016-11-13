 function reverse(s) {
    s = s.toString();
    var o = [];
    for (var i = s.length - 1, j = 0; i >= 0; i--, j++)
        o[j] = s[i];
    return o.join('');
};

kp_clothes.filter('dateToISO', function() {
    return function(badTime) {
        var goodTime = badTime.replace(/(.+) (.+)/, "$1T$2Z");
        return goodTime;
    };
});

kp_clothes.filter('money_format', function() {
    return function(money) {
        if(money){
            var len = money.toString().length;
            var m = '';
            money = reverse(money);
            for(var i=0; i<len; i++){
                if(( i==3 || (i>3 && (i-1)%2==0) )&& i!=len){
                    m = m + ',';
                }
                m = m + money.charAt(i);
            }
            return reverse(m);
        }
    };
});