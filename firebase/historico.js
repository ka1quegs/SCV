const tabsLine = document.querySelector('.tabs-btn .line span')
const tabsBtnLi = document.querySelectorAll('.tabs-btn li')
const tabsContent = document.querySelector('.tabs-content')
const contentLi = document.querySelectorAll('.tabs-content li')
const root = document.querySelector(':root')

// set the line before click any tab btn
// due to this line width become equal to first tab btn
tabsLine.style.width = tabsBtnLi[0].getBoundingClientRect().width + 'px'
// now change position of line
tabsLine.style.left = tabsBtnLi[0].getBoundingClientRect().x + 'px'

// create onclick func for each btn
for(var i = 0; i < tabsBtnLi.length; i++){
    tabsBtnLi[i].onclick = (e) => {
        // first set the animation of line
        bottomLineAnimation(e.target)
        // now for content animation
        if(e.target.getBoundingClientRect().x < tabsLine.getBoundingClientRect().x){
            // for going left
            root.style.setProperty('--translate', '-15px')
            root.style.setProperty('--transDur', '.1s')
            // hide all content block
            hideAll()
            setTimeout(() => {
                root.style.setProperty('--translate', '35px');
                root.style.setProperty('--transDur', '.4s');
            }, 100);
            // 100 is due to .1 duration
            // get foe attr value
            var forAttr = e.target.getAttribute('for')
            setTimeout(() => {
                document.querySelector('.' + forAttr).classList.add('active')
            }, 300);
            // add 200 to prev 100 value
        }else{
            // for going right
            // same copy above
            root.style.setProperty('--translate', '15px');
            root.style.setProperty('--transDur', '.1s');
            hideAll()
            setTimeout(() => { 
                root.style.setProperty('--translate', '-35px');
                root.style.setProperty('--transDur', '.4s');
            }, 100);
            var forAttr = e.target.getAttribute('for')
            setTimeout(() => { 
                document.querySelector('.'+forAttr).classList.add('active') 
            }, 300);
        }
    }
}

function bottomLineAnimation(e){
    // we will use properties of clicked btn and line
    var lineRect = tabsLine.getBoundingClientRect()
    var targetRect = e.getBoundingClientRect()
    // get line tran duration in js
    var cssTransDuration = window.getComputedStyle(tabsLine).transitionDuration.replace(/\D+$/g, '')
    // this give only number after replace
    if(targetRect.x > lineRect.x){
        // if right btn is clicked from previous btn
        tabsLine.style.width = ((targetRect.x + targetRect.width) - (lineRect.x + lineRect.width) + lineRect.width) + 'px'
        setTimeout(() => {
            tabsLine.style.width = targetRect.width + 'px'
            tabsLine.style.left = targetRect.x + 'px'
        }, cssTransDuration*1000);
        // .2*1000 = 200
    }else{
        // if left btn is clicked
        tabsLine.style.width = (lineRect.x - targetRect.x) + lineRect.width + 'px'
        tabsLine.style.left = targetRect.x + 'px'
        setTimeout(() => {
            tabsLine.style.width = targetRect.width + 'px'
        }, cssTransDuration*1000);
    }
}

// hide all function
function hideAll(){
    for(var i = 0; i < contentLi.length; i++){
        contentLi[i].classList.remove('active')
    }
}

//Gráfico

var tabela = document.getElementsByTagName('table')[0];
var linhas = tabela.getElementsByTagName('tr');
var data = [];
var visitas = [];

// percorre as linhas da tabela, a partir da segunda linha
for (var i = 1; i < linhas.length; i++) {
    var celulas = linhas[i].getElementsByTagName('td');
    var mes = celulas[1].textContent.split('/')[1]; // extrai o mês da data de visita

    // verifica se o mês já foi adicionado ao array 'data'
    if (data.includes(mes)) {
        // se já tiver sido adicionado, incrementa o número de visitas correspondente
        visitas[data.indexOf(mes)]++;
    } else {
        // se ainda não tiver sido adicionado, adiciona o mês ao array 'data' e inicia o número de visitas correspondente como 1
        data.push(mes);
        visitas.push(1);
    }
}

// cria o gráfico de barras
var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: data,
        datasets: [{
            label: 'Visitas Mensais',
            data: visitas,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                    callback: function(value, index, values) {
                        return index + 1;
                    }
                }
            }]
        }
    }
});
