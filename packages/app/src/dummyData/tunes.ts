const wr = (name: string): string => `${process.env.REACT_APP_IPFS_GATEWAY}${process.env.REACT_APP_IPFS_TUNES_DIR}/${name}.mp3`
const tunes = [[wr('BASS 1'), wr('BASS 2'), wr('BASS 3'), wr('FX 1'), wr('FX 2'), wr('FX 3'), wr('FX 4'), wr('FX 5')],
[wr('PAD 1'), wr('PAD 2'), wr('PAD 3'), wr('PAD 4'), wr('PAD 5'), wr('PAD 6'), wr('PAD 7'), wr('PAD 8')],
[wr('PERC 1'), wr('PERC 2'), wr('PERC 3'), wr('PERC 4'),wr('PERC 1'), wr('PERC 2'), wr('PERC 3'), wr('PERC 4')],
[wr('BASS 1'), wr('BASS 2'), wr('BASS 3'), wr('FX 1'), wr('FX 2'), wr('FX 3'), wr('FX 4'), wr('FX 5')],
[wr('PAD 1'), wr('PAD 2'), wr('PAD 3'), wr('PAD 4'), wr('PAD 5'), wr('PAD 6'), wr('PAD 7'), wr('PAD 8')],
[wr('PERC 1'), wr('PERC 2'), wr('PERC 3'), wr('PERC 4'),wr('PERC 1'), wr('PERC 2'), wr('PERC 3'), wr('PERC 4')],
[wr('BASS 1'), wr('BASS 2'), wr('BASS 3'), wr('FX 1'), wr('FX 2'), wr('FX 3'), wr('FX 4'), wr('FX 5')],
[wr('PAD 1'), wr('PAD 2'), wr('PAD 3'), wr('PAD 4'), wr('PAD 5'), wr('PAD 6'), wr('PAD 7'), wr('PAD 8')]]


export default tunes;