// let j = 1;

// function text() {
//     if(j == 1) {
//         alert('it works!!');
//     }
// }

// export {j, text};

//  -------------------------

function randHexColor() {
    // new Array()
    let hexColor = [];
    // First value will be a hash for hex-color value
    hexColor[0] = "#";
    for (let c = 1; c < 7; c++) {
        // Hex has 16 numbers, but 0 is one of them
        let h = Math.floor((Math.random()*16))
        // hex:0123456789ABCDEF, this takes care of last 6
        if (h >= 10 && h <= 15) {
            switch (h) {
                case 10:
                    h = "a";
                    break;
                case 11:
                    h = "b";
                    break;
                case 12:
                    h = "c";
                    break;
                case 13:
                    h = "d";
                    break;
                case 14:
                    h = "e";
                    break;
                case 15:
                    h = "f";
                    break;            
            }
        }
        hexColor[c] = h;
    }
    let cStr = hexColor.join('');
    return cStr;
}

let colorH = randHexColor();

export {randHexColor, colorH};