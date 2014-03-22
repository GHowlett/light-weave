function StrDist(string1, string2){
  if(!(string1 && string2))return;
  var string1 = string1.toLowerCase();
	var string2 = string2.toLowerCase();
	var memo = {};
	function LD(str1, i, len1, str2, j, len2) {
		var key = [i, len1, j, len2].join(',');
		if (memo[key] != undefined)return memo[key];
		if (len1 == 0)return len2;
		if (len2 == 0)return len1;
    var cost = 0;
		if (str1[i] != str2[j])cost = 1;
		var dist = Math.min(
				LD(str1, i+1, len1-1, str2, j, len2)+1,
				LD(str1, i, len1, str2, j+1, len2-1)+1,
				LD(str1, i+1, len1-1, str2, j+1, len2-1)+cost);
		memo[key] = dist;
		return dist;
	}
	return LD(string1, 0, string1.length,
            string2, 0, string2.length) / Math.max(
    string1.length, string2.length);
}