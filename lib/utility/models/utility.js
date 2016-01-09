/**
 * Created by hussein on 09/01/16.
 */
exports.randomString = function(stringLength) {
    stringLength = stringLength || 12;
    var chars = "0123456789ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    var result = '';
    for (var i=0; i<stringLength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        result += chars.substring(rnum, rnum+1);
    }

    return result;
}