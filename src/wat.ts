interface Person {
  name: string;
  hometown: string;
  nickname: string;
}
type ModifiedPerson = { [P in keyof Person & 'nickname']: Person[P] }