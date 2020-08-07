class Board
{
    constructor(color, divSize)
    {
        this.size = 4;
        this.color = color;
        this.divSize = divSize;
    }
    createBoard()
    {
        var toAdd = document.getElementById('grid');
        var newDiv;
        var offsetHorizontal = 10;
        var offsetVertical = 10;
        for(var i=0; i<this.size; i++)
        {
            offsetHorizontal = 10;
            for(var j=0; j<this.size; j++)
            {
                newDiv = document.createElement('div');
                newDiv.className = "cell";
                newDiv.style.top = offsetVertical.toString() + "px";
                newDiv.style.left = offsetHorizontal.toString() + "px";
                newDiv.style.backgroundColor = this.color;
                toAdd.appendChild(newDiv);

                offsetHorizontal += 10 + this.divSize;
            }
            offsetVertical += 10 + this.divSize;
        }
    }
}

class NeuralNet
{
    constructor(neuronsNumbers)
    {
        this.neuronsNumbers = neuronsNumbers;
        this.net = new Array(this.neuronsNumbers.length - 1);
        for(var i=0; i<this.neuronsNumbers.length - 1; i++)
            this.net[i] = new Array(this.neuronsNumbers[i]);
    }
    createNet()
    {
        for(var i=0; i<this.neuronsNumbers.length - 1; i++)
        {
            if(i == 0)
            {
                var arr = [];
                for(var j=0; j<this.neuronsNumbers[i + 1]; ++j)
                {
                    var vector = [];
                    for(var k=0;k<this.neuronsNumbers[i]; k++)
                        vector[k] = 2*(Math.random()-0.5);
                    arr[j] = vector;
                }
                this.net[i] = arr;
                continue;
            }
            var arr = [];
            for(var j=0; j<this.neuronsNumbers[i + 1]; ++j)
            {
                var vector = [];
                for(var k=0;k<this.neuronsNumbers[i] + 1; k++)
                    vector[k] = 2*(Math.random()-0.5);
                arr[j] = vector;
            }
            this.net[i] = arr;
        }
        return this.net;
    }
    multiply(A, B)
    {
        var vector = new Array();
        for(var k=0; k<B.length; k++)
        {
            var sum = 0;
            for(var l=0; l<A.length; l++)
                sum += A[l]*B[k][l];
            vector[k] = sum;
        }
        return vector;
    }
}

