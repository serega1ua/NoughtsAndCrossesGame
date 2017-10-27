
// для имитации передачи массива со значениями
// надо вызвать game.handleArrayFromBackEnd(testArray);



//TODO при уведичении количества клеток rowsNumber перестает работать корректно очистка экрана, хотя раньше работала (ищу баг)
//TODO у меня понимание, что я как-то неверно чищу страницу при каждом новом запуске


var game = {

    cells: [],

    // у нас не будет жесткой привязки к количеству элементов
    //передали в вызове init количество рядов и ячеек в ряде
    init: function (rowsNumber, cellsNumber) {
          rowsNumber = rowsNumber || 3;
          cellsNumber = cellsNumber || 3;

          if (rowsNumber > cellsNumber) cellsNumber = rowsNumber;
        if (rowsNumber < cellsNumber) rowsNumber = cellsNumber;

        for (var i = 0; i < rowsNumber; i++) {
                    this.cells[i] = [];
            //массивы this.cells[0] this.cells[1] this.cells[2]
            //хранить значения клеток будут вложенные в них массивы
                    for (var j = 0; j < cellsNumber; j++) {
                        this.cells[i].push(
                             this.createElement(i, j)
                        );
                    }
        }


    },
    // конец метода init


    // метод, которым обрабатываем полученный от back-end массив значений клеток. Принцип: получаем значения false/true для каждой клетки и:
    // - циклом прогоняем по имеющемуся у нас массиву this.cells, выставляя по нему полученные значения клеток,
    // - потом визуально отображаем их
    // - потом запускаем проверку совпадений (уже имеющуюуся) и отображаем, если есть ряд-победитель




    handleArrayFromBackEnd: function (ArrayFromBackEnd) {

         // console.dir("ArrayFromBackEnd");
         // console.dir(ArrayFromBackEnd);


// перебираем булевы значения для ячеек из полученного массива,
// присваивая их свойству dataset.value,хранящемуся в нашем "родном" массиве
        for (var i = 0; i < ArrayFromBackEnd.length; i++) {
            for (var j = 0; j < ArrayFromBackEnd[i].length; j++) {



                this.cells[i][j].dataset.value = ArrayFromBackEnd[i][j];
                console.log("this.cells[i][j].dataset.value");
                console.log(this.cells[i][j].dataset.value);
            }
        }

        this.showArrayFromBackEnd();

        // console.dir("reformed this.cells");
        // console.dir(this.cells);

    },


    showArrayFromBackEnd: function () {
        var test = document.getElementById("wrapper1");
        // console.dir(test);
        if (test){
            var deleted = document.getElementById("wrapper1");
            deleted.parentNode.removeChild(deleted);}


        for (var j = 0; j < this.cells.length; j++) {

            for (var i = 0; i < this.cells[j].length; i++) {
                // console.dir("точка контроля 4");
                // this.cells[i][j] = document.createElement("div");
                // this.cells[i][j].className = "cellClass1";
                this.cells[i][j].style.outline = "1px solid #5965b1";
                this.cells[i][j].style.float = "left";
                // this.cells[i][j].style.backgroundColor = "green";
                this.cells[i][j].style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF8AAABfCAYAAACOTBv1AAAACXBIWXMAAArDAAAKwwE0KSSrAAAhEElEQVR4Xu1dB5hU1dkegsDiCtItSUwkMVEfkxCJRAyKKAosbYGlDFVAmggI0gXpvdcFpLcFli0sC+wuvS6I9N6b0hQxGoOz/sn3v++558ycmZ1d0Czz//HZfZ73ubMz957yvl87585zx+XK/ctlIJeBXAZyGchlIJeBXAZyGchlIJeBXAZyGfh/x0AejCgr/Ayf/bciu3nxs/+TPzMokpoXeADIp5Efx58yzDw5Z86dHIRMCHbEDg3hBfC6IBAOPKRRCEeDwnj93wx7LmZ+D+o5c+4Ug1zcdxFIPNVmh2GacJvYIniPKPoThJkbjw9rUBgKQRHuqwDG4kk8LZ2k0xJo8aXLv171hVq1alVq1qBuRFN33ZqNourUalgvsnaOIxJtatTDMThq4v2cA6ZSi/OJqlOz6ptvRlR69HdlXsCcf605oKGRCxqjEQAvc/aP5LNxdsLOwp+v8MZft2xPjz5x8tTRm7e+vn391lfffHbzy39+euPWnc9u3rpz9eaXmfE53tO4hmN2uP757TvXv7g7buCc+4pbt9U8MNZvr31x++vzV67d2n/gYPqsRTFjwUNZ4BHt8eSGkSHHcwBjGhMpLb1Qxap1Xjx/+eoVwd+e87dlRfo5+WjjCRm/+qCMTTogE9cckknA5LWHZcq6wzI15YhMA6JTj8qMtKMyc/0xmbXhGK45LrOBOZtOyNzNJ2Te5pMyf8tJWbD1pCzcekoWbTsti7efliXA0h1nFGJ2npFlO8/K8l1nZQUQmw7sPicrFc5L3J7zEv8xcUEScgCJaIP9xKPd1EOfyp5zn8v1f/ybU5f1mzZ/Apt8BZz8QhslIwO5yrE/E+sZ22j1D6du2LKQnY9f9Yl0nbtZei/aLv2X7pRBy9Nl8Ip0GbJitwyL3S3DV+6REXF7ZGT8xzIKGJOwV8Ym7pVxuI7XTli9TyYCk5L3y5Q1+2XqmgMybe1Bmb7uoEQDM1IOyczUQzIr9bB8lAasPyyz1x+RORuOyNwNR2XexqMyH1iw6Zgs2HxMFm45Jou2HJfFxNbjsmTrCVm6zUGMhvn/hxxjtp9U1y9Bm+yL/e44cVUJ0K1X39ng5E/AYzoy5Dj5DDlOrM9f7NlTZ85d3H7mc+k4a6P0W7IDxO+QD2N2ysBlu4IIsNtPgNG2AEkBAigRshAA5M8CZtsCgAQlAMkHFkKARUYATb4RIGY7BACJy3IINIAv7vxLYleuPAle6gK/A5gHGXpy7I+WT3diyCny5/Ivv3Lt5pdfz0WI6DJ7s/SB1fddtEM+WLxDCfEhPGBAzC6vEPSCofCCYSshAjxhZJzjBRRhDL0gUXsBhDBeMFmLMHWtI0T0ukMSDS/wegK9QAkR4AVaBJ8QjgfYXqA8IAcEYB+HrnwtW3ekfwVeugJ/AZiAaag5Fvdt8ovVrFatxtWbt74dkbBP3puzWXrM3yo9F2yT3gu3OUJoERiGfN6wKyAc+bxhdLBwlIRQhHDkiIBwpEVQ4cgWASHJKwKEmAtrNKFo/iYnHGX2huOyVIej/8QbGII2HrsmR46f+jY8PHwYCGfsL3U/yGeypUsVr1u7Wr1LV2/e6b0kXTp/tEm6zd0i78/b4hWhF0RgDui7eLv2Bojwo73BlxMmQwSGJCWEzgkUwskJgM4Jc4w33CUk/afeQAGTD1yRU+cufFeyeNEJ4OYN4HEdJXLU8kk+FxUlI2tGNDj32Y07Xedvl44zN6rQQw/oqkXoDk+gN/SyvMGEJOaGAd7c4HjD0IDk7A1JKjd8opLzBBOSvN6gRTDJOauQpLzhqMy9h9zg84Z7ywtM2EmfXJIz5y96SpUoMQ3cVAN+qcnP0ZjvJT+qVvVG5z694ek0d5u0j14v7yLpdgLoBRSiK4QI5g0mJFGI/gG5YTCqJJMbhjM3sEICjBB+FRJCUmBumAZvyFQhpTnewASd2Rt8IckJSyYv+Cqku+UGkr963yU5d/FSxiOPlIwG29U1+eQqx/7oQl7y69WMcJP8d+dslTbT0pQA78zYoLyAQhgR6A1GBHpDzwXaGxCSKITPG5ig/Sulu3mDKlMzJWidGxCS7NzgDUkmQQfkBlWmWrnBLlN9lVJmbyD5aw5clvOXLmc8+kjJmeCoJvCE5uo+kn/luqf9rM3SckqqEqDt9PVKhA4Q4Z2ZjhCdZm1SQqiQpIXoHpAbvN5glasDWK4CZr3ASkl5g1UpZVovWN7ABO2Uqz5v8OaGYOWqWS9kWa5a3mCVqw75V0D+FZv8X+U0+WZ1y5hfipZ/FuS3mbFJmk9aJ60gQOupqfK2EiFN2kGE9jPu1Ru2iUrQC+9WriI3sFzVCze/clXnhuDe4EvQmSqlH1WuOkKoBZch/6Ky/Fna8g35OZZwM5F/5vJ1T6vpG6XJ+LXSAgK8NTkFXpAirbQI9IZ2Ad6gcgM8oTMTNHODSdCWN/jK1e1+izflDVw969zgiGDKVeYGrBkCV8/3Wq4iNwRbMziLt6zLVYan1fsvy7kLlxnzQ0f+6cvXPC2mbpBGY5Ol6YS10gygF7SYvE5aQohM3kAh6A3ekBQ8NzhrBuQG75rBlxvsctURQXsDROA2hp2guXhjpZSdN9ATvN4QUK5mtYWx0Jsbjqv1QxIS7tkLKuGGiPzICPeJi1c9jSalSv3Rq5UAjcetgRescYSYCBEsbzAhKTtv6DJb5wZ6A9B9vrNuCFquslIKKFeHeEOStXjjCtoqVx0h7L2kwHLV2kuyQ5IpVwNyA/eUEvdeRKkZQvLrR9Z0HzxzxVN9ZLJEjVqtBGg4JlmJ4IYIjSFCEy0CvUGFJO0Nb09N8yZo5oYOxhsCylW7UjIraN/iLfhWhl2uBt3KgBDeDb0g5SoXb8Yb7A09p1w9kmkrg2sH7pyeDin59Wq69x+/4Hmt30qpOypJ6o5M8orQYAyEUCIYb1irvKF5dt7ABK0rpbuVqz0ylasmN9hbGc7O6lAgcGdV7ScFW7wl//CtDAqycs8FOXkulJZP8o+c9zzfYYHUGpEokcMTpc6IVUqEehQCnqBEAIw32CFJeQOgErSulEy56ucNqlzNvHjzlatWbtDrBu/iDQmaO6yBucEpVwMWb97cEHwrw84N9lYGXy9PPy8nzl4MXcyvD/IPHLvgeaLRdHltQKzUBvm1AB4jIUKdkaukHjwiCmBI8vMGhiRUSCpBW97QCkL4lau6UnIWbxucVbReQQduZXBTz5SrmRdvvt3VwWZ31brPEGwrY3xWu6sBi7folIMSg5ssx85cyHikZKgSLsk/ftFTNHKS/P7deSB9lVQfkiA1hiZIzWEJjhDwCK83UAivN/jnBpOgvblBe4OdG3whSYvAxZspV+dskW4oVe2NPXt31buVgQTtXbxZldK9bmX47646uYE5YgnurB0+HWLy98Pyi9aZLGENJkqVgSslYnC8VAMihsRLdYoA1IIQmb0BCRrhiN7gTdCqUqI3rHO8IatyVeeGe97K0Lur2XmDt1z1Lt58Icm/XM28n8Rd1oW4zXnw5PmMkqGy/EhUO3sR80tGTRFXxCh5puNcEB4vb0KEqoPiHBGA6hDCeIMtgsoNdkjSQgQvV3Vu4OINCLaV4V28cStDL97oDfZWRqZ7DcHKVR2WfN5g3/p0dlftcpVl67wtp2T/ibOhJX/PIZI/VVw1Rkv+euPl5b7LpAqIf2PASiUCXxshMoUknRuMCAxJJjdkVa62sMrV1pnKVewn6Y09O0FnW67e4523TIs3ayuDd+B44//jo2dCSD72dnYdOOcpQfJrjRFXzTFSstk0qQziK38YK68DXhEG+kRwvMHJDYEhySlX/RP0j128mXLVm6ADtzJMuYr9JGdjL+tylWEpqy8CsGydteG4pB8+HTrya4L87fvO+siPHAcBRstv2s1WVl+pf6y8BlCEyqiG/LxhsBOW7JBUa5iToFkpBXpD4OLNL0GzXPVuZQQu3jLvrt71XoO1za22MnS5yj0leyvDlKu85xCddkx2HjoZWvK37D3jKVEfMZ+WT/Jrj8XrsfIMqh96wKv9Vih4RbC9wQpJKkF7vcG/XA3mDW7vVkbmxdu9lqud7a0M5ga/O2/B7jXY5arvazHcZZ2aclS27j+ZUbx4iErNiIgI98Y9p/zJ1wLkgQhPIwHT6l/5YLlU/MARoVJ/S4gAb/Al6LuXq6yUsl28sVLKplxVucG7laFvf2a685Z5Yy/YnbdBy3fJJHwpbNPe4yC/eGg21iIiqrhT0096iivLh8WTeAN6APC7DnMU4RTgFSTjijgqEZQ3rHBCkvKGWCdB27nBVEl+uQHrhiwXb9hP8parevEGEbinZHtDG3Ov4YfcefPea8i8u8rNvfHJhyRtz9HQkV8F5K/deTw4+VYIerLtRyCe5C+XCn2WqYpIeUM/LQS9QSfowNxQDbkhsFzl4i0yy8Vb8K0MZ3fV9ganXA16r8HceTPlKndXs7nX8AES9Wh8NXLdriMZxUJl+ZWrVHEnbTuWNflGAFRBJZpOk7/2WKJI/1vvGH8RjDfYISm73GAWb0G3MrIoV83ijfca9A5rpv0kbGWo3dW7lKve+9B68cYtjREJ+2X1jkOhJT9+y2FPsWBhxw5BqgoaIwWjJshzneYrAegBWYlgJ2hTKWUKSX7lqpWgrUrJu5/kt3hzErTvXoO9ePNVSvZ96Mz7SfhCgFq84asxKFcpxtC4fZKw9UBGsWIhivmVKld2L9948N7IpwDIC0zEP285Q8rRCxCGKMBLwN/6xMjLdkjyyw0/sFzNtHjzrRvsxZsjgu/Om5MbgtyHZm7Qd96CfSuDXwoYFLtXYjftyygSKvIrgvwlaQfunXwrDIVFTZTftp8tL/ZcqnKAVwQrJPF9k6BNpURPCO4NJjcELt78N/bs3dWsF2+ONzi7q8gNTNDWfWh7d5XlKr+Z0X/ZxxKz/mOQXyw01U6FSpXcC1L2eYpmGXbGo/rJAqyOao6V8IaTIcIc5IOlCEX0hGXwBIqxTIUmvqeStV+5ahZvWEljLeEs3uLUVoZTriZYu6vONnckdlzrjHBu+NTDXTe1lYG7bg3Unbc1+s6bLyQ1n5SCjT3eeUvV3sCQtF59NaZd9AbfV2NQrnIl3WfpblmYsid05JevWMk9O3kvyOf2AsvMbMjO6rPaTjgq2GCSPPH2LPlzt0UIQayIIATB3EAR8PpllquqSjJrBoigPCGzCFW9u6sQQm1x63sNyAnmXgPvvtkiNLRE4O3PpthZbT4RIkCItxCO+N0k7ifxqzFttAjtkZwpRs/F6TInOT2jcJEQWT7Jj161x1O0AcgniXVA/o+FEmGc5K07QYo3my6/7TBXnn9/ibwEy38ZCzSCAhjw/1eAiv1i5VVsYVTqvxJCrJTXua80ABt78IQ3B8XDG+KlKjwhAqvn6kMTpQZEqAkvqAXUVjd84A3whHrwhKjRjifw9mcjrBfc+h60bysDIqivxsAbEJJaKxEcMd5fuEuiV+0IHfllK1R0T45P9xRpmB35EyBIFgDRLi8m4jXAc2s7HpQ3apIUbTpdftVujvyp62J5sTeFwIoZ94wrguxXQLwB/38VqPRhHO6qxUGEeKk8MF7eAPlKBAhQFQJUgwARQPVhq6QGRUAoqg1EjlwtdSBCXS1C/TFrpAE8QXkDytTG49fhywDr4A0p+GoMQ1Kq8gaKQDG6zN8hk+O3ZRQqXCQ0Mb9s+YrucbE7Qf40hzASRwIVoZrMoMdJ+ByoZzAZr4OgLt6rg3NwpyxPvSkS7o6WEm99JE+2XyDPvbdUyvWCR/SLk1f6x0ulAQny2kAAR752/k+U1/FeZWJworwxeJVUGZIoVYauggirJGJYklQfngQRkqTmiNVSGwJEQoA6o5IhQjK8YY1EGRHGrYU3rFVCBIpAITrP2yHjVmzJCA8V+WXKV3CPjNnuKYJ7uK5Im/DsyMVWBG++eAGv4ZZ0FASsbwNt1g9APXxO1AWipkuBRjOkULPZUqr1PHmywyL5fZel8qfuK6R833ip0C9BKg5IlEqDVoH41VJlWLJUBaoNWy0Rw5MVqo9IlhpAzZFrpBZQe9QaiRy9VuoA9caslaix66TBuHXSEFbvnpAiTWD1zfAdpeaT06TFlDQcU9X/bnzeZuYWGRmzKXTk/6FcBfeQxds8DzeKdizUa70gF5aqoIgF/IgFeQ1AbANcpzBDXA2JmXgN8NholoOGH+GYBRri8wZAfZxP4No8ODdf49kS1nSuPNRivhRvvVAeb7dYfv3OUindaZn8tssyebrbCvljj1gp02OlvNA7Tl78IF7KExDtJRz/1o/ixctfe8dKOeDFPrHyArysTPdl8lzXpfJcl8Xy7LsL5Tft58ljrWdLoSbRUrrNfBm0IC2jUKgS7rNlK7j7LdjiebgxJs4QYYj2WjEJDiSZ5GpiFamzHbiJuQ4aE/OA+eJqEogFeI8w75v/rfd4HeFGG40ItNdQQ72eg/dsYBwUuQGhDUAJCsOAhykoj4MR1YFBRWKutQGEQ4VaE+WRFnOk35xUWH6Iqp2ny5Z395q72VO4MQZdj9atw4TXmrUVK7I10W5M2iZYkagJbLpIXM0WaywRV/OlQIy4WgDm2GIZ/v8h0NebNtgm+2iq+2m60Ne/Ek0bgBqnNgyOnXNQngkPVaDH6vnWnSKPtZwvPWetyygYqpj/VJny7q6zNnkKN8FASbwKH8ayA8mGBRqiOeFmJJoEAySGhL61XFwtYx20WgnEiat1PJDg4O1EC6vwOjtY55rr2RbbZNumH/apxMQYOB4FjM0rCgXB2JUY9BYKEiAGvOLRVgul6/S1GQULhajaKf2Hcu6OMzZ6CjfD4OiutnXTgppowjkRY9W0PD+iDcma3DZJ4mqzWlxt14ir3VoH7dcBKQ46pPrwTpq4gsF7jr5GXYs2THttk9EH+wEoKMWhKC21KEYQr5cYMbQQyjssIerPkEdaL5aOU5IzwkJF/i+eLeduM3W9p1BzhI2GjNkYEK2EFt4U7ynCdfiwCVcWbZFNMgzJJO6d9eLquNFBp83i6rxVYxuOQJftFnbgtQ39WWccea65thPaYFumXfbBvowoRhA/MeCBwYQwOcd4BHJFqbeXSusJqzPyh4fI8h8D+S0mpXkKtUD8ZBznoFRIYTzV4cSEEi/hCBVtYdntYNmcuCH7XUM0yQWZXXcB6eJ6fw/wMbBXXN33iavHfn/0PCAuG36f43xew2vZRje0xTbfQ9vsg+JQEPbtJwbGRu9jWPN6hRaCuccvNMHQkMRLtlkmzcYkgfzCoVlkPfZ0WXfj8ameh1oilJB4xkoTw23SaU10cVqXH+GbMHlYJC2ZhJAcEtUDhJHQXofE1fuogz7HxfXBSeDUDwSu4bWqnSNOm2zbiNJ1txYDY+i0xV+IdjAOr0eY0GS8gUWAzg+NF0iJtiuk0cjEjAdCRX4pkN9gTKonvBWSFq2dVuFn6Zp0Y+WMzx03YIIMJbC693aCcEy+OwhXZB8GUSCp7wlx9Tstrv5nxfXheXENuCiugZfENegK8Km4Bn92b+C5vIbXsg22xTbZNvugIBSD3kLRORaOiWPjGDlWjpkGwxxEA7I9oQXmzbyA8Fq8fZxEDQP5BUNk+aWeKuuuPQrkv41EpYhfoSsUxnPL0g3ptCzGYoYUhgFaX8+DDgl9YaH9zjgEDbzskDzkmriG3hDXsM/FNfwLcY34UlwjvwL+7mDU18FhPh9527mG17INtsU22TYFYV9eIeAVHIvyCIyNnsixqjwBEUx+oCfY4YhzbhYjxTrg+6hDEkJHfonSZd3Vh6d6HmwLst+CO7KUUyGGMR1VCgfMgXMCJrRwYrQ0WlyfY04I6X/OIWMwSBl63SFqBIgjuWO+FdfYO+Ia7wG+F9eE//Fh4r/EFQz2ORNwzThcyzbYFtukIEoM9EUh6BUcA8fCMSlvsEXQuUHlBVROnJvKCayUMOcWK6ToO0kSMQDkh4XI8kuULuOuMiTVU7A9rLwViWcy1YmU1s5ExmrDxHNalZd0uL6x8iFXQcZNh5TR32iyMxxiJ/9bXFNEXFOBacB0jWgcs4M5j9fwWrYxCW2xzfFom2J4hUDfgzEGGoARoTdE6AkRun/i5CIVjjAXVksdTCjSXtAyXoq8u0be7E/yC4Um4Rb9VRn3a4NAfgcQzjCjrB2WQQsx1s7qQsV0HV6YNJWlI7Qo0mGBDCVj/uFYqCJcE0YCZwCzgI+A2RpzcLwXmPN57UzdFtukGOyDfbFP9s0QRQOwRWAoZEhkPmJO4FzowZyb1wsw99arpHCnFKnUNyEjb8jI/0UZ98sfpnrCOiK8tLXDDGK7SqawGBVimEhRcTCm08WZMDlRTpihgJZIq6R12oSTvLnAfGABgGdauRZpLMYxO5jzeA2vZRtsi21STIrKvtin8YbREEGFJIqAMXKsHDPHTo+l5zIps0xl/jK5AN5eqMsGebk3yM8fIssvDPLL90vzFOhEV2R8t8KMiu2wGJZ3jKUMMYNo7Yizw2854YVWNwnWZ0inddqEkzgSvBRYBiwHVmjE4miwEq8J+z2ex/MJXss22BbbtIVgn7YI475zxsYkzeRMD1WhiF6AuajKiAnZCkNYQT/UdTO+DJAYQvIfK+P+S9/1ngJdaAUknuUjF0YmzCBusprws3aEmLH/dKyNpDMmG9LnaSslSTGaOBIaByQAicAqjSQcswPP4/kEr2UbbItiGCHoEcYbOAaOheGICZtjpGcOtbzgA8xF5YIDVkXk5IHwbtvkL91DTH6Z3hs9+bvp1aId302YYRJjbDfWbkIM4y5dn/GYBJCIJQCtlFZrCCfBq4E1wFpgHZAKpFhHvg4Ez+G5vIbXsg22ZYRgH+yLQhsROBaOiWNjGKRner1AJ2QVhigAchiNjMaGheKD3XfJH7smZeR9IERhJ7xUGfczvTZ78nVnNcDEispAVTOIkXRVhhmWcywbGdtpUSbEMO4yaTIEGEunZcYDtNpkTRxJTQM2ABuBTRqbcdySBfiZOY/X8Fq2wbYoBttmH+yLfdLLmCM4Fo6JY2MoMl7AhMxcwJCpwhAWat48gDmjmivYc688815yRp77SL79vJ1SJP+pHts8+XohDhriuXJUxGNlyUUNKxmWdQwzxtoZ1xliGH8ZAmiFNum0WJJF4kjkVmAbsAPYaWEXXhPpGuZ/+xxew2vZBgUxQrAPIwK9jGPgWDgmjo1ewFLWJGTOQYUhzIlz4xz7YK40NnhAWJ8D8lSXtcHIvz/P2wkD+aV77PQ80BfVTE+AxH9I4rFwYcUwCqtQJjC6sInttrXT7ZkoGZdJBAlZr0miVW/XRJPc3cDHwF6NT3DMDuY8XsNr2QZFYZtsm0KwLyMCx8CxmFBEL6CRMAxx7CoMYS40JlsAzhnrgQL9jsqTndMy8uT1hp37+7CjsBJl3E/0SP/ugX7cvLIsXhGPlSTjO12XLkxXNrHdtnbGYYYCxmgSQgultdKK92iC9+F4ADgIHAIOaxzBMRjM5zyX1/BatkFB2CbbZh/si97FvjkGjoUeaLzA5AKO3SsA8gC3L/w84LjkH3BaftlpvQfk3/cnTfHpgiXzFX6uwc+77b6TdyA3rHSoCUa8SaqMq4yvtrUzDpMAY+m0UFqrIZwEHgWOASeAkxZO4XUw2Occ19dSJLZlhGAf7Mt4AsMRx0IPpBeYXMAwRKPhHEweoFHRq1kJqRB0VvIPviiPd0j7Lo/rwRnWY774DNIc+zMxX5Gf/6Fno0p13fNt3mFYkJhQM5oWj/0UWjxjponvJJ4uzfhKC2MFwrjOmM6YTGs0pNNaSRaJI5GngTPAOY3zOF6wcBGvCfs9nmPO57UUiW2xTbbNPigw+2TfHAM9j2Pi2JiQOVaOmWO38wDn5hUAOWDgFck3/Br29Nf9E4+gmw5uatyvpwuaJ8qWyJ/38VolOu/8e95RWDTRCuxQY4hn7GQJyfqaLs2Sj3GWlkZrp/szJjN+26STLJJGEknsZQ08Mtv16T2C5/K6S7oNtmWEMCLQE9g3x8CxcEwmF9BIKADHzoosUACWosoDbkj+sbelaPOVX4P0SfrRjnygNZ8om2N/5omyfFB/cTwouFKxtik38k1kJYBExJ1H2+IN8YyhrK/p0ibM2Na+H+8zTpMQkn4WoBWTNBL4GXAVuAbcAK5b4P82Aj/jNbyWbbAttsm2jQgMZ+ybYzBewFxghyGOnQLQiCgAvdmEICZhlNJhkzOkSNS0z8HLSKAKwIdZ5zj55tn5fFZwmYebxR8O40DGYhDcgeRrxkcOkoO1iTdJlcQz3jIBGmtnPDeWTms1pJNMkntT4wscfwjMdUY0IwL7oCcwpLFvhiJ6AcdkwpBJxjQaCsC52B5gkjDK0AfxOrzK8PPgpD/wKsMykKMPsqYLsUE+wp0/WfFEwXLdZ4aj4zwMMxyMqWoYJ2ktxuKzIp6WZ0IMw4tNuk34l/jsNvAV8Hfg67uA5/BcXnNLC8b2KAK9gaGLfbFPCsAxMLHTGCgAjYNGQgHorQyXDJsmBzAJc0sCa5c8OIbD+PI99tJWcNIFKAcUAXL0Ee4knw2auP/zvK68EWH1446GoR7OC0vPQ+tgNWNIN0mV8ZRlHt2bVkZrY3gxhNPCP9dEGXK/wf/fAt8BGcD3wL808JsBruxgzuM1vJZtsC22SeEoDEVhn+zbCMExcWwmFHHMHDsLAxqQ8QLMkXPNCyMLm/yd5K84/CJ4YbJtAjwN8EnrOfZYR5M47B8wKI43n4EaTfM93SQhX1T02QKtltwq0HPHNz+b8GlGnhnXvs8z++r3eRYAS4FYIBFYA6QCm4BtQDrwCbAPOAQcAY4CJ4BTwFmN8zhe1LiAY3Yw5/EaXn9Gt3Vct80+2Bf73Avs0mPZiGMKkKzHukKPnXPgXDCnvGMvZRTotumb/G/Nv/VAjbFX8j5afg944A8XvAfwCeKM9zn6KF9DvrF+xn4mXnb0PFAH6AFlJgLz8cMGK1xhxeNcYcUSgETXgxrhOBoUwmuisIWH8ToQRfFeTiBY23bfZjz2GM24OQdnLgmuB4rEYY4xwDzMeQowCGgLVAZKa6vP8ZBjW78dfh7FB89q1Wvh6AbeAlrrQbXD8b8dJNegDV63ApoB9QA+sp0GyCeH82m7OfqjBbbVBwrAjsxvqPCB/dzTeAp4BngO+APwx58QOB/Oi8bGn+f4NUDjKwLct18JCiYA3zO/m2V+LY6xjoPg76owLBFMPj8lmF+G4zw53/v6w2RZEZ/7fi4DuQzkMpDLQC4DuQzkMpDLQC4DuQzkMpDLQBAG/heyDbdrnQak6QAAAABJRU5ErkJggg==)";
                this.cells[i][j].style.backgroundPosition = "center center";
                 this.cells[i][j].style.backgroundRepeat = "no-repeat";
                this.cells[i][j].style.opacity = ".3";
                this.cells[i][j].style.minHeight = "100px";
                this.cells[i][j].style.minWidth = "100px";
                this.cells[i][j].style.fontSize = "12px";
                this.cells[i][j].style.transition = "all .2s";

                if (j==0) { this.cells[i][j].style.clear = "both"; }

                this.cells[i][j].dataset.i = i;
                this.cells[i][j].dataset.j = j;


                this.cells[i][j].innerText = "cells["+i+"]["+j+"]" +"\u000D";
                this.cells[i][j].innerText += "dataset.i="+i+"\n";
                this.cells[i][j].innerText += "dataset.j="+j+"\n";

                this.cells[i][j].innerText += "тут row "+j+"\n";
                this.cells[i][j].innerText += "тут cell "+i+"\u000D";
                this.cells[i][j].innerText +=  "dataset.value = " + this.cells[i][j].dataset.value;


                if (this.cells[i][j].dataset.value === "null") {
                    // console.dir("точка контроля 5");
                    this.cells[i][j].style.backgroundColor = "f4c99c";
                    this.cells[i][j].onclick  = function (e) { game.handleOfCellClick(e.target); }
                     }

                if (this.cells[i][j].dataset.value === "true") {
                    this.cells[i][j].style.backgroundColor = "#f4c99c";
                    this.cells[i][j].style.opacity = "1";
                    this.cells[i][j].style.backgroundPosition = "center center";
                    this.cells[i][j].style.backgroundRepeat = "no-repeat";
                    this.cells[i][j].style.backgroundImage = "url(data:image/png;base64,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)";
                    // this.cells[i][j].dataset.value = true;
                    // console.dir(this.cells);
                    this.cells[i][j].innerText = "dataset.value = " + this.cells[i][j].dataset.value;
                    this.cells[i][j].innerText += "\u000D get from BE \u000D"+"cells["+this.cells[i][j].dataset.i+"]["+ this.cells[i][j].dataset.j+"]" +"\u000D";
                    this.cells[i][j].onclick = false;
                    this.turnerState = false;
                    // console.dir("точка контроля 7");
                      // this.searchOfWinner();

                }

                if (this.cells[i][j].dataset.value === "false") {
                    this.cells[i][j].style.backgroundColor = "#f4c99c";
                    this.cells[i][j].style.opacity = "1";
                    this.cells[i][j].style.backgroundPosition = "center center";
                    this.cells[i][j].style.backgroundRepeat = "no-repeat";
                    this.cells[i][j].style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABWCSURBVGhDxZsHmFXV1YY3CsGgJphoMBpbMBgsKGoUkYgiFpTpM9IUUUHsitgAFUusqIhgC8aa2GMXEJUO0pXODL2jQVBULAjr/959z7qcuYKioP88z3lmuHPn3v3u71vf2nufSwi/5NfxT/w+NBt4UGj+dqPQfFDjcPLABqHZm3VCvR7b/5LD+HneK3/sfqF4UrtQMP2BkFcxNDSfOzfkLfgkFCz+Ste6ULhkvb5/GwoWrQl581eEvDnT9bw3QsG0W0PhxIJwUv8//jwD25qvmj96/1A89fpQOGd8KFjybWi7znbsZHbwrWZlfc0u/6/Z7QPN+gw1e2CYWc9BZjf2M7vgWbPmD5rVvclsu0vMQpsvLRQs/DQUlPcPRZPah+av7bw1h7nlr1U07oRQXPFKKFy6NpxtdpAGfqXg+k8zW/qpbdbXN9+a/e8zs4mLzB4bZXb2E2b7XCv4M9dZKFzwUSiaem8oHFZnywe7Ja9QNLxBKKnoH0o/sR2kzDka5PBZ3+Vbu87sy2/MPv/K7NMvzVZ9Yfbx5xnA5ZqQpZ+YLV6VuZbp3yv0O64Zy8weHWl2Sm+zaucLvmjJmlA8rWfIe7XWlgz7x/9t4z47hDK9cfHy9dUvNLvsObO5/9sAum69ANeaffG12WdArjFbKUggPlqdgVwiyEUrzRZ8bDZvhdnsj8wqPjSbKchpS80mLzabuiTz+Cw9/uJEs/z7zaqcK/DihUtD8fh2P37gP+UvCoY2DKXzpoYzVHd9MoPzr6iiIFdLxU+ATFT8UJAot0QKOiQTlAs5RYCTZOmJC83GzzcbM89s1ByzEbPNxunf7+vxh1X7B99MnX8t8BnPBJL/Z/sqGtcxlCxdu/1FmTf2r1yrfoRVBelWXSgV50vFLOTyjJLTNVkOCQyQYwU5eq7ZSEEOrzAbUm727kyzgdPNBkzVv/UYP1Pj254n8JJ55aFo6KFbn7lkwm2hxRqre31GAb4+k5LRqgLMqphj1TlSEkuWC5KaxBFpyAkLNkBGNZUBQwU1WJDvzDB7S8HXX6BvTDZ79QOzl2RtrgF6/OY3zXbuLOiyxatDwYhTth50ycTeofU6O6ZHxprUqNdiVkXV43zqUYBzkrrLQsqqU1ST2BUlgcSiY6SkQw5zNQX5dqJmvylmr08yeyUBfWG82bNjzf4zxuyJ98z4d893zfbqKujSZd+G/FFFWw5dPKEHsE17KlmlJiFEmqYDJ6pI6CQqYlUCh+D5IA0puwL5npTEskAOlWUHJWoOTNR8U6CvAfq+2X8nmD0vsGdSoCR33+FmDw4x+9cIs3veSVrYacvWhsIRJ/506KIxl4RWX9nRd2aSlTZCouYGTtaqiYofSMWJUjFdk0ASPrQtt+y7rqZAUdNt+7JAX0yB/nt0RlEHfUgLl/sHm90nde9+O/P9Zi1gdrsaey9cHYoGH/jjoQtHNQ5ly622mj9AWBmLpmsxrSJ1nbVqEjyesFlIAiiB9Np8U7WJbanPLOi4jKKAPinQx6ToI1KUoHxAqgLYU6r20Krt9v5m/1At3zFAK7kXzHa8jLZVMTPkv7Lj5kMXDK4ZSmYvrKE07qfAoE6Bi2GDTVEwBejJ6lYF0GuS8HFILEvSuppu25cSRZ9LrFsJVJZ10N5ait4r0LsFCuCtUvWmN8yuf82s68tmN7xu1vIRs206Crrw/Sc2H7howmOhnVl3vQC9k6Bxi8awSSkY20cCGK2aqknCByXTkFk1lbTUJ8HznCuqMIqKamlJbf5Tij4o+/YRaC+peo/s2+Mts9sSVQG89hWzLi9pKftiZgF0tZa0R9wh4DM+08rsvfwfhs4feUxosdIaKpHpleNVi/RF1BsluDQgPRIFPXQARMW3pGJ/1SThQ12mLUtL8fp8VqBPC9IVfTwB7SvQbJ0KFvvelaNqd6naTaoC2FlWvlQbkAufNjv/P2btnzLb5Sp6dPl8bTxqfD908ZQxLBcZDAmbVS8Fh0XfAS6lIL3SrQpgtGtSl1lIKepq0lqyoKpRFCV5H2YnpUDCvr0E6qp6rd4oVa97VRaWqldJ1cufN7vkGe24BNpBoGc9nlmUNL03WYYWju+yaeCCUXmhzRor+WemTgcBloRMGo66Bo7ASSuYBaSdpJQEkv7paj4l2z4hNQmjNChtBvt6KKVVvVm1iqpY+BosLFU7ycIXC/a8f0vVJ83aPWbWRjXcQuPn+hP9uWzOilDwcs2NQxdPHVbjUs28Zh+7YksHez2xJsqRqPRIUhX1HO6FpJVEwKQugUTNp5LExbaVQKlTgdJmsqGU1OrtCqZblMAEk1v4Gln4CsFSrxfJwhFWip6ZwJ72sFnRA2aFuhqqnW7D8rNoQqfvAucPqR9arrAT78vAvgZUAkaKApUGI2xYEDgcCtJKHBC7oiQhlFWT9uLWTQLpfsFG+yatBlXvFKgHExa+Hgun6zWB7ShYtqRnPmrWWso6bHNtJ0+SpVksxVouK58Ryp7ftjJ08Qf3VNFs3KIERFUHel5KpRVLQ3kdol4WToBRxUTJRwXotiV1qVGSF1C3L63Ga9XbDetkUjjWq2Cvygknh22bwJYlyjrscXebNb7LbL/uquWzVlsgjLNfh51bLZTMmr2PNgYAxaafhEpaqahWohhQbk8syiqICzhUZKFACEXIJHXdug7qoURfpd1EC6u3Uq83qF4rwSqcPImzysrGKLsx2Eayc4PbMltJylTna/dtAG424vDQeqXlP5hpGVmARB0g/ALEYQByKMDScLQVAFkZUZ99khq9z+2rOmVZCCiqYmGv1wircPo+ZXNr1pVtImX/LtgjBVtfsPVuSmzdYtbMEMoSWxdNvILiZmn2pOyJ7Rhw+sKGAOReAKUv4BwQJalPh7w3qVPsS62mYVkeejiRxJVgqdlNpHGxRMrrY3ZyL7Mm92RgUfbQf5gdeKNZnevM/nCl9s5tl64Ppwypm1G5ZNqLO12RmWWAGCCtYaNX+ncJTHx+6nECyC/qk4UDkGlQgoneyvLQYQkobz1dqFvvs1pUsKDooNZDnz39X1pCqu2UCDZfsM0UtE0Fy/b1KMEeJth6CWwt7ZdrdtJp6AU6DMwf3TYDXDp7Wp0bNgyM2aeuNnb5wDf3O7bldVzRO1MWBtaBAaW/0ltZMZ2rRQQJzCKC7/FnwcZE7mtW+pBZwf064BPsCUrjYxVQDW83O/yWjI05qNjjaqkr4J0vN9s+biom9Qhh316/CS3mr2ogKwBxmwYRL80+FyrES4pQa36hEIPnwprfd8XnJX/rqgJKQLFiAhCwMxIYFg0EUYmg6KmAcYDHd/6NsnxPJ3IjrZ+PuNXsEMHur2Su3S0DvJvsDPRvdYXSaS+FcNxbh4XWi9eeoBoABlv5RU2RmPFSjWE9Lgbq6nzfxPgkARmfl/wdP6MoqyRUY4WEVduhoH6m1WDbVlISeNRkIUGtNtM46bEn6kJZDymv24Nk5b9K3X0FvHcXrbbUh3dVuf5O1zYtK0aGcOKwwiptP7Q8vSBghEU3hQbBQVLSGmj8DJD0pDcyIenJiJOQTER6MnxSXE3/He9BTWJbVkq0GX6mRrEu8ICfIWjaToRO+ixKY2OACSl6LeqSytQuCh+g8txPYVVbS8s9r5HKgmYBsm2b2ZNDaDaiQ9WzPo7AQLHNIizYhbCMY+vFACtNRM4k+AT4JLgTcr8DTJ1eIAuTun5haRb/ET4FjuKozfqYkHJolE5DE1YNE0uTzgQWNfwXHV64yrVk76qn64QzNBt+UY0OH9s+sgAzyYqmk5o8u5DOuli3xknQ43ESciagkgNyyoEJSE8CE3iJEpd1cPpiQcHjTACTATiKsyFA7UrQaXsngcWqinZ0VBJaqHxgovKfXWUpXe30ubNRuP2O566w3fUA8lMjPii2XQyGwTEJ7DsrOSCB9xJw60f7p6wPdEzgZAKv0ARmL70mr8vveJ8suBRH7VxoRCHMCLBTWTNrvMcn1j4aayu40ip7Le+uehawFG46JH+HDh9GhZkNLv6QICFUsBu7kgifKIP6rjyqu+0Bp+45cuGKNZ+0G57vDgHer6v1M+5hInkOr8378N6oTX2noeMmQdAsOCrV80ZUppZZeMC0h66qbWZPCqHhW4dsf9bib/4sv+N5Iv0AXYerFmjqvBlvzAU8A0H1qDjgSc17vXMKEQNPdc4FGEAsJJgQdwPP4eLf5AO/Bx5wFHe1eU+HpqYJMtI7vX5mlcXOiABDLNoTKmcTW1x7StBtW5aPCKFWj+23azvv49oqcpIN77MGpYHzh9QHFqJ9UFtRcUG77V3tGHQacFQ7gXAVo/IEndR2u2N5Lv7N4/ye5/H3TBBqM6m8jysdt4JyHi0rbe1sgCUq06IY/8FJT0blPQRc5bRpL8SFVtU2FZMBritlSThmh5hnx8Gs0et4UfohAUL7IFUBz6qtAbraMeCS+gYEKJKctud9nMTmZ/o7Ne7wvo7G/g59MdBJG2OB4ltC3//6WprlJeP1xEY4BIRrN+VTKJl0W2ZpWTbtmb0TdZkVZofEI+7pdTR6AoKgQO2WshRvyoxjN1RHiRhKUhplUQvlImjSo1lwpFdr/MziJO6UNAEO7ttCh8belNJ31tMahweYq4wjEcr7MgKyidil07cW8sa1ygDnT7xkd/Up9o7MClamFpgtaoPFOfVMUGAl+iKhRn1jc5RmULmwAADCSovlZVyjJ5sIX4v7Xti3iKi+qVMOr2e39ndOOZLEjpuIpEUh4EFi+k17fQSj8eB9M8BNhtXbqeNHVl/Kpu3MbLGicXWxNIGBuliLtsEgsDVBgyKuLLCssAABFEB2TuzA2DLGbWOyq4qH6/p99hAggU4fAMTTSb3PJndNcl/cNSUbiXR4HSDgX7UunyLSKskhQPdtqrWpmF5PwGk7099IQG58F0ld2kFaXd4cq2Fl6pa0pRc7LKoCAhCA92uvzN457qmHbjgg6KPH0yeV2Byl40F7kvS4Jx7c6f3Sxzue2Ky1EQaB0rb+m9xKPoVCdkrpr8L3b9lXv2ggK7DNqmTnVO3SFkhsVkJRXawsdalbBscgsTHKYlf2xQAByVEPJyR+asJ3P+diIvzUEkcATe3H00rlAe7hgCKtcjyW1XgQAkEQBoEQCluT1keqNHe5aJWFJkOPqAzc6J39d+q4bD13HLBDrp3pe9SMhxW1m6sug2OQDNZhUZWTE0A50OP4iLMwTjLTR7bp2yo4ghtlhBluwdr0aVc51rImnIlnS0mIxsOAlK29Jx8q8aq2mv5Bys4buKuUTh1QX7PirYh0Zs/J3jNtZ29LXruu7o3UrQbJYBk0ynJchJKPC5RDQA4FOe2Ml37mxBP47D1fPR+lqXlKArewWkNlyoZa9sN3wstbFBuL3AOBY5VBe3fVSccp+qjGRr9OGNlk10tX2/EC9fqlx3k659qZmmJlRO2irt+2ZLAMGmUjrIAA5cyaA3qOfrPHv2Mz8H5bFCf4LVFcklaZifX7SPHWirqE322gJ6frmHbaSMDbnT5rSaj35KY/2lildPKgI9THWJSzkcAm9DpPZ2bV7cxsU1ssFmglpDL1R90yaAaPssByUM9ZN3cMuVvxsq7sPSdNAJPB2Ta2p9ZxB2dhqMxEMqFMrN8l9GMgP+OiXSIMdYwzT1Zi1+4mdZuNu2jj6vqjTYYe+vvzlq9vxp4zWWx4/bKso/eSzoQHs82sU2PUGrXr6mJlBg8E59zAAsltGm62ZW+4vZ8B5y4G0NgbV8TDRE0cE0iZMKHZ8NJEe1r70ZDXMY4krY9Re6racvr0EB6u9v3A/Lb5hJ406yIpi02wi7ejWL+ezrIzYcKKChVQg9p1dRk8EA4LZL/Jul88JXPPON5S1b+5rfOSlOcOB24g2KLKSS0zkR5ebmsmHKd5HeNAX3Vxvl7r4pVK5hHH/TAsz/jTc7+u1rJ8RlPZAnUjsOIf+3g78vpl1mlFbmdUoXY5uEddIFAQKAC5f8yt1nd1xRvmAgca5bkJgBtcZSaOCXRb0+NjWstZBGa8FywBcB4dhIXRaQKvp71AOHVCr82D9WcdM6T+Th0Wf12iF+DF2KEATDvATr7Y8PolXFhkEFaog0qEEepypxFlgeUWLJ/c4RoyMwMO9BtSH8szQSQ3E8bihDwg9UnrdB3T/3GaBxdjRJQmyp1ty6aPC+H5X/04YJ59wnun79n5UztDoMxiXE4m/TcbWDn1S98lrFAJtQgprIyFuZHOZz9Gzsp8miB+CE3gKM4NvFc1MUwQExVtnbSoWMe0p6SOc4OLpGavXKjgqnHmvOXhqHf3+vGw/hcnj7lmv65f2TkC9c0CfZBVjwcW2z5WVqQqwIQObYYWhJ25aY66KMpHJvis1lhdo+dkoFGdCcH22Jq6p5WxGMExOAcHeXD5uZsn9bkaW0tB12y/6LPQaNCRPx02Cz2+e91uX9n5AuW4B+B0QrO6AtgDC2CvX26aY2dURF0gJ8zXB2UW6PMj8zJKMxFMCLbGEV7HANOe4g2CTQCzV24j5/2ug2CPHn7slsP6KzQd17n2FSvt/GQbmAucTuh0YMX6lV0B5sOiqMvHKfgo4kSBvydgbO3AOMKBKQ0HZovJSo7McIWvUktsoaXlb89esCwcPbjB1oP1V2o8srTWeUtWnanguk6tiMSkB6Pw5gCj8BgpjLqTBI3SAPOJgx8CTiscj5D0/qwVqreePToc0K/21of1V6w/sG711rOGsw27TjPOJwbc0tQwrcRrmMQleWk7b8uyKImFx8nKwFLHBBgffSKpCTe3tNcwvdhrmKy4RaXTScrW6/apheZTeodwcfWfD3bDK28Tmk3usvfFiz8/W4HRQ6C9NDBqODelsSggAAE2QiqjKrUMPKqT3vTo2IuTFZcvPggtJrKXavlmweZpqVuz3dwZ4e+jT/0lQCu/x1/frhOKZjx54JVL1/E/U3qrjTyudObzHb7KInUBAYg6JqCoZa5hUnywYLEzLqDe2VSw2vLPiTyq17pTwC20Htj9/IXLw0mTuoZw969/edj0O9YbWT8Uzui772WLVrXqu97u0ACfllKvCuINlo+60qsslI6f4BOsr7ayn/vSc1+WIx4T9LXquyfd9YX9of28inDy1GvCrv12+f8FzX33XQbvGppMPm+7NuUDDui88JOS3musq0LtIa2aXpTKAwQ4RDU7QnYeqfodru+DpPSbUvhpOaGnbMsa+cTbV9peF85fEEpnPh4aTMgLodcvUqdbNpk1BH/EuFPDKZO7V28149k/dqwYtf/l82Y2uHbBwmNvXLTsuJsWLT+m+8Klh3eZP7/OpfMm73xO+aBQOv2R0HTSZeGQsQ1DeO5nse3/ARXEefHHJgH/AAAAAElFTkSuQmCC)";
                    // this.cells[i][j].dataset.value = false;
                    this.cells[i][j].innerText = "dataset.value = " + this.cells[i][j].dataset.value;
                    this.cells[i][j].innerText += "\u000D get from BE \u000D"+"cells["+this.cells[i][j].dataset.i+"]["+ this.cells[i][j].dataset.j+"]" +"\u000D";
                    this.cells[i][j].onclick = false;
                    // console.dir("точка контроля 8");
                    this.turnerState = true;
                      // this.searchOfWinner();
                    }

 }
            }



     //renderElement ;

        if (window.wrapper1) {wrapper1.innerHTML = '';}
        wrapper1 = document.createElement("div");
        wrapper1.className = "wrapper1";
        wrapper1.id = "wrapper1";
        document.body.appendChild(wrapper1);

        // Смотрим значения массива this.cells и в зависимости от них ренденрим элементы
        // Циклом по всем клеткам и добавишь элемент на страницу

        for (var j = 0; j < this.cells.length; j++) {
            //хранят элементы в двумерном массиве массивы
            for (var i = 0; i < this.cells[j].length; i++) {
                wrapper1.appendChild(this.cells[j][i]);
                // this.cells[i][j].innerText += "\n"+"element.value="+ this.cells[i][j].value;
                // this.cells[i][j].onclick  = function (e) { game.handleOfCellClick(e.target);       }
            }


        }

        //определяем из полученного от BackEnd  массива,чья очередь ходить
        // и выставляем значение очереди хода в  this.turnerState
        var numberOfNullInArrayFromBE = 0;
        var numberOfTrueInArrayFromBE = 0;
        var numberOfFalseInArrayFromBE = 0;

        for (var j = 0; j < this.cells.length; j++) {
            for (var i = 0; i < this.cells[j].length; i++) {

                if (this.cells[i][j].dataset.value === "null") {
                    numberOfNullInArrayFromBE++;
                }

                if (this.cells[i][j].dataset.value === "true") {

                    numberOfTrueInArrayFromBE++;

                }

                if (this.cells[i][j].dataset.value === "false") {
                    numberOfFalseInArrayFromBE++;

                }

            }
        }
 console.log("кол-во null в полученном от BE= " + numberOfNullInArrayFromBE);
 console.log("кол-во true в полученном от BE= " + numberOfTrueInArrayFromBE);
 console.log("кол-во false в полученном от BE= " + numberOfFalseInArrayFromBE);

        //если ни одна клетка не заполнена, то крестик первым  ходит, это обычное значение
        // для еще незаполненной сетки ходов
        if(numberOfNullInArrayFromBE==this.cells.length*this.cells[0].length){ this.turnerState = undefined; console.log("очередь хода крестиком");}
        if(numberOfTrueInArrayFromBE==numberOfFalseInArrayFromBE){ this.turnerState = true; console.log("очередь хода крестиком");}
        if(numberOfTrueInArrayFromBE<numberOfFalseInArrayFromBE){ this.turnerState = true; console.log("очередь хода крестиком");}
        if(numberOfTrueInArrayFromBE>numberOfFalseInArrayFromBE){ this.turnerState = false; console.log("очередь хода ноликом");}




        this.searchOfWinner();


    },





    createArrayForBackEnd: function() {

             var ArrayForBackEnd = [];
        for (var i = 0; i < this.cells.length; i++) {

            ArrayForBackEnd[i]=[];

            for (var j = 0; j < this.cells[i].length; j++) {

                // var booleanValue = Boolean(this.cells[i][j].dataset.value);
                // TODO чтоб null в false не преобразовывался и отдавались именно booolean значения
                ArrayForBackEnd[i][j] = this.cells[i][j].dataset.value;
            }
        }

        return ArrayForBackEnd;

    },





    // это функция, создающая элемент, из цикла её вызовем
    createElement: function (i, j) {
        // console.log  (i, j);
        var element = document.createElement("div");
        element.className = "cellClass1";
        element.style.outline = "1px solid #5965b1";
        element.style.float = "left";
        element.style.backgroundColor = "#f4c99c";
        element.style.backgroundImage = "url(data:image/png;base64,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)";
        element.style.backgroundPosition = "center center";
        element.style.backgroundRepeat = "no-repeat";
        element.style.opacity = ".3";
        element.style.minHeight = "100px";
        element.style.minWidth = "100px";
        element.style.fontSize = "12px";
        element.style.transition = "all .2s";

        if (j==0) { element.style.clear = "both"; }

        element.dataset.i = i;
        element.dataset.j = j;
        element.dataset.value = null;

        element.innerText = "cells["+i+"]["+j+"]" +"\u000D";
        element.innerText += "dataset.i="+i+"\n";
        element.innerText += "dataset.j="+j+"\n";

        element.innerText += "тут row "+j+"\n";
        element.innerText += "тут cell "+i+"\u000D";
        element.innerText +=  "dataset.value = " + element.dataset.value;


        return element;
    },
    // конец метода createElement



   renderElement: function () {
      if (window.wrapper1) {wrapper1.innerHTML = '';}
       wrapper1 = document.createElement("div");
       wrapper1.className = "wrapper1";
       wrapper1.id = "wrapper1";
       document.body.appendChild(wrapper1);
       // Смотрим значения массива this.cells и в зависимости от них реденрим элементы
        // Циклом по всем клеткам и добавишь элемент на страницу

       for (var j = 0; j < this.cells.length; j++) {
           //хранят элементы в двумерном массиве массивы
           for (var i = 0; i < this.cells[j].length; i++) {
               wrapper1.appendChild(this.cells[j][i]);
               // this.cells[i][j].innerText += "\n"+"element.value="+ this.cells[i][j].value;
               this.cells[i][j].onclick  = function (e) { game.handleOfCellClick(e.target); }
           }


} },
// конец метода renderElement


    turnerState: undefined,

    handleOfCellClick: function(elemInProcess){

        if (this.turnerState == true || this.turnerState == undefined) {

        elemInProcess.style.backgroundColor = "#f4c99c";
            elemInProcess.style.opacity = "1";
        elemInProcess.style.backgroundPosition = "center center";
        elemInProcess.style.backgroundRepeat = "no-repeat";
        elemInProcess.style.backgroundImage = "url(data:image/png;base64,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)";
        elemInProcess.dataset.value = true;
        // console.dir(this.cells);
        elemInProcess.innerText = "dataset.value = " + elemInProcess.dataset.value;
        elemInProcess.innerText += "\u000D кликнул на \u000D"+"cells["+elemInProcess.dataset.i+"]["+ elemInProcess.dataset.j+"]" +"\u000D";
        elemInProcess.onclick = false;
        this.turnerState = false;
            this.searchOfWinner();
            // console.dir (this.cells);
}

       else if (this.turnerState == false) {

            elemInProcess.style.backgroundColor = "#f4c99c";
            elemInProcess.style.opacity = "1";
            elemInProcess.style.backgroundPosition = "center center";
            elemInProcess.style.backgroundRepeat = "no-repeat";
            elemInProcess.style.backgroundImage = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABWCSURBVGhDxZsHmFXV1YY3CsGgJphoMBpbMBgsKGoUkYgiFpTpM9IUUUHsitgAFUusqIhgC8aa2GMXEJUO0pXODL2jQVBULAjr/959z7qcuYKioP88z3lmuHPn3v3u71vf2nufSwi/5NfxT/w+NBt4UGj+dqPQfFDjcPLABqHZm3VCvR7b/5LD+HneK3/sfqF4UrtQMP2BkFcxNDSfOzfkLfgkFCz+Ste6ULhkvb5/GwoWrQl581eEvDnT9bw3QsG0W0PhxIJwUv8//jwD25qvmj96/1A89fpQOGd8KFjybWi7znbsZHbwrWZlfc0u/6/Z7QPN+gw1e2CYWc9BZjf2M7vgWbPmD5rVvclsu0vMQpsvLRQs/DQUlPcPRZPah+av7bw1h7nlr1U07oRQXPFKKFy6NpxtdpAGfqXg+k8zW/qpbdbXN9+a/e8zs4mLzB4bZXb2E2b7XCv4M9dZKFzwUSiaem8oHFZnywe7Ja9QNLxBKKnoH0o/sR2kzDka5PBZ3+Vbu87sy2/MPv/K7NMvzVZ9Yfbx5xnA5ZqQpZ+YLV6VuZbp3yv0O64Zy8weHWl2Sm+zaucLvmjJmlA8rWfIe7XWlgz7x/9t4z47hDK9cfHy9dUvNLvsObO5/9sAum69ANeaffG12WdArjFbKUggPlqdgVwiyEUrzRZ8bDZvhdnsj8wqPjSbKchpS80mLzabuiTz+Cw9/uJEs/z7zaqcK/DihUtD8fh2P37gP+UvCoY2DKXzpoYzVHd9MoPzr6iiIFdLxU+ATFT8UJAot0QKOiQTlAs5RYCTZOmJC83GzzcbM89s1ByzEbPNxunf7+vxh1X7B99MnX8t8BnPBJL/Z/sqGtcxlCxdu/1FmTf2r1yrfoRVBelWXSgV50vFLOTyjJLTNVkOCQyQYwU5eq7ZSEEOrzAbUm727kyzgdPNBkzVv/UYP1Pj254n8JJ55aFo6KFbn7lkwm2hxRqre31GAb4+k5LRqgLMqphj1TlSEkuWC5KaxBFpyAkLNkBGNZUBQwU1WJDvzDB7S8HXX6BvTDZ79QOzl2RtrgF6/OY3zXbuLOiyxatDwYhTth50ycTeofU6O6ZHxprUqNdiVkXV43zqUYBzkrrLQsqqU1ST2BUlgcSiY6SkQw5zNQX5dqJmvylmr08yeyUBfWG82bNjzf4zxuyJ98z4d893zfbqKujSZd+G/FFFWw5dPKEHsE17KlmlJiFEmqYDJ6pI6CQqYlUCh+D5IA0puwL5npTEskAOlWUHJWoOTNR8U6CvAfq+2X8nmD0vsGdSoCR33+FmDw4x+9cIs3veSVrYacvWhsIRJ/506KIxl4RWX9nRd2aSlTZCouYGTtaqiYofSMWJUjFdk0ASPrQtt+y7rqZAUdNt+7JAX0yB/nt0RlEHfUgLl/sHm90nde9+O/P9Zi1gdrsaey9cHYoGH/jjoQtHNQ5ly622mj9AWBmLpmsxrSJ1nbVqEjyesFlIAiiB9Np8U7WJbanPLOi4jKKAPinQx6ToI1KUoHxAqgLYU6r20Krt9v5m/1At3zFAK7kXzHa8jLZVMTPkv7Lj5kMXDK4ZSmYvrKE07qfAoE6Bi2GDTVEwBejJ6lYF0GuS8HFILEvSuppu25cSRZ9LrFsJVJZ10N5ait4r0LsFCuCtUvWmN8yuf82s68tmN7xu1vIRs206Crrw/Sc2H7howmOhnVl3vQC9k6Bxi8awSSkY20cCGK2aqknCByXTkFk1lbTUJ8HznCuqMIqKamlJbf5Tij4o+/YRaC+peo/s2+Mts9sSVQG89hWzLi9pKftiZgF0tZa0R9wh4DM+08rsvfwfhs4feUxosdIaKpHpleNVi/RF1BsluDQgPRIFPXQARMW3pGJ/1SThQ12mLUtL8fp8VqBPC9IVfTwB7SvQbJ0KFvvelaNqd6naTaoC2FlWvlQbkAufNjv/P2btnzLb5Sp6dPl8bTxqfD908ZQxLBcZDAmbVS8Fh0XfAS6lIL3SrQpgtGtSl1lIKepq0lqyoKpRFCV5H2YnpUDCvr0E6qp6rd4oVa97VRaWqldJ1cufN7vkGe24BNpBoGc9nlmUNL03WYYWju+yaeCCUXmhzRor+WemTgcBloRMGo66Bo7ASSuYBaSdpJQEkv7paj4l2z4hNQmjNChtBvt6KKVVvVm1iqpY+BosLFU7ycIXC/a8f0vVJ83aPWbWRjXcQuPn+hP9uWzOilDwcs2NQxdPHVbjUs28Zh+7YksHez2xJsqRqPRIUhX1HO6FpJVEwKQugUTNp5LExbaVQKlTgdJmsqGU1OrtCqZblMAEk1v4Gln4CsFSrxfJwhFWip6ZwJ72sFnRA2aFuhqqnW7D8rNoQqfvAucPqR9arrAT78vAvgZUAkaKApUGI2xYEDgcCtJKHBC7oiQhlFWT9uLWTQLpfsFG+yatBlXvFKgHExa+Hgun6zWB7ShYtqRnPmrWWso6bHNtJ0+SpVksxVouK58Ryp7ftjJ08Qf3VNFs3KIERFUHel5KpRVLQ3kdol4WToBRxUTJRwXotiV1qVGSF1C3L63Ga9XbDetkUjjWq2Cvygknh22bwJYlyjrscXebNb7LbL/uquWzVlsgjLNfh51bLZTMmr2PNgYAxaafhEpaqahWohhQbk8syiqICzhUZKFACEXIJHXdug7qoURfpd1EC6u3Uq83qF4rwSqcPImzysrGKLsx2Eayc4PbMltJylTna/dtAG424vDQeqXlP5hpGVmARB0g/ALEYQByKMDScLQVAFkZUZ99khq9z+2rOmVZCCiqYmGv1wircPo+ZXNr1pVtImX/LtgjBVtfsPVuSmzdYtbMEMoSWxdNvILiZmn2pOyJ7Rhw+sKGAOReAKUv4BwQJalPh7w3qVPsS62mYVkeejiRxJVgqdlNpHGxRMrrY3ZyL7Mm92RgUfbQf5gdeKNZnevM/nCl9s5tl64Ppwypm1G5ZNqLO12RmWWAGCCtYaNX+ncJTHx+6nECyC/qk4UDkGlQgoneyvLQYQkobz1dqFvvs1pUsKDooNZDnz39X1pCqu2UCDZfsM0UtE0Fy/b1KMEeJth6CWwt7ZdrdtJp6AU6DMwf3TYDXDp7Wp0bNgyM2aeuNnb5wDf3O7bldVzRO1MWBtaBAaW/0ltZMZ2rRQQJzCKC7/FnwcZE7mtW+pBZwf064BPsCUrjYxVQDW83O/yWjI05qNjjaqkr4J0vN9s+biom9Qhh316/CS3mr2ogKwBxmwYRL80+FyrES4pQa36hEIPnwprfd8XnJX/rqgJKQLFiAhCwMxIYFg0EUYmg6KmAcYDHd/6NsnxPJ3IjrZ+PuNXsEMHur2Su3S0DvJvsDPRvdYXSaS+FcNxbh4XWi9eeoBoABlv5RU2RmPFSjWE9Lgbq6nzfxPgkARmfl/wdP6MoqyRUY4WEVduhoH6m1WDbVlISeNRkIUGtNtM46bEn6kJZDymv24Nk5b9K3X0FvHcXrbbUh3dVuf5O1zYtK0aGcOKwwiptP7Q8vSBghEU3hQbBQVLSGmj8DJD0pDcyIenJiJOQTER6MnxSXE3/He9BTWJbVkq0GX6mRrEu8ICfIWjaToRO+ixKY2OACSl6LeqSytQuCh+g8txPYVVbS8s9r5HKgmYBsm2b2ZNDaDaiQ9WzPo7AQLHNIizYhbCMY+vFACtNRM4k+AT4JLgTcr8DTJ1eIAuTun5haRb/ET4FjuKozfqYkHJolE5DE1YNE0uTzgQWNfwXHV64yrVk76qn64QzNBt+UY0OH9s+sgAzyYqmk5o8u5DOuli3xknQ43ESciagkgNyyoEJSE8CE3iJEpd1cPpiQcHjTACTATiKsyFA7UrQaXsngcWqinZ0VBJaqHxgovKfXWUpXe30ubNRuP2O566w3fUA8lMjPii2XQyGwTEJ7DsrOSCB9xJw60f7p6wPdEzgZAKv0ARmL70mr8vveJ8suBRH7VxoRCHMCLBTWTNrvMcn1j4aayu40ip7Le+uehawFG46JH+HDh9GhZkNLv6QICFUsBu7kgifKIP6rjyqu+0Bp+45cuGKNZ+0G57vDgHer6v1M+5hInkOr8378N6oTX2noeMmQdAsOCrV80ZUppZZeMC0h66qbWZPCqHhW4dsf9bib/4sv+N5Iv0AXYerFmjqvBlvzAU8A0H1qDjgSc17vXMKEQNPdc4FGEAsJJgQdwPP4eLf5AO/Bx5wFHe1eU+HpqYJMtI7vX5mlcXOiABDLNoTKmcTW1x7StBtW5aPCKFWj+23azvv49oqcpIN77MGpYHzh9QHFqJ9UFtRcUG77V3tGHQacFQ7gXAVo/IEndR2u2N5Lv7N4/ye5/H3TBBqM6m8jysdt4JyHi0rbe1sgCUq06IY/8FJT0blPQRc5bRpL8SFVtU2FZMBritlSThmh5hnx8Gs0et4UfohAUL7IFUBz6qtAbraMeCS+gYEKJKctud9nMTmZ/o7Ne7wvo7G/g59MdBJG2OB4ltC3//6WprlJeP1xEY4BIRrN+VTKJl0W2ZpWTbtmb0TdZkVZofEI+7pdTR6AoKgQO2WshRvyoxjN1RHiRhKUhplUQvlImjSo1lwpFdr/MziJO6UNAEO7ttCh8belNJ31tMahweYq4wjEcr7MgKyidil07cW8sa1ygDnT7xkd/Up9o7MClamFpgtaoPFOfVMUGAl+iKhRn1jc5RmULmwAADCSovlZVyjJ5sIX4v7Xti3iKi+qVMOr2e39ndOOZLEjpuIpEUh4EFi+k17fQSj8eB9M8BNhtXbqeNHVl/Kpu3MbLGicXWxNIGBuliLtsEgsDVBgyKuLLCssAABFEB2TuzA2DLGbWOyq4qH6/p99hAggU4fAMTTSb3PJndNcl/cNSUbiXR4HSDgX7UunyLSKskhQPdtqrWpmF5PwGk7099IQG58F0ld2kFaXd4cq2Fl6pa0pRc7LKoCAhCA92uvzN457qmHbjgg6KPH0yeV2Byl40F7kvS4Jx7c6f3Sxzue2Ky1EQaB0rb+m9xKPoVCdkrpr8L3b9lXv2ggK7DNqmTnVO3SFkhsVkJRXawsdalbBscgsTHKYlf2xQAByVEPJyR+asJ3P+diIvzUEkcATe3H00rlAe7hgCKtcjyW1XgQAkEQBoEQCluT1keqNHe5aJWFJkOPqAzc6J39d+q4bD13HLBDrp3pe9SMhxW1m6sug2OQDNZhUZWTE0A50OP4iLMwTjLTR7bp2yo4ghtlhBluwdr0aVc51rImnIlnS0mIxsOAlK29Jx8q8aq2mv5Bys4buKuUTh1QX7PirYh0Zs/J3jNtZ29LXruu7o3UrQbJYBk0ynJchJKPC5RDQA4FOe2Ml37mxBP47D1fPR+lqXlKArewWkNlyoZa9sN3wstbFBuL3AOBY5VBe3fVSccp+qjGRr9OGNlk10tX2/EC9fqlx3k659qZmmJlRO2irt+2ZLAMGmUjrIAA5cyaA3qOfrPHv2Mz8H5bFCf4LVFcklaZifX7SPHWirqE322gJ6frmHbaSMDbnT5rSaj35KY/2lildPKgI9THWJSzkcAm9DpPZ2bV7cxsU1ssFmglpDL1R90yaAaPssByUM9ZN3cMuVvxsq7sPSdNAJPB2Ta2p9ZxB2dhqMxEMqFMrN8l9GMgP+OiXSIMdYwzT1Zi1+4mdZuNu2jj6vqjTYYe+vvzlq9vxp4zWWx4/bKso/eSzoQHs82sU2PUGrXr6mJlBg8E59zAAsltGm62ZW+4vZ8B5y4G0NgbV8TDRE0cE0iZMKHZ8NJEe1r70ZDXMY4krY9Re6racvr0EB6u9v3A/Lb5hJ406yIpi02wi7ejWL+ezrIzYcKKChVQg9p1dRk8EA4LZL/Jul88JXPPON5S1b+5rfOSlOcOB24g2KLKSS0zkR5ebmsmHKd5HeNAX3Vxvl7r4pVK5hHH/TAsz/jTc7+u1rJ8RlPZAnUjsOIf+3g78vpl1mlFbmdUoXY5uEddIFAQKAC5f8yt1nd1xRvmAgca5bkJgBtcZSaOCXRb0+NjWstZBGa8FywBcB4dhIXRaQKvp71AOHVCr82D9WcdM6T+Th0Wf12iF+DF2KEATDvATr7Y8PolXFhkEFaog0qEEepypxFlgeUWLJ/c4RoyMwMO9BtSH8szQSQ3E8bihDwg9UnrdB3T/3GaBxdjRJQmyp1ty6aPC+H5X/04YJ59wnun79n5UztDoMxiXE4m/TcbWDn1S98lrFAJtQgprIyFuZHOZz9Gzsp8miB+CE3gKM4NvFc1MUwQExVtnbSoWMe0p6SOc4OLpGavXKjgqnHmvOXhqHf3+vGw/hcnj7lmv65f2TkC9c0CfZBVjwcW2z5WVqQqwIQObYYWhJ25aY66KMpHJvis1lhdo+dkoFGdCcH22Jq6p5WxGMExOAcHeXD5uZsn9bkaW0tB12y/6LPQaNCRPx02Cz2+e91uX9n5AuW4B+B0QrO6AtgDC2CvX26aY2dURF0gJ8zXB2UW6PMj8zJKMxFMCLbGEV7HANOe4g2CTQCzV24j5/2ug2CPHn7slsP6KzQd17n2FSvt/GQbmAucTuh0YMX6lV0B5sOiqMvHKfgo4kSBvydgbO3AOMKBKQ0HZovJSo7McIWvUktsoaXlb89esCwcPbjB1oP1V2o8srTWeUtWnanguk6tiMSkB6Pw5gCj8BgpjLqTBI3SAPOJgx8CTiscj5D0/qwVqreePToc0K/21of1V6w/sG711rOGsw27TjPOJwbc0tQwrcRrmMQleWk7b8uyKImFx8nKwFLHBBgffSKpCTe3tNcwvdhrmKy4RaXTScrW6/apheZTeodwcfWfD3bDK28Tmk3usvfFiz8/W4HRQ6C9NDBqODelsSggAAE2QiqjKrUMPKqT3vTo2IuTFZcvPggtJrKXavlmweZpqVuz3dwZ4e+jT/0lQCu/x1/frhOKZjx54JVL1/E/U3qrjTyudObzHb7KInUBAYg6JqCoZa5hUnywYLEzLqDe2VSw2vLPiTyq17pTwC20Htj9/IXLw0mTuoZw969/edj0O9YbWT8Uzui772WLVrXqu97u0ACfllKvCuINlo+60qsslI6f4BOsr7ayn/vSc1+WIx4T9LXquyfd9YX9of28inDy1GvCrv12+f8FzX33XQbvGppMPm+7NuUDDui88JOS3musq0LtIa2aXpTKAwQ4RDU7QnYeqfodru+DpPSbUvhpOaGnbMsa+cTbV9peF85fEEpnPh4aTMgLodcvUqdbNpk1BH/EuFPDKZO7V28149k/dqwYtf/l82Y2uHbBwmNvXLTsuJsWLT+m+8Klh3eZP7/OpfMm73xO+aBQOv2R0HTSZeGQsQ1DeO5nse3/ARXEefHHJgH/AAAAAElFTkSuQmCC)";
            elemInProcess.dataset.value = false;
            elemInProcess.innerText = "dataset.value = " + elemInProcess.dataset.value;
            elemInProcess.innerText += "\u000D кликнул на \u000D"+"cells["+elemInProcess.dataset.i+"]["+ elemInProcess.dataset.j+"]" +"\u000D";
            elemInProcess.onclick = false;

            this.turnerState = true;
             this.searchOfWinner();
            // console.dir (this.cells);


        }


},
// конец метода  handleOfCellClick


searchOfWinner: function () {
    // важно: в свойстве this.cells[i][j].dataset.value стринговое значение, а не булеан

    var x = this.cells;


    //тут 5 циклов (для любого размера массива) с 4 проверками на совпадение выставленных значений:
    //a)проход по горизонтали
    //b)проход по диагонали справа налево
    //c)проход по диагонали слева направо
    //d)проход по вертикали
    //e) НАЛИЧИЕ заполнения всех клеток БЕЗ СОВПАДЕНИЙ (проходим ПО ГОРИЗОНТАЛИ)

    //a)ПРОВЕРЯЕМ НАЛИЧИЕ СОВПАДЕНИЙ В РЯДАХ ПО ГОРИЗОНТАЛИ
    // переменная controltrue  суммирует в себе совпадения true в 1 ряду, в конце ряда(т.е. (j==x[i].length-1)) сбрасывается до 0
    var controltrue = 0;
    var controlfalse = 0;
//проходим 2 dimensional array на экран  for (var i = 0; i < x.length; i++) {
    for (var ii = 0; ii < x.length; ii++) {
        // от 0 до 9 идут i
// alert ("сейчас i = " + i);

        for (var jjj = 0; jjj < x[ii].length; jjj++) {
            // от 0 до 9 идут j при i = 0, потом от 0 до 9 идут j при i = 1 и т.д.
            //alert ("сейчас i = " + i+"сейчас j = " + j);
            if (x[ii][jjj].dataset.value == "true") controltrue++;
            if (x[ii][jjj].dataset.value == "false") controlfalse++;
            // console.log("controltrue=" + controltrue);
            // console.log("controlfalse=" + controlfalse);

            //return нужен, чтоб при найденном совпадении не искала иные совпадения в циклах ниже: например, ОДНИМ ЗАПОЛНЕНИЕМ КЛЕТКИ иногда может свпасть и диагональ, и серединная вертикальная линия: чтоб срабатывало только первое совпадение
            if (controltrue == x[ii].length) {this.showWinnerLine(x[ii]); return;}
            if (controlfalse == x[ii].length) {this.showWinnerLine(x[ii]); return;}

            if (jjj == x[ii].length - 1) {
                controltrue = 0;
                controlfalse = 0;
                // console.log("сброс на 0 счетчиков этого row");
            }


        }
    }
//
//         // b)ПЕРЕБИРАЕТ ЗНАЧЕНИЯ ДИАГОНАЛЬНЫХ ЭЛЕМЕНТОВ "сверху-справа <- вниз налево" в массиве:
          var controltrueDiag = 0;
          var controlfalseDiag = 0;
        var controlArray = [];

        for (var i2 = 0, j2 = x[i2].length - 1; i2 < x.length; i2++, j2--) {
            if (x[i2][j2].dataset.value == "true") controltrueDiag++;
            if (x[i2][j2].dataset.value == "false") controlfalseDiag++;
            // накапливаем проверенные элементы по диагонали x[i][j]) в массив, чтоб отобразить в случае его победы
            controlArray.push(
                x[i2][j2]
            );

            // document.write("<br>");
            //   console.log("controltrueD=" + controltrueDiag);
            //   console.log("controlfalseD=" + controlfalseDiag);
            if (controltrueDiag == x[i2].length) {this.showWinnerLine(controlArray);return;}
            if (controlfalseDiag == x[i2].length) {this.showWinnerLine(controlArray);return;}

            // если дошли до конца строки проверяемой, то скидываем значение счетчика-накопителя совпадений, т.к. он считает только 1 строку
            if (i2 == x[i2].length - 1) {
                controltrueDiag = 0;
                controlfalseDiag = 0;
                controlArray = [];
            }


        }



        // c)ПЕРЕБИРАЕТ ЗНАЧЕНИЯ ДИАГОНАЛЬНЫХ ЭЛЕМЕНТОВ "сверху-слева -> вниз направо" в массиве:

        var  controlArrayLeft = [];

        for (var i3 = 0, j3 = 0; i3 < x.length; i3++, j3++) //почему length-1. length-это число, которое на единицу превышает наибольший номер элемента, определенный в массиве, т.е с верхней ступеньки вниз едем, а верхняя ступенька тут  length-1
        {
            if (x[i3][j3].dataset.value == "true") controltrueDiag++;
            if (x[i3][j3].dataset.value == "false") controlfalseDiag++;
            // document.writeln("проверенный элемент по диагонали = "+x[i][j]);

            controlArrayLeft.push(
                x[i3][j3]
            );

            // document.write("<br>");
            //   console.log("controltrueDD=" + controltrueDiag);
            //   console.log("controlfalseDD=" + controlfalseDiag);
            if (controltrueDiag == x[i3].length) {this.showWinnerLine(controlArrayLeft);return;}
            if (controlfalseDiag == x[i3].length) {this.showWinnerLine(controlArrayLeft);return;}

            if (i3 == x[i3].length - 1) {
                controltrueDiag = 0;
                controlfalseDiag = 0;
                controlArrayLeft = [];
            }


        }


        /// d)вертикальные совпадения ищем в двумерном массиве

        var controltrueV = 0;
        var controlfalseV = 0;
       var controlArrayVertical = [];

//3 цикла вложенных делаем: верхний while даёт номер столбца по вертикали в рамках количества столбцов (берем длину первого массива x[0].length, т.к.все вложенные массивы одинаковой длины)

//берем количество вертикальных столбцов
        var vertLine = x[0].length; //например, 4
        var columnNumber = 0;
        while (columnNumber < vertLine) {

            // console.log("оборот while=" + columnNumber);
            for (var i4 = 0; i4 < x.length; i4++) {
                // от 0 до 9 идут i
// alert ("сейчас i = " + i);
                // НОМЕР ВЕРТИКАЛЬНОЙ СТРОКИ взяли из while
                for (var j4 = columnNumber; j4 < columnNumber + 1; j4++) {
                    // от 0 до 9 идут j при i = 0, потом от 0 до 9 идут j при i = 1 и т.д.
                    //alert ("сейчас i = " + i+"сейчас j = " + j);

                    // document.writeln("проверенный элемент по диагонали = "+x[i][j]);

                    controlArrayVertical.push(
                        x[i4][j4]
                    );



                    if (x[i4][j4].dataset.value == "true") controltrueV++;
                    if (x[i4][j4].dataset.value == "false") controlfalseV++;
                    // console.log("controltrueV=" + controltrueV);
                    // console.log("controlfalseV=" + controlfalseV);

                    if (controltrueV == x.length) {this.showWinnerLine(controlArrayVertical);return;}
                    if (controlfalseV == x.length) {this.showWinnerLine(controlArrayVertical);return;}

                    if (i4 == x.length - 1) {
                        controltrueV = 0;
                        controlfalseV = 0;
                        controlArrayVertical = [];
                    }


                    // document.write("  "+"  "+"x[" + i + "][" + j + "] = " + x[i][j])+"  ";  }

                    // document.write("<br>");
                    // document.write("%%%%%%%%%%%");
                    // document.write("<br>");

                }



            }
            columnNumber++;
        }
        // console.log("controltrueV = " + controltrueV);
        // console.log("controlfalseV =  " + controlfalseV);




    //e)ПРОВЕРЯЕМ НАЛИЧИЕ заполнения всех клеток БЕЗ СОВПАДЕНИЙ (проходим ПО ГОРИЗОНТАЛИ)
    // переменная controltrue  суммирует в себе совпадения true в 1 ряду, в конце ряда(т.е. (j==x[i].length-1)) сбрасывается до 0
    var controlEmpty = 0;

//проходим 2 dimensional array на экран  for (var i = 0; i < x.length; i++) {
    for (var i7 = 0; i7 < x.length; i7++) {
        // от 0 до 9 идут i
// alert ("сейчас i = " + i);

        for (var j7 = 0; j7 < x[i7].length; j7++) {
            // от 0 до 9 идут j при i = 0, потом от 0 до 9 идут j при i = 1 и т.д.
            //alert ("сейчас i = " + i+"сейчас j = " + j);
            if (x[i7][j7].dataset.value == "true") controlEmpty++;
            if (x[i7][j7].dataset.value == "false") controlEmpty++;
            // console.log("controltrue=" + controltrue);
            // console.log("controlfalse=" + controlfalse);
            if (controlEmpty == x.length*x[0].length) {
                // console.log("invoke this.stopGame()");
            this.stopGame(); return;}



        }
    }






},
// конец метода  searchOfWinner



    showWinnerLine: function (winnerArrayOfObjects) {

        for (var win = 0; win < winnerArrayOfObjects.length; win++) {
            winnerArrayOfObjects[win].style.transition = "all 1.7s";
            winnerArrayOfObjects[win].style.backgroundColor = "#ff8856";
            winnerArrayOfObjects[win].style.opacity = "0.9";
            winnerArrayOfObjects[win].style.backgroundSize = "84%";

        }


         this.stopGame();


    },






 stopGame: function () {

     for (var j = 0; j < this.cells.length; j++) {
         //хранят элементы в двумерном массиве массивы
         for (var i = 0; i < this.cells[0].length; i++) {

             // this.cells[i][j].innerText += "\n"+"element.value="+ this.cells[i][j].value;
             this.cells[i][j].onclick  = false; }
         }



    //
    //
    // document.getElementById("titleBlock").innerText += ". Game is over."
    // if ниже нужен для того, чтоб не создавать дважды или трижды кнопку при вызове её одновременным выполннием условий
     // (например, одним последним нажатием клетки совпали 2 диагонали и заполнились все клетки)


     var button = document.createElement("div");
    button.style.float = "left";
    button.style.clear = "both";
    button.id = "startBlock";
     button.style.outline = "1px solid #5965b1";

     button.style.backgroundColor = "#f4c99c";
    button.style.marginTop = "20px";

    button.innerText = " Click here to start  the Game again";
    button.style.minHeight = "30px";
    button.style.lineHeight = "30px";
    button.style.minWidth = "300px";
    button.style.textAlign = "center";

    document.getElementById("wrapper1").appendChild(button);
    button.addEventListener("click", myFunction);



     function myFunction (){


         for (var j = 0; j < game.cells.length; j++) {
             //хранят элементы в двумерном массиве массивы
             for (var i = 0; i < game.cells[0].length; i++) {
                 // this.cells[i][j].innerText += "\n"+"element.value="+ this.cells[i][j].value;
                 game.cells[i][j]  = null; }
         }


         var deleted = document.getElementById("wrapper1");
         deleted.innerHTML = '';
         deleted.parentNode.removeChild(deleted);



         var deleted1 = document.getElementsByClassName("wrapper1")[1];
         if(deleted1) {deleted1.innerHTML = '';
         deleted1.parentNode.removeChild(deleted1);}

         game.init();
         game.renderElement();
         // if (window.cellsArray) {
         //     cellsArray = null;
         // }
         // if (window.stageOfCrossOrCircle) {
         //     stageOfCrossOrCircle = undefined;
         // }
     }
},










}


// game.startGame();
game.init(3,3);
game.renderElement(game.cells);





//создадим массив, который мыякобыполучили с сервера
var testArray = new Array(3);
for (var i = 0; i < testArray.length; i++) {
    testArray[i] = new Array(3);  }
//заполняем 2 dimensional array   значениями
for (var i = 0; i < testArray.length; i++) {
    for (var j = 0; j < testArray[i].length; j++) {
        if ((j+i)>2) {testArray[i][j]=true; continue;}
        testArray[i][j]=false;
                 }
}
testArray[0][0]=null;
testArray[0][2]=null;
testArray[1][1]=null;


// console.dir(game.createArrayForBackEnd());
//пример вызова готовым пакетом значений  From BackEnd
//console.dir(testArray);
//game.handleArrayFromBackEnd(testArray);


// console.dir("createArrayForBackEnd()");
// console.dir(game.createArrayForBackEnd());
// console.dir(typeof game.createArrayForBackEnd()[0][0]); //string