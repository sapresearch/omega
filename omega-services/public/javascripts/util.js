if (!Array.prototype.map)
{
  Array.prototype.map = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this)
        res[i] = fun.call(thisp, this[i], i, this);
    }
    return res;
  };
}

function array_diff(a1,a2){
    var diff = []
    for(var i=0; i<a1.length; i++)
        if(jQuery.inArray(a1[i], a2))
            diff.push(a1[i])
    
    return diff
}

function array_max(a){
    var max = a[0]
    for(var i=0; i<a.length; i++)
        if(a[i]>max)
            max=a[i]
    return max
}

function array_min(a){
    var min = a[0]
    for(var i=0; i<a.length; i++)
        if(a[i]<min)
            min=a[i]
    return min
}

