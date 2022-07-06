export const removeEmptyProps = obj => Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
export const isEmpty = obj => {
    for(const key in obj){
        if(obj[key]) return false;
    }
    return true;
}
