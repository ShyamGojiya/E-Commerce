const Currency = (num) => {
    const format = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : 'INR',
        minimumFractionDigits : 2
    })

    return format.format(num);
}
export default Currency;