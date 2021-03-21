import BN from 'bn.js'

const toBuffer = (num: string) => {
  const bn = new BN(num, 10);
  let buf;
  try {
    buf = bn.toArrayLike(Buffer, 'le', 8);
  } catch {
    buf = bn.toArrayLike(Buffer, 'le', 16);
  }
  return buf;
}

export default toBuffer;