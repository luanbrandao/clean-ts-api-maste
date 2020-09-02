export interface TokenGenerator {
  generate (_id: string):Promise<string>
}
