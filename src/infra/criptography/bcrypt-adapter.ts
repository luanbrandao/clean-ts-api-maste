import { Hasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  private readonly salt:number;

  // coisas específicas da lib vem no construtor
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    // await bcrypt.hash(value, 12)
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
