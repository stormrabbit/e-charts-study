Array.prototype.avg = function (call) {
    let type = Object.prototype.toString.call(call);
    let sum = 0;
    if (type === '[object Function]') {
        sum = this.reduce((pre, cur, i) => pre + call(cur, i), 0);
    } else {
        sum = this.reduce((pre, cur) => pre + cur);
    }
    return sum / this.length;
};
const ava = 7
export const countDates = (dates) => {
    
    const avaDates = dates.reduce( (pre, cur, index) => {
        if( (index %  ava) === 0 ) {
            pre.push(cur)
        }
        if( (index % ava) === (ava - 1) || (index ===(dates.length -1))) {
            pre[pre.length -1] = `${pre[pre.length -1]}-${cur}`
        }
        return pre
    }, []  )
    return avaDates
}

export const countResult = (results) => {
   return results.reduce( (pre, cur, index )=> {
        if( (index %  ava) === 0 ) {
            pre.push([cur])
        } 
        if( (index %  ava) !== 0 )  {
            pre[pre.length -1] = [...pre[pre.length -1], cur]
        }
        if( (index % ava) === (ava - 1) || (index ===(results.length -1))) {
            pre[pre.length -1] = Math.floor(pre[pre.length -1].avg()) 
        }
        return pre
    }, [])
}