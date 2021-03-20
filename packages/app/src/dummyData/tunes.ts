import { Howl } from 'howler'

const wr = (name: string): Howl => new Howl({
  src: [`${process.env.REACT_APP_IPFS_GATEWAY}${process.env.REACT_APP_IPFS_TUNES_DIR}/Entropy_ ${name}.ogg`],
});

const tunes = [
  [wr('BASS 1'), wr('BASS 2'), wr('BASS 3'), wr('BASS 4'), wr('BASS 5'), wr('BASS 6'), wr('BASS 7'), wr('BASS 8'),],
  [wr('BASS 9'), wr('BASS 10'), wr('BASS 11'), wr('BASS 12'), wr('BASS 13'), wr('BASS 14'), wr('PERC 1'), wr('PERC 2'),],
  [wr('MELO 1'), wr('MELO 2'), wr('MELO 3'), wr('MELO 4'), wr('MELO 5'), wr('MELO 6'), wr('MELO 7'), wr('MELO 8'),],
  [wr('MELO 9'), wr('MELO 10'), wr('MELO 11'), wr('MELO 12'), wr('PERC 3'), wr('PERC 4'), wr('PERC 5'), wr('PERC 6'),],
  [wr('PAD 1'), wr('PAD 2'), wr('PAD 3'), wr('PAD 4'), wr('PAD 5'), wr('PAD 6'), wr('PAD 7'), wr('PAD 8'),],
  [wr('PAD 9'), wr('PAD 10'), wr('PAD 11'), wr('PAD 12'), wr('PAD 13'), wr('PAD 14'), wr('PAD 15'), wr('PAD 16'),],
  [wr('PAD 17'), wr('PAD 18'), wr('PAD 19'), wr('PAD 20'), wr('PAD 21'), wr('PAD 22'), wr('PAD 23'), wr('PAD 24'),],
  [wr('PERC 7'), wr('PAD 8'), wr('PAD 9'), wr('PAD 10'), wr('PAD 11'), wr('PAD 12'), wr('PAD 13'), wr('PAD 14'),],
]


export default tunes;