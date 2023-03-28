import { drowFocuseds, drowSupports, drowDistributed, art_btn, art, height, canvas, drowRods, art_change_active } from "./canvas.js"
import { rods, nodes } from "./data.js"
// table_value size-control
export function add_table_value_width() {
    let table_subtitle = document.querySelectorAll('.table__subtitle')
    let table_value = document.querySelectorAll('.table__line-value')
    for(let i = 0, j = 0; i < table_value.length; i++, j++) {
        table_value[i].style.width = table_subtitle[j].offsetWidth + "px"
        if(j == 4) {
            j = -1
        }
    }
    
}
if(document.querySelectorAll('.table__line').length) {
    add_table_value_width()
}

window.addEventListener('resize', function(event){
    add_table_value_width()
})


// add-new-rod
function table_add_line(number_line) {
    let table = document.querySelector('.table__content-lines')
    let table_line = document.createElement('div')
    let table_line_content = document.createElement('div')
    let rod_add_input = document.querySelectorAll('.rod-add__input')
    table_line.className = "table__line";
    table_line_content.className = "table__line-content";
    table.appendChild(table_line)
    table_line.appendChild(table_line_content)

    let table_line_value = document.createElement('div')
    table_line_value.className = "table__line-value table__line-number";
    table_line_value.innerHTML = number_line + 1
    table_line_content.appendChild(table_line_value)

    for(let i = 0; i < 4; i++) {
        let table_line_value = document.createElement('div')
        if(i == 0 ) {
            table_line_value.className = "table__line-value table__line-L";
        }
        if(i == 1 ) {
            table_line_value.className = "table__line-value table__line-A";
        }
        if(i == 2 ) {
            table_line_value.className = "table__line-value table__line-E";
        }
        if(i == 3 ) {
            table_line_value.className = "table__line-value table__line-B";
        }
        table_line_value.innerHTML = rod_add_input[i].value
        table_line_content.appendChild(table_line_value)
    }
    let rod_del = document.createElement('img')
    rod_del.className = "table__line-del"; 
    rod_del.src = "./img/exit.svg";
    table_line_content.appendChild(rod_del)

}


// add new-focused in table
function table_add_focused() {
    if(rods.length) {
        let focused_input = document.querySelectorAll('.focused-input')
        let focused_list = document.querySelector('.info__focused')
        let focused_bar = document.createElement('div')
    
        focused_bar.className = "info__item-bar focused__bar"
    
        focused_list.appendChild(focused_bar)
    
        for(let i = 0; i < 2; i++) {
            let focused_bar_value = document.createElement('div')
            if(i == 0 ) {
                focused_bar_value.className = "info__item-number focused__number";
            }
            if(i == 1 ) {
                focused_bar_value.className = "info__item-value focused__value";
            }
            focused_bar_value.innerHTML = focused_input[i].value
            focused_bar.appendChild(focused_bar_value)
        }
    
        let focused_del = document.createElement('img')
        focused_del.className = "info-item__del focused__del-btn"; 
        focused_del.src = "./img/exit.svg";
        focused_bar.appendChild(focused_del)
    }
}


// add info focused from table
export function get_focused_info() {
    let focused_bar = document.querySelectorAll('.focused__bar')
    for(let j = 0; j < nodes.length; j++) {
        nodes[j].focused = 0
    }
    for(let i = 0; i < focused_bar.length; i++) {
        for(let j = 0; j < nodes.length; j++) {
            if(focused_bar[i].firstChild.innerHTML - 1 == nodes[j].number && nodes[j].focused == 0) {
                nodes[j].focused = parseInt(focused_bar[i].childNodes[1].innerHTML)
            }
        }
    }

}


// add new-support in table
function table_add_support() {
    if(rods.length) {
        let support_input = document.querySelectorAll('.support-input')
        let support_list = document.querySelector('.info__support')
        let support_bar = document.createElement('div')
    
        support_bar.className = "info__item-bar support__bar"
    
        support_list.appendChild(support_bar)
    
        for(let i = 0; i < 1; i++) {
            let support_bar_value = document.createElement('div')
            if(i == 0 ) {
                support_bar_value.className = "info__item-number support__number";
            }
            support_bar_value.innerHTML = support_input[i].value
            support_bar.appendChild(support_bar_value)
        }
    
        let support_del = document.createElement('img')
        support_del.className = "info-item__del support__del-btn"; 
        support_del.src = "./img/exit.svg";
        support_bar.appendChild(support_del)
    }
}