class Game
{
    constructor()
    {
        this.squares = Array.from(document.querySelectorAll('.grid div'));
        this.positions = [];
        for(var i=0; i<16; i++)
            this.positions[i] = 1;
        this.colorsTable = [];
        this.colorsTable[0] = '#CDC0B4';
        this.colorsTable[1] = '#EEE4DA';
        this.colorsTable[2] = '#EDE0C8';
        this.colorsTable[3] = '#F2B179';
        this.colorsTable[4] = '#F59563';
        this.colorsTable[5] = '#F67C60';
        this.colorsTable[6] = '#F65E3B';
        this.colorsTable[7] = '#EDCF73';
        this.colorsTable[8] = '#EDCC62';
        this.colorsTable[9] = '#EDC850';
        this.colorsTable[10] = '#EDC53F';
        this.colorsTable[11] = '#EDC22D';

        this.score = 0;
    }
    moveLeft()
    {
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                for(var k=j-1; k>=0; k--)
                {

                    if(this.positions[i*4+j] == this.positions[i*4+k] && this.positions[i*4+j] > 1)
                    {
                        var flag = false;
                        if(k < j - 1)
                        {
                            for(var t=j - 1; t>k; t--)
                                if(this.positions[i*4 + t] > 1)
                                {
                                    flag = true;
                                    break;
                                }
                        }
                        if(flag)
                            continue;
                        this.positions[i*4+k] *= 2;
                        this.positions[i*4+j] = 1;
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                if(this.positions[i*4 + j] == 1)
                {
                    for(var k=j; k < 3; k++)
                    {
                        var tmp = this.positions[i*4 + k];
                        this.positions[i*4 + k] = this.positions[i*4 + k + 1];
                        this.positions[i*4 + k + 1] = tmp;
                    }
                }
            }
        }
    }
    moveRight()
    {
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                for(var k=j+1; k<4; k++)
                {
                    if(this.positions[i*4+j] == this.positions[i*4+k] && this.positions[i*4+j] > 1)
                    {
                        var flag = false;
                        if(k > j + 1)
                        {
                            for(var t=j+1; t<k; t++)
                                if(this.positions[i*4 + t] > 1)
                                {
                                    flag = true;
                                    break;
                                }
                        }
                        if(flag)
                            continue;
                        this.positions[i*4+k] *= 2;
                        this.positions[i*4+j] = 1;
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                if(this.positions[i*4 + j] == 1)
                {
                    for(var k=j; k > 0; k--)
                    {
                        var tmp = this.positions[i*4 + k];
                        this.positions[i*4 + k] = this.positions[i*4 + k - 1];
                        this.positions[i*4 + k - 1] = tmp;
                    }
                }
            }
        }
    }
    moveUp()
    {
        var ifMoved = false;
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                for(var k=j-1; k>=0; k--)
                {
                    if(this.positions[j*4+i] == this.positions[k*4+i] && this.positions[j*4+i] > 1)
                    {
                        var flag = false;
                        for(var t=j-1; t>k; t--)
                        {
                            if(this.positions[4*t+i] > 1)
                            {
                                flag = true;
                                break;
                            }
                        }
                        if(flag)
                            continue;
                        this.positions[k*4+i] *= 2;
                        this.positions[j*4+i] = 1;
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                if(this.positions[j*4 + i] == 1)
                {
                    for(var k=j; k < 3; k++)
                    {
                        var tmp = this.positions[k*4 + i];
                        this.positions[k*4 + i] = this.positions[(k+1)*4 + i];
                        this.positions[(k+1)*4 + i] = tmp;
                    }
                }
            }
        }
    }
    moveDown()
    {
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                for(var k=j+1; k<4; k++)
                {
                    if(this.positions[j*4+i] == this.positions[k*4+i] && this.positions[j*4+i] > 1)
                    {
                        var flag = false;
                        
                        for(var t=j+1; t<k; t++)
                        {
                            if(this.positions[4*t + i] > 1)
                            {
                                flag = true;
                                break;
                            }
                        }
                        if(flag)
                            continue;
                        this.positions[k*4+i] *= 2;
                        this.positions[j*4+i] = 1;
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                if(this.positions[j*4 + i] == 1)
                {
                    for(var k=j; k > 0 ; k--)
                    {
                        var tmp = this.positions[k*4 + i];
                        this.positions[k*4 + i] = this.positions[(k-1)*4 + i];
                        this.positions[(k-1)*4 + i] = tmp;
                    }
                }
            }
        }
    }
    createNewCell()
    {
        var count = 0;
        for(var i=0; i<16; i++)
            if(this.positions[i] != 1)
                count++;
        if(count == 0)
        {
            var n1 = Math.floor(Math.random()*16);
            var n2 = Math.floor(Math.random()*16);
            
            while(n1 == n2)
                n2 = Math.floor(Math.random()*16);

            this.positions[n1] = 2;
            this.positions[n2] = 2;

            // this.positions[0] = 1;
            // this.positions[1] = 1;
            // this.positions[2] = 2;
            // this.positions[3] = 2;

            return;
        }
        var n = Math.floor(Math.random()*16);

        var prevN = n;
        while(this.positions[n] != 1)
        {
            n = (n+1)%16;
            if(n == prevN)
                return;
        }
        this.positions[n] = 2;
    }
    updateBoard()
    {
        for(var i=0; i<16; i++)
        {
            this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:15px;" + ">" + "</p>";
            this.squares[i].style.backgroundColor = this.colorsTable[Math.log2(this.positions[i])];
            this.squares[i].style.fontSize="50px";
            this.squares[i].style.fontFamily="Sans-serif";
            this.squares[i];

            if(this.positions[i] < 2)
                continue;

            if(this.positions[i] < 16 && this.positions[i] >= 2)
            {
                if(this.positions[i] == 8)
                    this.squares[i].style.color = "#ffffff";
                else
                    this.squares[i].style.color = "#756C64";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:25px;" + ">" + this.positions[i].toString() + "</p>";
            }
            else if(this.positions[i] < 128 && this.positions[i] >= 8)
            {
                this.squares[i].style.color = "#ffffff";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:12px;" + ">" + this.positions[i].toString() + "</p>";
            }
            else if(this.positions[i] < 1024 && this.positions[i] >= 128)
            {
                this.squares[i].style.color = "#ffffff";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:5px;" + ">" + this.positions[i].toString() + "</p>";
            }
            // else
            // {
            //     this.squares[i].style.color = "#ffffff";
            //     this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:0px;" + ">" + this.positions[i].toString() + "</p>";
            // }
        }
            
    }
}

