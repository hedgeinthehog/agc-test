import { type SelectOption } from '@/components/ui/select/Select.tsx'

export const CITIES: Map<string, string> = new Map([
  ['riga', 'Riga'],
  ['daugavpils', 'Daugavpils'],
  ['jurmala', 'Jūrmala'],
  ['ventspils', 'Ventspils'],
])

export const cities: SelectOption[] = (() => {
  const options: SelectOption[] = []

  for (const [key, value] of CITIES) {
    options.push({ value: key, label: value })
  }
  return options
})()
