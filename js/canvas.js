import { nodes } from "./data.js"
import { rods } from "./data.js"
import { supports } from "./data.js"
import { get_focused_info, focused_changer, distributed_changer, support_changer, get_distributed_info, checker_distributed_input, get_support_info, checker_support_input, distributed_add, support_add, focused_add } from "./tables.js"
import { checker_focused_input } from "./tables.js"
//canvas
export const canvas = document.getElementById('scheme')

const ctx = canvas.getContext('2d')
const rect = canvas.getBoundingClientRect()
const scale = window.devicePixelRatio

canvas.width = rect.width * scale
canvas.height = rect.height * scale
ctx.scale(scale, scale)


//art functions
export function drowRectangle(x, y, width, height, number) {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4
    ctx.rect(x, y, width, height)
    ctx.stroke()
    ctx.beginPath();
    ctx.font = "22px Verdana";
    ctx.fillText(number, x+10, y+height-10);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 4
    ctx.stroke()
    ctx.closePath();
}
export function drowNodes() {
    ctx.font = "22px Verdana";
    for(let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.fillText(nodes[i].number + 1, nodes[i].X-10, nodes[i].Y + 130);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2
        ctx.rect(nodes[i].X - 25, nodes[i].Y + 100, 45, 50)
        ctx.stroke()
        ctx.closePath();
    }
}
export function drowSupports(a) {
    let number = parseInt(a)
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#000000";
    ctx.moveTo(nodes[number].X, 20);
    ctx.lineTo(nodes[number].X, 130);
    ctx.stroke()
    ctx.closePath();
    for(let i = 0; i < nodes.length; i++) {
        if(nodes[i].number == number && nodes[i].support == false) {
            nodes[i].support = true
        }
    }
    for(let j = 20; j < 130; j = j + 5) {
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1
        ctx.moveTo(nodes[number].X, j)
        ctx.lineTo(nodes[number].X+5, j+5);
        ctx.stroke()
        ctx.closePath();
    }
}

export function drowFocuseds(a, b) {
    let number = parseInt(a)
    if(parseInt(b) != 0) {
        if(parseInt(b) < 0) {
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.moveTo(nodes[number].X, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X-40, nodes[number].Y - 10);
            ctx.stroke()
            ctx.closePath();
    
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineCap = "round";
            ctx.lineWidth = 4;
            ctx.moveTo(nodes[number].X - 43, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X - 38, nodes[number].Y - 5);
            ctx.stroke()
            ctx.closePath();
    
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            ctx.lineCap = "round";
            ctx.lineWidth = 4;
            ctx.moveTo(nodes[number].X - 43, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X - 38, nodes[number].Y - 15);
            ctx.stroke()
            ctx.closePath();
        }
        if(parseInt(b) > 0) {
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.moveTo(nodes[number].X, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X + 40, nodes[number].Y - 10);
            ctx.stroke()
            ctx.closePath();
    
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineCap = "round";
            ctx.lineWidth = 4;
            ctx.moveTo(nodes[number].X + 43, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X + 38, nodes[number].Y - 15);
            ctx.stroke()
            ctx.closePath();
    
            ctx.beginPath();
            ctx.strokeStyle = "red";
            ctx.lineCap = "round";
            ctx.lineWidth = 4;
            ctx.moveTo(nodes[number].X + 43, nodes[number].Y - 10);
            ctx.lineTo(nodes[number].X + 38, nodes[number].Y - 5);
            ctx.stroke()
            ctx.closePath();
        }
    }
}

