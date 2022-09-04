export const validator = (inputs, values) => {
  const filterArray = inputs.filter(e => e.name)
  let namesArray = filterArray.map(e => e.name)
  let patternsArray = filterArray.map(e => e?.error?.pattern || /./)
  let pattern_1Array = filterArray.map(e => e?.error?.pattern_1 || /./)
  const valuesArray = Object.entries(values)
  const filtered = valuesArray?.filter(e => namesArray.includes(e[0]))
  const test_1 = filtered?.every((e,i) => patternsArray[i]?.test(e[1]))
  const test_2 = filtered?.every((e,i) => pattern_1Array[i]?.test(e[1]))

  if(!test_1 || !test_2) return true

  return false
}