export function make_matrica_A() {
    let matrica_A = [];
    let a = [];
    for(let i = 0; i < nodes.length; i++) {
        matrica_A[i] = []
        for(let j = 0; j < nodes.length; j++) {
            matrica_A[i][j] = 0;
        }
    }
    for(let i = 0; i < nodes.length; i++) {
        for(let j = 0; j < nodes.length; j++) {
            if(j!=0 && j!=nodes.length-1) {
                if(i==j) {
                    matrica_A[i][j] = ((rods[j].A)*(rods[j].E)/(rods[j].l)) + ((rods[j-1].A)*(rods[j-1].E)/(rods[j-1].l))
                    matrica_A[i][j+1] = -((rods[j].A)*(rods[j].E)/(rods[j].l))
                    matrica_A[i][j-1] = -((rods[j-1].A)*(rods[j-1].E)/(rods[j-1].l))
                }
            }
            if(j==0) {
                if(i==j) {
                    matrica_A[i][j] = ((rods[j].A)*(rods[j].E)/(rods[j].l))
                    matrica_A[i][j+1] = -((rods[j].A)*(rods[j].E)/(rods[j].l))
                }
            }
            if(j==nodes.length-1) {
                if(i==j) {
                    matrica_A[i][j] = ((rods[j-1].A)*(rods[j-1].E)/(rods[j-1].l))
                    matrica_A[i][j-1] = -((rods[j-1].A)*(rods[j-1].E)/(rods[j-1].l))
                }
            }
        }
    }
    for(let i = 0; i < nodes.length; i++) {
        for(let j = 0; j < nodes.length; j++) {
            if(nodes[i].support == 1) {
                if(nodes[i].support == 1 && j==i) {
                    matrica_A[i][j] = 1
                    a.push(i)
                }
                else {
                    matrica_A[i][j] = 0
                }
            }
        }
    }
    for(let i = 0; i < nodes.length; i++) {
        for(let j = 0; j < nodes.length; j++) {
            if(a.includes(i)) {
                if(matrica_A[j][i]!=1) {
                    matrica_A[j][i] = 0
                }
            }
        }
    }
    return(matrica_A)
}

export function make_matrica_B() {
    let matrica_B = [];
    for(let i = 0; i < nodes.length; i++) {
        if(i==0) {
            if(nodes[i].support==1) {
                matrica_B.push(0)
            }
            else {
                matrica_B.push(rods[0].distributed*rods[0].l/2+nodes[0].focused)
            }
        }
        if(i==nodes.length-1) {
            if(nodes[i].support==1) {
                matrica_B.push(0)
            }
            else {
                console.log("distrib",rods[i-1])
                console.log("focudes",nodes[i])
                matrica_B.push(rods[i-1].distributed*rods[i-1].l/2+nodes[i].focused)
            }
        }
        if(i!=0 && i!=nodes.length-1) {
            if(nodes[i].support==1) {
                matrica_B.push(0)
            }
            else {
                matrica_B.push(rods[i-1].distributed*rods[i-1].l/2+nodes[i].focused+rods[i].distributed*rods[i].l/2)
            }
        }
    }
    return(matrica_B)
}