// add info support from table
export function get_support_info() {
    let support_bar = document.querySelectorAll('.support__bar')
    for(let j = 0; j < nodes.length; j++) {
        nodes[j].support = 0
    }
    for(let i = 0; i < support_bar.length; i++) {
        for(let j = 0; j < nodes.length; j++) {
            if(support_bar[i].firstChild.innerHTML - 1 == nodes[j].number && nodes[j].support == 0) {
                nodes[j].support = 1
            }
        }
    }
}


// add new-distributed in table
function table_add_distributed() {
    if(rods.length) {
        let distributed_input = document.querySelectorAll('.distributed__input')
        let distributed_list = document.querySelector('.info__distributed')
        let distributed_bar = document.createElement('div')
    
        distributed_bar.className = "info__item-bar distributed__bar"
    
        distributed_list.appendChild(distributed_bar)
    
        for(let i = 0; i < 2; i++) {
            let distributed_bar_value = document.createElement('div')
            if(i == 0 ) {
                distributed_bar_value.className = "info__item-number distributed__number";
            }
            if(i == 1 ) {
                distributed_bar_value.className = "info__item-value distributed__value";
            }
            distributed_bar_value.innerHTML = distributed_input[i].value
            distributed_bar.appendChild(distributed_bar_value)
        }
    
        let distributed_del = document.createElement('img')
        distributed_del.className = "info-item__del distributed__del-btn"; 
        distributed_del.src = "./img/exit.svg";
        distributed_bar.appendChild(distributed_del)
    }
}


// add info distributed from table
export function get_distributed_info() {
    let distributed_bar = document.querySelectorAll('.distributed__bar')
    for(let j = 0; j < rods.length; j++) {
        rods[j].distributed = 0
    }
    for(let i = 0; i < distributed_bar.length; i++) {
        for(let j = 0; j < rods.length; j++) {
            if(distributed_bar[i].firstChild.innerHTML == rods[j].number && rods[j].distributed == 0) {
                rods[j].distributed = parseInt(distributed_bar[i].childNodes[1].innerHTML)
            }
        }
    }
}


let save_btn = document.querySelector('.rod-add__save-btn')
let number_line = 0
let inputs = false
save_btn.onclick = function() {
    let rod_input = document.querySelectorAll('.rod-add__input')
    let i = 0
    while(i < rod_input.length) {
        if(rod_input[i].value == "") {
            inputs = false
            break
        }
        else {
            inputs = true
            i++
        }
    }
    if(inputs) {
        art_btn.classList.remove('disabled')
        clear_list_btn.classList.remove('disabled')
        table_add_line(number_line)
        add_table_value_width()
        number_line++
        rods_change_info()
        get_distributed_info()
        distributed_changer()
        del_rod()
    }
}


// rods info add from lines
export function rods_change_info() {
    let table_line_content = document.querySelectorAll('.table__line-content')
    rods.length = 0
    for(let i = 0; i < table_line_content.length; i++) {
        rods.push(
        {
            number: table_line_content[i].firstChild.innerHTML,
            L: table_line_content[i].childNodes[1].innerHTML,
            A: table_line_content[i].childNodes[2].innerHTML,
            E: table_line_content[i].childNodes[3].innerHTML,
            B: table_line_content[i].childNodes[4].innerHTML,
            Y: height / 2,
            distributed: 0,
            l:table_line_content[i].childNodes[1].innerHTML
        })
    }
}


// del rod
export function del_rod() {
    let del_rod_btn = document.querySelectorAll('.table__line-del')
    let table_line_content = document.querySelectorAll('.table__line-content')
    del_rod_btn[del_rod_btn.length-1].addEventListener('click', (event) => {
        event.target.parentElement.parentElement.remove()
        // number_line = 0
        // for(let i = 0; i < table_line_content.length; i++) {
        //     console.log(table_line_content[i].firstChild.innerHTML)
        //     // table_line_content[i].firstChild.innerHTML = number_line
        //     number_line++
        // }
        if(rods.length == 0) {
            art_btn.classList.add('disabled')
        }
    });

}





// clear rod_add_inputs
let clear_btn = document.querySelector('.rod-add__clear-btn')
let rod_add_input = document.querySelectorAll('.rod-add__input')
clear_btn.onclick = function() {
    for(let i = 0; i < rod_add_input.length; i++) {
        rod_add_input[i].value = ""
    }
    save_btn.classList.add('disabled')
}


