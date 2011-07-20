function array_diff(a1,a2){
    var diff = []
    for(var i=0; i<a1.length; i++)
        if(jQuery.inArray(a1[i], a2))
            diff.push(a1[i])
    
    return diff
}