class GameGenetic
{
    constructor(nn, populationSize)
    {
        this.squares = Array.from(document.querySelectorAll('.grid div'));
        this.positions = [];
        for(var i=0; i<16; i++)
            this.positions[i] = 1;
        this.colorsTable = [];
        this.colorsTable[0] = '#CDC0B4';
        this.colorsTable[1] = '#EEE4DA';
        this.colorsTable[2] = '#EDE0C8';
        this.colorsTable[3] = '#F2B179';
        this.colorsTable[4] = '#F59563';
        this.colorsTable[5] = '#F67C60';
        this.colorsTable[6] = '#F65E3B';
        this.colorsTable[7] = '#EDCF73';
        this.colorsTable[8] = '#EDCC62';
        this.colorsTable[9] = '#EDC850';
        this.colorsTable[10] = '#EDC53F';
        this.colorsTable[11] = '#EDC22D';

        this.nn = nn;
        this.populations = [];

        for(var i=0; i<populationSize; i++)
            this.populations[i] = nn.createNet();

        this.top25Populations = [];
        this.top25Scores = [];
        this.maxScore = -1000;

        this.score = 0;
    }
    moveLeft()
    {
        var score = 0;
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                for(var k=j-1; k>=0; k--)
                {

                    if(this.positions[i*4+j] == this.positions[i*4+k] && this.positions[i*4+j] > 1)
                    {
                        var flag = false;
                        if(k < j - 1)
                        {
                            for(var t=j - 1; t>k; t--)
                                if(this.positions[i*4 + t] > 1)
                                {
                                    flag = true;
                                    break;
                                }
                        }
                        if(flag)
                            continue;
                        this.positions[i*4+k] *= 2;
                        this.positions[i*4+j] = 1;
                        score += this.positions[i*4+k];
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                if(this.positions[i*4 + j] == 1)
                {
                    for(var k=j; k < 3; k++)
                    {
                        var tmp = this.positions[i*4 + k];
                        this.positions[i*4 + k] = this.positions[i*4 + k + 1];
                        this.positions[i*4 + k + 1] = tmp;
                    }
                }
            }
        }
        return score;
    }
    moveRight()
    {
        var score = 0;
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                for(var k=j+1; k<4; k++)
                {
                    if(this.positions[i*4+j] == this.positions[i*4+k] && this.positions[i*4+j] > 1)
                    {
                        var flag = false;
                        if(k > j + 1)
                        {
                            for(var t=j+1; t<k; t++)
                                if(this.positions[i*4 + t] > 1)
                                {
                                    flag = true;
                                    break;
                                }
                        }
                        if(flag)
                            continue;
                        this.positions[i*4+k] *= 2;
                        this.positions[i*4+j] = 1;
                        score += this.positions[i*4+k];
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                if(this.positions[i*4 + j] == 1)
                {
                    for(var k=j; k > 0; k--)
                    {
                        var tmp = this.positions[i*4 + k];
                        this.positions[i*4 + k] = this.positions[i*4 + k - 1];
                        this.positions[i*4 + k - 1] = tmp;
                    }
                }
            }
        }
        return score;
    }
    moveUp()
    {
        var score = 0;
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                for(var k=j-1; k>=0; k--)
                {
                    if(this.positions[j*4+i] == this.positions[k*4+i] && this.positions[j*4+i] > 1)
                    {
                        var flag = false;
                        for(var t=j-1; t>k; t--)
                        {
                            if(this.positions[4*t+i] > 1)
                            {
                                flag = true;
                                break;
                            }
                        }
                        if(flag)
                            continue;
                        this.positions[k*4+i] *= 2;
                        this.positions[j*4+i] = 1;
                        score += this.positions[i*4+k];
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                if(this.positions[j*4 + i] == 1)
                {
                    for(var k=j; k < 3; k++)
                    {
                        var tmp = this.positions[k*4 + i];
                        this.positions[k*4 + i] = this.positions[(k+1)*4 + i];
                        this.positions[(k+1)*4 + i] = tmp;
                    }
                }
            }
        }
        return score;
    }
    moveDown()
    {
        var score = 0;
        for(var i=0; i<4; i++)
        {
            for(var j=2; j>=0; j--)
            {
                for(var k=j+1; k<4; k++)
                {
                    if(this.positions[j*4+i] == this.positions[k*4+i] && this.positions[j*4+i] > 1)
                    {
                        var flag = false;
                        
                        for(var t=j+1; t<k; t++)
                        {
                            if(this.positions[4*t + i] > 1)
                            {
                                flag = true;
                                break;
                            }
                        }
                        if(flag)
                            continue;
                        this.positions[k*4+i] *= 2;
                        this.positions[j*4+i] = 1;
                        score += this.positions[i*4+k];
                    }
                }
            }
        }
        for(var i=0; i<4; i++)
        {
            for(var j=1; j<4; j++)
            {
                if(this.positions[j*4 + i] == 1)
                {
                    for(var k=j; k > 0 ; k--)
                    {
                        var tmp = this.positions[k*4 + i];
                        this.positions[k*4 + i] = this.positions[(k-1)*4 + i];
                        this.positions[(k-1)*4 + i] = tmp;
                    }
                }
            }
        }
        return score;
    }
    createNewCell()
    {
        var count = 0;
        for(var i=0; i<16; i++)
            if(this.positions[i] != 1)
                count++;
        if(count == 0)
        {
            var n1 = Math.floor(Math.random()*16);
            var n2 = Math.floor(Math.random()*16);
            
            while(n1 == n2)
                n2 = Math.floor(Math.random()*16);

            this.positions[n1] = 2;
            this.positions[n2] = 2;

            return;
        }
        var n = Math.floor(Math.random()*16);

        var prevN = n;
        while(this.positions[n] != 1)
        {
            n = (n+1)%16;
            if(n == prevN)
                return false;
        }
        this.positions[n] = 2;
    }
    checkIfGameOver()
    {
        for(var i=0; i<16; i++)
            if(this.positions[i] == 1)
                return false;
        return true;
    }
    updateBoard()
    {
        for(var i=0; i<16; i++)
        {
            this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:15px;" + ">" + "</p>";
            this.squares[i].style.backgroundColor = this.colorsTable[Math.log2(this.positions[i])];
            this.squares[i].style.fontSize="50px";
            this.squares[i].style.fontFamily="Sans-serif";
            this.squares[i];

            if(this.positions[i] < 2)
                continue;

            if(this.positions[i] < 16 && this.positions[i] >= 2)
            {
                if(this.positions[i] == 8)
                    this.squares[i].style.color = "#ffffff";
                else
                    this.squares[i].style.color = "#756C64";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:25px;" + ">" + this.positions[i].toString() + "</p>";
            }
            else if(this.positions[i] < 128 && this.positions[i] >= 8)
            {
                this.squares[i].style.color = "#ffffff";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:12px;" + ">" + this.positions[i].toString() + "</p>";
            }
            else if(this.positions[i] < 1024 && this.positions[i] >= 128)
            {
                this.squares[i].style.color = "#ffffff";
                this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:5px;" + ">" + this.positions[i].toString() + "</p>";
            }
            // else
            // {
            //     this.squares[i].style.color = "#ffffff";
            //     this.squares[i].innerHTML = "<p style=" + "position:absolute;top:-40px;left:0px;" + ">" + this.positions[i].toString() + "</p>";
            // }
        }
    }
    getMove(population)
    {
        var result = [];
        var input = [];
        for(var i=0; i<16; i++)
            input[i] = Math.log2(this.positions[i]);
        //console.log(input)
        for(var i=0; i<this.nn.neuronsNumbers.length - 1; i++)
        {
            if(i == 0)
            {
                result = nn.multiply(input, population[i]);
                var newResult = []
                for(var j=0; j < result.length; j++)
                    newResult[j] = result[j] ? (result[j] > 0) : 0;
                    //newResult[j] = 1/(1 + Math.exp(result[j]));
                    //newResult[j] = Math.tanh(result[j])
                result = newResult
                result[result.length] = 1;
                continue;
            }
            if(i == this.nn.neuronsNumbers.length - 2)
            {
                result = nn.multiply(result, population[i]); 
                // console.log(result)
                continue;
            }
            
            result = nn.multiply(result, population[i]);  
            var newResult = []
            for(var j=0; j < result.length; j++)
                newResult[j] = result[j] ? (result[j] > 0) : 0;
                //newResult[j] = 1/(1 + Math.exp(result[j]));
                //newResult[j] = Math.tanh(result[j])
            result = newResult   
            result[result.length] = 1;    
        }

        var maxValue = -1000;
        var maxIndex = 0;
        for(var i=0; i<result.length; i++)
        {
            if(result[i] > maxValue)
            {
                maxValue = result[i];
                maxIndex = i;       
            }
        }
        return maxIndex;
        
    }
    clear()
    {
        for(var i=0; i<16; i++)
            this.positions[i] = 1;
    }
}

