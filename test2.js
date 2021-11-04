function rand(min, max) {
    let randomNumbs = min + Math.random() * (max - min);
    return randomNumbs;
}

let colorZ = function randColorHsl() {
    let h = rand(0, 360);
    let s = rand(25, 100);
    let l = rand(15, 50);
    return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

export {colorZ};