// clear rods-list
let table_content_lines = document.querySelector('.table__content-lines')
let clear_list_btn = document.querySelector('.table__footer-clear-list')
clear_list_btn.onclick = function() {
    rods.length = 0
    number_line = 0
    let table_line = document.querySelectorAll('.table__line')
    if(table_line.length>0) {
        for(let i = 0; i < table_line.length; i++) {
            table_content_lines.removeChild(table_line[i])
        }
        clear_list_btn.classList.add('disabled')
        art_btn.classList.add('disabled')
        art_change_active()
        distributed_add.classList.add('disabled')
        focused_add.classList.add('disabled')
        support_add.classList.add('disabled')
    }
}


// add Focuseds
export let focused_add = document.querySelector('.focused__save-btn');
let focused_number = document.querySelector('.focused__input-number')
let focused_value = document.querySelector('.focused__input-value')
focused_add.onclick = function() {
    if(art && focused_number.value && focused_value.value) {
        for(let i = 0; i < nodes.length; i++) {
            if(focused_number.value - 1 == nodes[i].number && nodes[i].focused == 0) {
                table_add_focused()
                get_focused_info()
                break
            }
            else {
            }
        }
        del_focused()
        disabled_art_info_rodes()
    }
}


// add support
export let support_add = document.querySelector('.support__save-btn ')
let support_add_input = document.querySelector('.support__item-value')
let support_number = document.querySelector('.support__item-value')
support_add.onclick = function() {
    if(art && support_number.value) {
        // drowSupports(support_add_input.value)
        for(let i = 0; i < nodes.length; i++) {
            if(support_number.value - 1 == nodes[i].number && nodes[i].support == 0) {
                table_add_support()
                get_support_info()
                break
            }
            else {
            }
        }
        del_support()
        disabled_art_info_rodes()
    }
}


// add distributed
export let distributed_add = document.querySelector('.distributed__save-btn');
let distributed_number = document.querySelector('.distributed__input-number')
let distributed_value = document.querySelector('.distributed__input-value')
distributed_add.onclick = function() {
    if(art && distributed_number.value && distributed_value.value) {
        for(let i = 0; i < rods.length; i++) {
            if(distributed_number.value == rods[i].number && rods[i].distributed == 0) {
                table_add_distributed()
                get_distributed_info()
                break
            }
            else {
            }
        }
        del_distributed()
        disabled_art_info_rodes()
    }
}


// del Focused from table 
function del_focused() {
    let focused_del_btn = document.querySelectorAll('.focused__del-btn')
    for(let i = 0; i < focused_del_btn.length; i++) {
        focused_del_btn[i].addEventListener('click', (event) => {
            event.target.parentElement.remove()
            get_focused_info()
            disabled_art_info_rodes()
        });
    }
}


// del support from table 
function del_support() {
    let support_del_btn = document.querySelectorAll('.support__del-btn')
    for(let i = 0; i < support_del_btn.length; i++) {
        support_del_btn[i].addEventListener('click', (event) => {
            event.target.parentElement.remove()
            get_support_info()
            disabled_art_info_rodes()
        });
    }
}


// del distributed from table 
function del_distributed() {
    let distributed_del_btn = document.querySelectorAll('.distributed__del-btn')
    for(let i = 0; i < distributed_del_btn.length; i++) {
        distributed_del_btn[i].addEventListener('click', (event) => {
            event.target.parentElement.remove()
            get_distributed_info()
            disabled_art_info_rodes()
        });
    }
}


// focused changer after drow rods
export function focused_changer() {
    let focused_bar = document.querySelectorAll('.focused__bar')
    for(let i = 0; i < focused_bar.length; i++) {
        if(parseInt(focused_bar[i].firstChild.innerHTML) > nodes.length) {
            focused_bar[i].remove()
        }
    }
}


// support changer after drow rods
export function support_changer() {
    let support_bar = document.querySelectorAll('.support__bar')
    for(let i = 0; i < support_bar.length; i++) {
        if(parseInt(support_bar[i].firstChild.innerHTML) > nodes.length) {
            support_bar[i].remove()
        }
    }
}


// distributed changer after drow rods
export function distributed_changer() {
    let distributed_bar = document.querySelectorAll('.distributed__bar')
    let list = []
    for(let i = 0; i < rods.length; i++) {
            list.push(rods[i].number)
    }
    for(let i = 0; i < distributed_bar.length; i++) {
            if(!list.includes(distributed_bar[i].firstChild.innerHTML)) {
                distributed_bar[i].remove()
            }
    }
}


