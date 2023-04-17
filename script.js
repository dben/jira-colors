function loadCustomCss() {
    var mode = document.getElementsByTagName('html')[0].dataset.colorMode;
    var items = Array.from(document.getElementsByClassName("ghx-card-color-enabled"))
    for (idx in items) {
        var color = items[idx].getElementsByClassName('ghx-grabber')[0].style.backgroundColor;
        if (color != undefined) {
          if (mode == "dark") {
                Array.from(items[idx].getElementsByClassName('ghx-field')).forEach(function (item) {
                    item.style.color = "#000";
                });
                Array.from(items[idx].getElementsByClassName('ghx-summary')).forEach(function (item) {
                    item.style.color = "#333";
                });
                Array.from(items[idx].getElementsByClassName('ghx-extra-field')).forEach(function (item) {
                    item.style.color = "#333";
                });

                Array.from(items[idx].getElementsByClassName('ghx-key')).forEach(function (item) {
                    item.style.color = "#333";
                });
            }
            items[idx].style.backgroundColor = shade(color, 0.90);
        }

       
    }
}

function shadeRGBColor(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
}

function shadeColor2(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function shade(color, percent){
    if (color.length > 7 ) return shadeRGBColor(color,percent);
    else return shadeColor2(color,percent);
}

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function(mutations, observer) {
    // fired when a mutation occurs
    loadCustomCss();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe(document, {
  subtree: true,
  childList: true
});
