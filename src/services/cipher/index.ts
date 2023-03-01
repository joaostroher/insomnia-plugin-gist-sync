import crypto from 'crypto';

const CIPHER_ALGORITHM = 'aes-256-ctr';

class Aes256Cipher {
  key: string;

  constructor(key: string) {
    if (!key) throw new TypeError('Key must be non-empty string');

    this.key = key;
  }

  encrypt(input: string): string {
    if (!input) {
      throw new TypeError('Provided "input" must be a non-empty string');
    }

    const sha256 = crypto.createHash('sha256');
    sha256.update(this.key);

    // Initialization Vector
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(CIPHER_ALGORITHM, sha256.digest(), iv);

    const buffer = Buffer.from(input);

    const ciphertext = cipher.update(buffer);
    const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]);

    return encrypted.toString('base64');
  }

  decrypt(encrypted: string): string {
    if (!encrypted) {
      throw new TypeError('Provided "encrypted" must be a non-empty string');
    }

    const sha256 = crypto.createHash('sha256');
    sha256.update(this.key);

    const buffer = Buffer.from(encrypted, 'base64');

    if (buffer.length < 17) {
      throw new TypeError(
        'Provided "encrypted" must decrypt to a non-empty string',
      );
    }

    // Initialization Vector
    const iv = buffer.slice(0, 16);
    const decipher = crypto.createDecipheriv(
      CIPHER_ALGORITHM,
      sha256.digest(),
      iv,
    );

    const ciphertext = buffer.slice(16);

    return decipher.update(ciphertext) + decipher.final();
  }
}

export default Aes256Cipher;