export function drowDistributed(a, b) {
    let number = parseInt(a)
    if(parseInt(b) != 0) {
        if(parseInt(b) < 0) {
            for(let i = 0; i < rods.length; i++) {
                if(rods[i].number == number) {
                    for(let j = 0; j < rods[i].L - 10; j = j + 40) {
                        ctx.beginPath();
                        ctx.strokeStyle = "blue";
                        ctx.lineWidth = 2;
                        ctx.lineCap = "round";
                        ctx.moveTo(rods[i].X + j, rods[i].Y);
                        ctx.lineTo(rods[i].X + j + 20, rods[i].Y);
                        ctx.stroke()
                        ctx.closePath();
                
                        ctx.beginPath();
                        ctx.strokeStyle = "blue";
                        ctx.lineCap = "round";
                        ctx.lineWidth = 2;
                        ctx.moveTo(nodes[i].X + j, nodes[i].Y);
                        ctx.lineTo(nodes[i].X + j + 7, nodes[i].Y + 3);
                        ctx.stroke()
                        ctx.closePath();
                
                        ctx.beginPath();
                        ctx.strokeStyle = "blue";
                        ctx.lineCap = "round";
                        ctx.lineWidth = 2;
                        ctx.moveTo(nodes[i].X + j, nodes[i].Y);
                        ctx.lineTo(nodes[i].X + j + 7, nodes[i].Y - 3);
                        ctx.stroke()
                        ctx.closePath();
                    }
                }
            }
        }
        if(parseInt(b) > 0) {
            for(let i = 0; i < rods.length; i++) {
                if(rods[i].number == number) {
                    for(let j = 0; j < rods[i].L - 10; j = j + 40) {
                        ctx.beginPath();
                        ctx.strokeStyle = "red";
                        ctx.lineWidth = 2;
                        ctx.lineCap = "round";
                        ctx.moveTo(rods[i].X + j, rods[i].Y);
                        ctx.lineTo(rods[i].X + j + 20, rods[i].Y);
                        ctx.stroke()
                        ctx.closePath();
                
                        ctx.beginPath();
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.lineWidth = 2;
                        ctx.moveTo(nodes[i].X + j + 20, nodes[i].Y);
                        ctx.lineTo(nodes[i].X + j + 13, nodes[i].Y + 3);
                        ctx.stroke()
                        ctx.closePath();
                
                        ctx.beginPath();
                        ctx.strokeStyle = "red";
                        ctx.lineCap = "round";
                        ctx.lineWidth = 2;
                        ctx.moveTo(nodes[i].X + j + 20, nodes[i].Y);
                        ctx.lineTo(nodes[i].X + j + 13, nodes[i].Y - 3);
                        ctx.stroke()
                        ctx.closePath();
                    }
                }
            }
        }
    }
}
// art scheme
let indent_top = 60
let indent_left = 50
export let height = 150
export let art_btn = document.querySelector('.table__footer-art')
let canvas_width = document.querySelector('#scheme').offsetWidth
export let art = false
art_btn.onclick = function() {
    if(rods.length == 0) {
    }
    else {
        drowRods()
    }
}
export function drowRods() {
    nodes.length = 0
    let table_line = document.querySelectorAll('.table__line')
    let L = document.querySelectorAll('.table__line-L')
    let A = document.querySelectorAll('.table__line-A')
    let rod_length = 0 
    let x = indent_left
    canvas.width = canvas.width
    if(table_line.length) {
        art = true
        checker_focused_input()
        checker_distributed_input()
        checker_support_input()
        for(let i = 0; i < L.length; i++) {
            rod_length = rod_length + parseInt(L[i].innerHTML)
        }
        for(let i = 0; i < table_line.length; i++) {
            rods[i].X = x
            if((A[i].innerHTML)  < 1 ) {
                drowRectangle(x, indent_top / 1, ((canvas_width - indent_left * 2) / rod_length * L[i].innerHTML), height - (indent_top / 1) * 2, rods[i].number)
            }
            else {
                drowRectangle(x, indent_top / A[i].innerHTML, ((canvas_width - indent_left * 2) / rod_length * L[i].innerHTML), height - (indent_top / A[i].innerHTML) * 2, rods[i].number)
            }
            // drowRectangle(x, indent_top / A[i].innerHTML, ((canvas_width - indent_left * 2) / rod_length * L[i].innerHTML), height - (indent_top / A[i].innerHTML) * 2, rods[i].number)
            x = x + (canvas_width - indent_left * 2) / rod_length * L[i].innerHTML
            nodes.push({
                X: rods[i].X,
                Y: height / 2,
                number: nodes.length,
                support: false,
                focused: 0,
            })
        }
        nodes.push({
            X: x,
            Y: height / 2,
            number: nodes.length,
            support: false,
            focused: 0,
        })
        for(let i = 0; i < table_line.length; i++) {
            rods[i].L = nodes[i+1].X - nodes[i].X
        }
        get_focused_info()
        get_support_info()
        get_distributed_info()
        drowNodes()
        focused_changer()
        distributed_changer()
        support_changer()
    }
}
// clear art
let clear_art = document.querySelector('.clear-art');
clear_art.onclick = function() {
    // if(art) {
        canvas.width = canvas.width
        art = false
        checker_focused_input()
        checker_distributed_input()
        checker_support_input()
    // }
}

export function art_change_active() {
    art = false
}
