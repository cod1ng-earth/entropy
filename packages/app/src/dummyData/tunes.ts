const samples= ['QmX8kzw8dnFrp17AshyX5ubeJwtqnppQ1mhjTDx8jcd9T2',
'QmTiKuZ6VNRwPrPBDcJKCjzS2XqpmiXXDoimeRfQ76Jz7p'];

const tunes: string[][] = [];

for (let i = 0; i < 8; i++) {
  tunes.push([]);
    for (let j = 0; j < 8; j++) {
    tunes[i].push(i % 2 ===0 ? samples[0]: samples[1]);
  }
}

export default tunes;