export function make_matrica_vectors(A,B) {
    for(let i = 0; i < nodes.length; i++) {
        A[i].push(B[i])
    }
    return(A)
}
// получение Ux
function SLAU(A) {
    let n=A.length
    let m=new Array(n); //Определение рабочего массива
    let l=new Array(n); //Массив ответов
    let i, j, k;        //Вспомогательные переменные
    for(i=0; i<n; ++i) {
        m[i] = new Array(n);
        l[i] = new Array(n);
    }
    for(i=0; i<n; ++i) { //Заполнение матрицы
        for(j=0; j <= n; ++j) {
            m[i][j] = A[i][j]
        }
    }
    Iteration(n);
    Answers();
     
    function Iteration(iter_item) { //Функция итеррация
        for(iter_item=0;iter_item<(n-1);iter_item++) { //Цикл выполнения итерраций
            if (m[iter_item][iter_item] == 0) SwapRows(iter_item); //Проверка на ноль
            for(j=n; j>=iter_item; j--) {
                m[iter_item][j] /= m[iter_item][iter_item]; //Делим строку i на а[i][i]
            }
            for(i=iter_item+1; i<n; i++) { //Выполнение операций со строками
                for(j=n;j>=iter_item;j--) {
                    m[i][j] -= m[iter_item][j] * m[i][iter_item];
                }
            }
        }
    };
    function SwapRows(iter_item) { //Функция перемены строк
        for(i=iter_item+1;i<n;i++) {
            if(m[i][iter_item] !== 0) {
                for(j=0;j<=n;j++) {
                    k = m[i-1][j];
                    m[i-1][j] = m[i][j];
                    m[i][j] = k;
                }
            } 
        }
    };
    function Answers() { //Функция поиска и вывода корней
        l[n-1] = m[n-1][n]/m[n-1][n-1];
        for(i=n-2;i>=0;i--) {
            k=0;
            for(j=n-1;j>i;j--) {
                k = (m[i][j]*l[j]) + k;
            }
            l[i] = m[i][n] - k;
        }
        for(i=0;i<n;i++) {
            console.log("Значеие Ux(qL^2/AE) в",i+1,"узле",'=',l[i])
        }
    };
    return(l)
}

// значеия Nx
function make_N(l) {
    let N = []
    for(let i = 0; i < rods.length; i++) {
        N.push(rods[i].A*rods[i].E/rods[i].l*(l[i+1]-l[i])+(rods[i].distributed*rods[i].l/2)*(1-2*0/rods[i].l))
        N.push(rods[i].A*rods[i].E/rods[i].l*(l[i+1]-l[i])+(rods[i].distributed*rods[i].l/2)*(1-2*rods[i].l/rods[i].l))
    }
    for(let i = 0, j = 0; i < nodes.length; i++,j=j+2) {
        if(i==0) 
            console.log("Значеие Nx(qL) в",i+1,"узле",'=',N[j])
        if(i==nodes.length-1)
            console.log("Значеие Nx(qL) в",i+1,"узле",'=',N[j-1])
        if(i!=nodes.length-1 && i!=0) 
            console.log("Значеие Nx(qL) в",i+1,"узле",'=',N[j-1]+","+N[j])
    }
    return(N)
}

// значения σx
function make_voltage(n) {
    let U = []
    for(let i = 0,j=-1; i < n.length; i++) {
        if(i%2==0) {
           j++
        }
        if(i==0)
            U.push(n[i]/rods[0].A)
        if(i==n.length-1) {
            U.push(n[i]/rods[rods.length-1].A)
        }
        if(i!=n.length-1 && i!=0) {
            U.push(n[i]/rods[j].A)
        }
    }
    for(let i = 0, j = 0; i < nodes.length; i++,j=j+2) {
        if(i==0) 
        console.log("Значеие σx в",i+1,"узле",'=',U[j],"допускаемое значение", rods[0].B)
        if(i==nodes.length-1)
            console.log("Значеие σx в",i+1,"узле",'=',U[j-1],"допускаемое значение", rods[nodes.length-2].B)
        if(i!=nodes.length-1 && i!=0) 
            console.log("Значеие σx в",i+1,"узле",'=',U[j-1]+","+U[j],"допускаемое значение", rods[i-1].B,rods[i].B)
    }
    return(U)
}












// let test = JSON.parse('data.json')
// console.log(test)
// const data = `{"users":[
//     {"name":"Shyam", "login":"shyamjaiswal"},  
//     {"name":"Bob", "login":"bob32"},  
//     {"name":"Jai", "login":"jai87"}  
//   ]}`;
//   // парсим данные
//   const parsedData = JSON.parse(data);
//   console.log(parsedData.users[1].name); // => Bob