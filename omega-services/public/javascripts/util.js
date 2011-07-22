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