const Ops = {
    PLUS: '+',
    MINUS: '-',
    MUL: '*',
    DIV: '/',
    POW: '^'
}

const screenTop = document.querySelector('.screen-top')
const screenBottom = document.querySelector('.screen-bottom')
const btn0 = document.querySelector('#btn-0')
const btn1 = document.querySelector('#btn-1')
const btn2 = document.querySelector('#btn-2')
const btn3 = document.querySelector('#btn-3')
const btn4 = document.querySelector('#btn-4')
const btn5 = document.querySelector('#btn-5')
const btn6 = document.querySelector('#btn-6')
const btn7 = document.querySelector('#btn-7')
const btn8 = document.querySelector('#btn-8')
const btn9 = document.querySelector('#btn-9')
const btnPoint = document.querySelector('#btn-point')
const btnAC = document.querySelector('#btn-ac')
const btnC = document.querySelector('#btn-c')
const btnPlus = document.querySelector('#btn-plus')
const btnMinus = document.querySelector('#btn-minus')
const btnMul = document.querySelector('#btn-mul')
const btnDiv = document.querySelector('#btn-div')
const btnPow = document.querySelector('#btn-pow')
const btnEq = document.querySelector('#btn-eq')


let prevStr = null, opStr = null
let isSet = false

btn0.onclick = () => addDigit('0')
btn1.onclick = () => addDigit('1')
btn2.onclick = () => addDigit('2')
btn3.onclick = () => addDigit('3')
btn4.onclick = () => addDigit('4')
btn5.onclick = () => addDigit('5')
btn6.onclick = () => addDigit('6')
btn7.onclick = () => addDigit('7')
btn8.onclick = () => addDigit('8')
btn9.onclick = () => addDigit('9')
btnPoint.onclick = () => addDigit('.')
btnAC.onclick = () => {
    screenTop.textContent = ''
    screenBottom.textContent = '0'
    prevStr = null
    opStr = null
    isSet = false
}
btnC.onclick = () => {
    screenBottom.textContent = screenBottom.textContent.slice(0, -1)
    if (screenBottom.textContent === '') {
        screenBottom.textContent = '0'
    }
}
btnPlus.onclick = () => doOp(Ops.PLUS)
btnMinus.onclick = () => doOp(Ops.MINUS)
btnMul.onclick = () => doOp(Ops.MUL)
btnDiv.onclick = () => doOp(Ops.DIV)
btnPow.onclick = () => doOp(Ops.POW)
btnEq.onclick = () => calc()

function addDigit(digit) {
    let cur = screenBottom.textContent
    if (!isSet) {
        if (digit === '.') {
            screenBottom.textContent = '0.'
        } else {
            screenBottom.textContent = digit
        }
        if (digit !== '0')
            isSet = true
    } else {
        if (cur.length < 15) {
            screenBottom.textContent += digit
        }
    }
}

function doOp(op) {
    opStr = op
    if (prevStr !== null) {
        if (isSet) {
            calc()
            prevStr = screenBottom.textContent
            opStr = op
        }
    } else {
        prevStr = screenBottom.textContent
        isSet = false
    }
    screenTop.textContent = `${prevStr} ${opStr}`
}

function calc() {
    let cur = +screenBottom.textContent
    let res
    switch(opStr) {
        case Ops.PLUS: res = +prevStr + cur; break
        case Ops.MINUS: res = +prevStr - cur; break
        case Ops.MUL: res = +prevStr * cur; break
        case Ops.DIV: res = +prevStr / cur; break
        case Ops.POW: res = (+prevStr) ** cur; break
    }
    screenTop.textContent = `${prevStr} ${opStr} ${screenBottom.textContent} =`
    prevStr = null
    opStr = null
    screenBottom.textContent = +res.toFixed(3)
    isSet = false
}