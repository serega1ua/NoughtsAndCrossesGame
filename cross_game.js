/**
 * Created by Sony on 23.10.2017.
 */

// TODO упрощаем создание html-разметки
// TODO алгоритмоценки совпадения "по диагонали" разработать
// TODO значения записывать в двумерный массив
// TODO перестроим модульность кода, разбив на функции отдельные


startGame();
//создаем анонимную самозывыающуюся функцию (function expression), вызов на "месте",
// в глобальном простанстве имен она не затрагивает пространство переменных, т.к своего имени не имеет, свои переменные локальны у неё
function startGame() {

//создаём саму html-разметку, всего 12 элементов: 1 отступ от содержимого (i=0), 2 блока очиcтки от float (i=7 или i=9), 9 блоков клеток
// создаём их в цикле, так как они индентичны


    var wrapperDiv = document.createElement("div");
    wrapperDiv.className = "wrapper";



    document.body.appendChild(wrapperDiv);
    console.log("1");

    var arrForElements = [];
    for (var i = 0; i < 10; i++) {
        console.log("2");
        if (i == 0) {
            arrForElements[i] = document.createElement("div");
            arrForElements[i].style.clear = "both";
            arrForElements[i].style.maxWidth = "300px";
            arrForElements[i].style.textAlign = "center";

            arrForElements[i].id = "titleBlock";
            arrForElements[i].innerText = "Noughts and crosses";
            arrForElements[i].style.minHeight = "20px";
            wrapperDiv.appendChild(arrForElements[i]);
            continue;
        }

        arrForElements[i] = document.createElement("div");
        arrForElements[i].className = "cellClass";
        arrForElements[i].style.outline = "1px solid yellow";

        arrForElements[i].style.float = "left";
        arrForElements[i].style.backgroundColor = "lightsteelblue";
        arrForElements[i].style.minHeight = "100px";
        arrForElements[i].style.minWidth = "100px";
        arrForElements[i].style.fontSize = "12px";


        if (i == 4 || i == 7 || i == 1) {

            arrForElements[i].style.clear = "both";
        }


        wrapperDiv.appendChild(arrForElements[i]);

    }


    var cellsArray = document.getElementsByClassName("cellClass");
//        Element.getElementsByClassName() метод возвращает объект HTMLCollection
//        HTMLCollection предоставляет своё содержимое как собственные свойства, доступные как по имени, так и по индексу (как в массиве)

    // можем преобразовать при необходимости псевдомассив в массив, Фленаган советует в таком случае создавать статическую копию,
    // так как  HTMLCollection является "динамическим объектом"
    var cellsArray = Array.prototype.slice.call(cellsArray); // Или сокращённая форма: [].slice.call(cellsArray);
//можно обойтись без двумерного массива тут
    for (var i = 0; i < cellsArray.length; i++) {
        // cellsArray[i].innerText = "  cell # " + i;
        cellsArray[i].onclick = function (e) {
            handleCellClick(e.target, cellsArray);
        };
    }


    var stageOfCrossOrCircle;


    function handleCellClick(elemInProcess, cellsArray) {

        if (stageOfCrossOrCircle == "gold" || stageOfCrossOrCircle == undefined) {
            elemInProcess.inside = "red";
            Object.defineProperty(elemInProcess, "inside", {writable: false})
            elemInProcess.style.backgroundColor = elemInProcess.inside;
            if (elemInProcess.inside == "red") {
                elemInProcess.style.backgroundImage = "url(data:image/png;base64,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)";
            }
            elemInProcess.style.backgroundPosition = "center center";
            elemInProcess.style.backgroundRepeat = "no-repeat";
            // elemInProcess.innerText = "dataset.inside = X";
            elemInProcess.dataset.inside = "X";
//                elemInProcess.setAttribute("data-inside", "X");
            stageOfCrossOrCircle = "red";

// хочу запретить дальше изменять однажды кликнутую клетку через defineProperty, но не выходит
//            Object.defineProperty(elemInProcess, "dataset.inside", {writable: false})
//            потому просто снимаю обработчик с однажды кликнутого элемента
            elemInProcess.onclick = false;

        }

        else if (stageOfCrossOrCircle == "red") {

            elemInProcess.inside = "gold";
            Object.defineProperty(elemInProcess, "inside", {writable: false})
            elemInProcess.style.backgroundColor = elemInProcess.inside;
            if (elemInProcess.inside == "gold") {
                elemInProcess.style.backgroundImage = "url(data:image/png;base64,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)";
            }
            elemInProcess.style.backgroundPosition = "center center";
            elemInProcess.style.backgroundRepeat = "no-repeat";
            // elemInProcess.innerText = "dataset.inside = O";
            elemInProcess.dataset.inside = "O";
            stageOfCrossOrCircle = "gold";
//                elemInProcess.setAttribute("data-inside", "O");
//                Object.defineProperty(elemInProcess, "dataset.inside", {writable: false})
            elemInProcess.onclick = false;
        }


        if (cellsArray[0].dataset.inside && cellsArray[1].dataset.inside && cellsArray[2].dataset.inside) {

            if ((cellsArray[0].dataset.inside == cellsArray[1].dataset.inside) && (cellsArray[1].dataset.inside == cellsArray[2].dataset.inside)) {
                cellsArray[0].style.backgroundColor = "black";
                cellsArray[1].style.backgroundColor = "black";
                cellsArray[2].style.backgroundColor = "black";
                stopGame();

            }
        }

        if (cellsArray[3].dataset.inside && cellsArray[4].dataset.inside && cellsArray[5].dataset.inside) {

            if ((cellsArray[3].dataset.inside == cellsArray[4].dataset.inside) && (cellsArray[4].dataset.inside == cellsArray[5].dataset.inside)) {
                cellsArray[3].style.backgroundColor = "black";
                cellsArray[4].style.backgroundColor = "black";
                cellsArray[5].style.backgroundColor = "black";
                stopGame();
            }
        }


        if (cellsArray[6].dataset.inside && cellsArray[7].dataset.inside && cellsArray[8].dataset.inside) {

            if ((cellsArray[6].dataset.inside == cellsArray[7].dataset.inside) && (cellsArray[7].dataset.inside == cellsArray[8].dataset.inside)) {
                cellsArray[6].style.backgroundColor = "black";
                cellsArray[7].style.backgroundColor = "black";
                cellsArray[8].style.backgroundColor = "black";
                stopGame();
            }

        }


        if (cellsArray[0].dataset.inside && cellsArray[4].dataset.inside && cellsArray[8].dataset.inside) {


            if ((cellsArray[0].dataset.inside == cellsArray[4].dataset.inside) && (cellsArray[4].dataset.inside == cellsArray[8].dataset.inside)) {
                cellsArray[0].style.backgroundColor = "black";
                cellsArray[4].style.backgroundColor = "black";
                cellsArray[8].style.backgroundColor = "black";
                stopGame();
            }

        }


        if (cellsArray[2].dataset.inside && cellsArray[4].dataset.inside && cellsArray[6].dataset.inside) {

            if ((cellsArray[2].dataset.inside == cellsArray[4].dataset.inside) && (cellsArray[4].dataset.inside == cellsArray[6].dataset.inside)) {
                cellsArray[2].style.backgroundColor = "black";
                cellsArray[4].style.backgroundColor = "black";
                cellsArray[6].style.backgroundColor = "black";
                stopGame();
            }

        }


        if (cellsArray[0].dataset.inside && cellsArray[3].dataset.inside && cellsArray[6].dataset.inside) {

            if ((cellsArray[0].dataset.inside == cellsArray[3].dataset.inside) && (cellsArray[3].dataset.inside == cellsArray[6].dataset.inside)) {
                cellsArray[0].style.backgroundColor = "black";
                cellsArray[3].style.backgroundColor = "black";
                cellsArray[6].style.backgroundColor = "black";
                stopGame();
            }

        }


        if (cellsArray[1].dataset.inside && cellsArray[4].dataset.inside && cellsArray[7].dataset.inside) {

            if ((cellsArray[1].dataset.inside == cellsArray[4].dataset.inside) && (cellsArray[4].dataset.inside == cellsArray[7].dataset.inside)) {
                cellsArray[1].style.backgroundColor = "black";
                cellsArray[4].style.backgroundColor = "black";
                cellsArray[7].style.backgroundColor = "black";
                stopGame();
            }

        }


        if (cellsArray[2].dataset.inside && cellsArray[5].dataset.inside && cellsArray[8].dataset.inside) {

            if ((cellsArray[2].dataset.inside == cellsArray[5].dataset.inside) && (cellsArray[5].dataset.inside == cellsArray[8].dataset.inside)) {
                cellsArray[2].style.backgroundColor = "black";
                cellsArray[5].style.backgroundColor = "black";
                cellsArray[8].style.backgroundColor = "black";
                stopGame();
            }

        }

        if (cellsArray[0].dataset.inside && cellsArray[1].dataset.inside && cellsArray[2].dataset.inside && cellsArray[3].dataset.inside && cellsArray[4].dataset.inside && cellsArray[5].dataset.inside && cellsArray[6].dataset.inside && cellsArray[7].dataset.inside && cellsArray[8].dataset.inside) {

            stopGame();  }


            }


    function stopGame() {

        for (var i = 0; i < cellsArray.length; i++) {
            cellsArray[i].onclick = false;

        }


        document.getElementById("titleBlock").innerText = "Game is over."

        var button = document.createElement("div");
        button.style.clear = "both";
        button.id = "startBlock";
        button.style.backgroundColor = "lightsteelblue";
        button.style.outline = "1px solid yellow";
        button.style.marginTop = "320px";

        button.innerText = " Click here to start  the Game again";
        button.style.minHeight = "30px";
        button.style.lineHeight = "30px";
        button.style.maxWidth = "300px";
        button.style.textAlign = "center";

        wrapperDiv.appendChild(button);
        button.addEventListener("click", startClear, false);


    }


    function startClear() {


        wrapperDiv.innerHTML = '';
        wrapperDiv.parentNode.removeChild(wrapperDiv);
        startGame();
        // if (window.cellsArray) {
        //     cellsArray = null;
        // }
        // if (window.stageOfCrossOrCircle) {
        //     stageOfCrossOrCircle = undefined;
        // }
    }

};