// save btn check disabled
let rod_input = document.querySelectorAll('.rod-add__input')
for(let i = 0; i < rod_input.length; i++) {
    rod_input[i].addEventListener('input', (event) => {
        checker_rod_input()
      });
}
function checker_rod_input() {
    let rod_input = document.querySelectorAll('.rod-add__input')
    let i = 0
    let inputs
    while(i < rod_input.length) {
        if(rod_input[i].value == "") {
            inputs = false
            break
        }
        else {
            inputs = true
            i++
        }
    }
    if(inputs) {
        save_btn.classList.remove('disabled')
    }
    else {
        save_btn.classList.add('disabled')
    }
}
checker_rod_input()

let focused_inputs = document.querySelectorAll('.focused-input')
for(let i = 0; i < focused_inputs.length; i++) {
    focused_inputs[i].addEventListener('input', (event) => {
        checker_focused_input()
      });
}


// focused check disabled
export function checker_focused_input() {
    let focused_input_number = document.querySelector('.focused__input-number')
    let focused_input_value = document.querySelector('.focused__input-value')
    if(focused_input_number.value != "" && focused_input_value.value !="" && art) {
        focused_add.classList.remove('disabled')
    }
    else {
        focused_add.classList.add('disabled')
    }
}


let support_inputs = document.querySelectorAll('.support-input')
for(let i = 0; i < support_inputs.length; i++) {
    support_inputs[i].addEventListener('input', (event) => {
        checker_support_input()
      });
}


// support check disabled
export function checker_support_input() {
    let support_input_number = document.querySelector('.support__item-value')
    if(support_input_number.value != ""  && art) {
        support_add.classList.remove('disabled')
    }
    else {
        support_add.classList.add('disabled')
    }
}


let distributed_inputs = document.querySelectorAll('.distributed__input')
for(let i = 0; i < distributed_inputs.length; i++) {
    distributed_inputs[i].addEventListener('input', (event) => {
        checker_distributed_input()
      });
}

//check inputs for >=0
let rods_inputs = document.querySelectorAll('.rod-add__input')
for(let i = 0; i < rods_inputs.length; i++) {
    rods_inputs[i].addEventListener('input', (event) => {
        if(rods_inputs[i].value< 0) {
            rods_inputs[i].value = ""
        }
      });
}


// distributed check disabled
export function checker_distributed_input() {
    let distributed_input_number = document.querySelector('.distributed__input-number')
    let distributed_input_value = document.querySelector('.distributed__input-value')
    if(distributed_input_number.value != "" && distributed_input_value.value !="" && art) {
        distributed_add.classList.remove('disabled')
    }
    else {
        distributed_add.classList.add('disabled')
    }
}


// add focudes info in table
export function focude_add_info() {

}

//drow info table

let art_info_rodes = document.querySelector('.art-info-rodes')
art_info_rodes.onclick = function() {
    if(art) {
        focused_changer()
        distributed_changer()
        support_changer()
    canvas.width = canvas.width
    drowRods()
    for(let i = 0; i < nodes.length; i++) {
        drowFocuseds(nodes[i].number, nodes[i].focused)
    }
    for(let i = 0; i < rods.length; i++) {
        drowDistributed(rods[i].number, rods[i].distributed)
    }
    for(let i = 0; i < nodes.length; i++) {
        if(nodes[i].support !=0) {
            drowSupports(i)
        }
    }
    }
}


//disabled art_info_rodes
function disabled_art_info_rodes() {
    let focused = true
    let distributed = true
    let support = true
    if(nodes.length == 0) {
        art_info_rodes.classList.add('disabled')
    }
    else {
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].focused != 0) {
                focused = false
                break
            }
        }
        for(let i = 0; i < nodes.length; i++) {
            if(nodes[i].support != 0) {
                support = false
                break
            }
        }
        for(let i = 0; i < rods.length; i++) {
            if(rods[i].distributed != 0) {
                distributed = false
                break
            }
        }
        if(focused && distributed && support) {
            art_info_rodes.classList.add('disabled')
        }
        else {
            art_info_rodes.classList.remove('disabled')
        }
    }

}

// // исходные данные в виде строки JSON
// const data = `{"users":[
//     {"name":"Shyam", "login":"shyamjaiswal"},  
//     {"name":"Bob", "login":"bob32"},  
//     {"name":"Jai", "login":"jai87"}  
//   ]}`;
//   // парсим данные
//   const parsedData = JSON.parse(data);
//   console.log(parsedData.users[1].name); // => Bob
