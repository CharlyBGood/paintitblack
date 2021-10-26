function rand(min, max) {
    let randomNumbs = min + Math.random() * (max - min);
    console.log(randomNumbs)
    return randomNumbs;
}


function randColorHsl() {
    let h = rand(0, 360);
    let s = rand(25, 100);
    let l = rand(15, 50);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

export {randColorHsl};
