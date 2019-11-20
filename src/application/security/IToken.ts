export default

interface IToken {
  generate(payload: object): Promise<string>
  decode(payload: string): Promise<{ userId: string }>
}
