export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

export function remove<T>(arr: T[], item: T): T[] {
  return arr.filter(el => el !== item)
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  let currentIndex = copy.length
  let randomIndex: number

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]]
  }

  return copy
}
  
export function includesAny<T>(arr: T[], elems: T[], shouldAll = false): boolean {
  const matches = elems.filter(el => arr.includes(el)).length
  return shouldAll ? matches === elems.length : matches > 0
}
