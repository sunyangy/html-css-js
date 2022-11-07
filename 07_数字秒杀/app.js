const items = [...document.querySelectorAll('.number')]


function updateNum(e){
    const value = Number(e.dataset.value)
    const initialNum = Math.ceil(value/1000)

    let inititalValue = 0
    const timer = setInterval(() => {
        inititalValue += initialNum
        if(inititalValue > value) {
            e.t
            return
        }
    }, 1);
}


items.forEach(item=>{
    updateNum(item)
})