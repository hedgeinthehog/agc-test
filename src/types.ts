export interface PersonData {
  name: string
  surname: string
  age: number | string
  city: string
}

export interface PeopleTableRecord extends PersonData {
  id: string
}

export interface PeopleTable {
  id: string
  data: PeopleTableRecord[]
}
