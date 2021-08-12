// // import faker from 'faker';
// import { Hasher } from '@/data/protocols/criptography/hasher'
// import { Decrypter } from '@/data/protocols/criptography/decrypter'
// import { Encrypter } from '@/data/protocols/criptography/encrypter'
// import { HashComparer } from '@/data/protocols/criptography/hash-comparer'
// import faker from 'faker'

// // export const mockHasherSpy = (): Hasher => {
// export class HasherSpy implements Hasher {
//     digest = faker.random.alpha();
//     plainText: string = 'luan';

//     async hash (plainText :string): Promise<string> {
//       this.plainText = plainText
//       return this.digest
//     }
// }
// // return new HasherSpy()
// // }

// export const mockDecrypter = (): Decrypter => {
//   class DecrypterSpy implements Decrypter {
//     digest = faker.internet.password();
//     plainText: string = '';

//     async decrypt (plainText: string): Promise<string|null> {
//       this.plainText = plainText
//       return this.digest
//     }
//   }
//   return new DecrypterSpy()
// }

// export const mockEncrypter = (): Encrypter => {
//   class EncrypterStub implements Encrypter {
//     digest = faker.internet.password();
//     plainText: string = '';

//     async encrypt (plainText: string):Promise<string> {
//       this.plainText = plainText
//       return this.digest
//     }
//   }
//   return new EncrypterStub()
// }

// export const mockHashComparer = (): HashComparer => {
//   class HashComparerStub implements HashComparer {
//     async compare (_value: string, _hash: string):Promise<boolean > {
//       return Promise.resolve((true))
//     }
//   }
//   return new HashComparerStub()
// }