var board = new Board('#CDC0B4', 80);
board.createBoard();


function playGame()
{
    var game = new Game();
    game.createNewCell();
    game.updateBoard();
        
    document.addEventListener('keyup', move);

    function move(e)
    {
        var prevPositions = [];
        for(var i=0; i<16; i++)
            prevPositions[i] = game.positions[i];

        if(e.keyCode == 65) 
        {
            game.moveLeft();
        }
        if(e.keyCode == 87) 
        {
            game.moveUp();
        }
        if(e.keyCode == 68) 
        {
            game.moveRight();
        }
        if(e.keyCode == 83) 
        {
            game.moveDown();
        }
        for(var i=0; i<16; i++)
            if(game.positions[i] != prevPositions[i])
            {
                game.createNewCell();
                break;
            }
        game.updateBoard();
    }
}



/////////////////////////            Genetic part             ////////////////////////

function reproduce(topPopulations, topScores, geneticGame)
{
    newPopulation = new Array();
    if(geneticGame.top25Populations.length == 0)
    {
        for(var i=0; i < topPopulations.length; i++)
        {
            geneticGame.top25Populations[i] = topPopulations[i];
            geneticGame.top25Scores[i] = topScores[i];
        }
    }
    else
    {
        var scores = [];
        var populations = [];
        var indexes = [];

        for(var i=0; i < topPopulations.length; i++)
        {
            populations[i] = geneticGame.top25Populations[i];
            scores[i] = geneticGame.top25Scores[i];
            indexes[i] = i;
        }
        for(var i=0; i < topPopulations.length; i++)
        {
            populations[topPopulations.length + i] = topPopulations[i];
            scores[topPopulations.length + i] = topScores[i];
            indexes[topPopulations.length + i] = topPopulations.length + i;
        }

        indexes.sort(function (a, b) { return scores[a] < scores[b] ? 1 : scores[a] > scores[b] ? -1 : 0; })

        for(var i=0; i< scores.length/2; i++)
        {
            topPopulations[i] = populations[indexes[i]];
            geneticGame.top25Populations[i] = populations[indexes[i]];
            geneticGame.top25Scores[i] = scores[indexes[i]];
            console.log(scores[indexes[i]])
        }
    }
    geneticGame.populations = []
    for(var k = 0; k < 4; k++)
        for(var l = 3; l>=0; l--)
        {
            geneticGame.populations.push(mutate(breed(topPopulations[k], topPopulations[l]), Math.random(), Math.random()));
            
        }
    for(var k = 0; k < 4; k++)
        geneticGame.populations.push(breed(topPopulations[k], geneticGame.nn.createNet()));
}

