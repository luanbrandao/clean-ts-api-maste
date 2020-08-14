import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Encrypter {
  private readonly salt:number;

  // coisas específicas da lib vem no construtor
  constructor (salt: number) {
    this.salt = salt
  }

  async encrypt (value: string): Promise<string> {
    // await bcrypt.hash(value, 12)
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
