const arr = {}

const date1 = "2025-10-03"
const date2 = "2025-10-04"
const date3 = "2025-10-03"

const arr_date = [date1, date2, date3]
arr_date.map((date) => {
  let condition = arr[date] === undefined
  if (condition === true) {
    arr[date] = []
  }
  arr[date].push({date, value: 50})
  console.log(arr);
})

