const PREFIX = 'author_'

export function parseAuthor(value: string) {
  return value.replace(PREFIX, '')
}
export function createAuthorValue(value: string) {
  return `${PREFIX}${value}`
}