function breed(population1, population2)
{
    var newPop = []
    for(var i = 0; i < population1.length; i++)
    {
        var v = []
        for(var j=0; j < population1[i].length; j++)
        {
            var vector = []
            for(var k=0; k < population1[i][j].length; k++)
            {
                if(Math.random() < 0.7)
                    vector.push(population1[i][j][k]);
                else
                    vector.push(population2[i][j][k]);
                // var r1 = 0.2*Math.random() + 0.5;
                // var r2 = 1 - r1;
                // vector.push((r1*population1[k][l][t] + r2*population2[k][l][t]));
            }
            v.push(vector);
        }
        newPop.push(v)
    }
    return newPop;
}

function shuffle(a) 
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function mutate(population, mutationChance, mutationSize)
{
    clonedPopulation = population;
    for(var k=0; k<population.length; k++)
        for(var l=0; l<population[k].length; l++)
            if(Math.random() < mutationChance)
                for(var t=0; t<population[k][l].length; t++)
                    population[k][l][t] = population[k][l][t] + 2*(Math.random()-0.5)*mutationSize;

    return population;
}

async function evolve(geneticGame, numberOfGenerations, numberOfMaxMoves)
{
    for(var i=0; i<numberOfGenerations; i++)
    {
        console.log('Generation: ', i+1);
        
        await oneGeneration(geneticGame, numberOfMaxMoves);
        geneticGame.clear();
    }
}

