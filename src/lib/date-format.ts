const formatter = Intl.DateTimeFormat()

export default function dateFormat(value:string) {
  return formatter.format(new Date(value))
}