async function oneGeneration(geneticGame, numberOfMaxMoves)
{
    var scores = [];
  
    for(var i=0; i<populationSize; i++)
    {
        console.log('Population: ', i+1);
        results = await playGameGenetic(geneticGame.populations[i], geneticGame, numberOfMaxMoves);
        scores[i] = results[1];
        if(scores[i] > geneticGame.maxScore)
            geneticGame.maxScore = scores[i];
        geneticGame.clear();
    }
    indexes = [];
    for(var i=0;i<populationSize; i++)
        indexes[i] = i;
    indexes.sort(function (a, b) { return scores[a] < scores[b] ? 1 : scores[a] > scores[b] ? -1 : 0; });

    var populationToReturn = [];
    var scoresToReturn = [];
    for(var i=0; i<populationSize/4; i++)
    {
        populationToReturn[i] = geneticGame.populations[indexes[i]];
        scoresToReturn[i] = scores[indexes[i]];
    }
    reproduce(populationToReturn, scoresToReturn, geneticGame);
}
function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playGameGenetic(population, geneticGame, numberOfMaxMoves)
{
    delay = 10;
    geneticGame.createNewCell();
    geneticGame.updateBoard();
    var prevPositions = [];
    var score = 0, reward = 0, s;
    for(var i=0; i < numberOfMaxMoves; i++)
    {
        for(var j=0; j<16; j++)
            prevPositions[j] = geneticGame.positions[j];
        direction = geneticGame.getMove(population);
        // if(Math.random() < 0.05)
            // direction = Math.floor(Math.random()*4);
        // console.log(i)
        //direction = Math.floor(Math.random()*4);
        prevScore = score;
        if(direction == 0)
            s = geneticGame.moveLeft();
        if(direction == 1)
            s = geneticGame.moveUp();
        if(direction == 2)
            s = geneticGame.moveRight();
        if(direction == 3)
            s = geneticGame.moveDown();
        
        score += s; 
        reward += s;

        if(score == prevScore)
            reward -= 1;
        // console.log(geneticGame.score);

        for(var j=0; j<16; j++)
            if(geneticGame.positions[j] != prevPositions[j])
            {
                geneticGame.createNewCell();
                break;
            }
        geneticGame.updateBoard();
        if(geneticGame.checkIfGameOver())
            break;

        await sleep(delay);
    }
    return [score, reward];
}

////////         Game played by user       /////////
// playGame();


////////         Game played by AI         /////////

inputSize = 16;
hiddenSize = 24; 
outputSize = 4;
populationSize = 20;
numberOfGenerations = 200;
numberOfMaxMoves = 100;
var populations = [];

nn = new NeuralNet([inputSize, hiddenSize, outputSize]);

geneticGame = new GameGenetic(nn, populationSize)

evolve(geneticGame, numberOfGenerations, numberOfMaxMoves)
