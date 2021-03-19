Entropy

Entropy is about building new art based on composable collections of seed NFTs.

The baseline of Entropy are 8x8 bitmap "tiles" that can be interpreted as bitmap pictures if you want so, e.g.


the binary hex string `b44861ea32a51020` yields these bits:

```
[
 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0,
 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1,
 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1,
 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
 0, 0, 0, 0
]
```

and if you paint them, looks like:

```
█ ██ █  
 █  █   
 ██    █
███ █ █ 
  ██  █ 
█ █  █ █
   █    
  █     
```

Bitmaps can be easily manipulated using bit shifting operations so you can combine two patterns, e.g like this (an OR operation)

``` 
   █                       █     
   █                       █     
   █                       █     
   █                       █     
   █          ████████  ████████ 
   █                       █     
   █                       █     
   █                       █     

```



An Entropy NFT is defined by an bitmap pattern, denoted by the patterns hex string / byte representation (e.g. `b44861ea32a51020`)



### Entropy rules

1. minting out of seeds

Everybody *can* mint NFTs, but only if you they bring two or more seed NFTs along.

The game starts with 64 single pixel NFTs (each with a single bit set) who are sold to new owners

During the minting process the contract combines the two input patterns and (undecided) burns the seed patterns.

By repeating this process new NFTs are born.

2. goal: mint the "nicest" NFTs

Everyone will try to achieve minting the "nicest looking" bitmap that can be created out of seed bitmaps.

The "nicer" a seed NFT the more "valuable" it gets because it can be used to mint even nicer NFTs, aka creating sth like:

```
 ██  ██ 
█  ██  █
█  ██  █
 ██  ██ 
 ██  ██ 
█  ██  █
█  ██  █
 ██  ██ 
```

### (optional) intrinsic economic challenges

first, add a computational "niceness" indicator to the contract that can compute some "structuredness" feature out of a bitmap. For example, using a very naive Shannon entropy definition:

```
█      █
 █    █ 
  ████  
  █  █  
  █  █  
  ████  
 █    █ 
█      █
{
  s: { x: 40, y: 40 },
  sq: { x: 43.31370849898476, y: 43.31370849898476 },
  sym: { '0': 0, '1': 0, '2': 8, '3': 0, '4': 8, '5': 0, '6': 0, '7': 0 },
  symbolicEntropy: 10
}


 █ █ █ █
█ █ █ █ 
 █ █ █ █
█ █ █ █ 
 █ █ █ █
█ █ █ █ 
 █ █ █ █
█ █ █ █ 
{
  s: { x: 157.21187563522582, y: 157.21187563522582 },
  sq: { x: 148.1620734196171, y: 148.1620734196171 },
  sym: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 16 },
  symbolicEntropy: 7
}

 █  █ ██
█ █ █  █
█   ████
     ██ 
█       
████   █
 █ █ ██ 
██  █ ██
{
  s: { x: 56.62919048309068, y: 49.60964047443681 },
  sq: { x: 58.05949817513566, y: 51.66562126173752 },
  sym: { '0': 0, '1': 1, '2': 6, '3': 0, '4': 5, '5': 2, '6': 2, '7': 0 },
  symbolicEntropy: 67
}
```

according to the algorithm used here, the "nicest" tiles are those with an 3 < entropy < 12 (that's to be determined)

The more "niceness" exists in a pattern, the more expensive it gets to mint. 

Minters have not only to bring seed NFTs along, but also some money (e.g. ERC20) that's locked into the resulting asset (if you use interest bearing tokens like aDAI they even accrue interest, adding to the NFTs intrinsic value over time, see Charged Particles)

An amount of the "minting" charge is paid as a royalty to the previous owners of the seed NFTs.

### display

Bitmap patterns look really boring, so lets add some mechanism to display "generated" art by interpreting them.

**Music**: each bitmap cell corresponds with a sample tune (mp3) that also can be covered by an MP3 NFT itself . The first row is the percussion line, the second a bass line, the third piano tunes, etc. 

**Generated images**: each row represents a feature of an resulting image, e.g. background color, art frequency, item shape. An algorithm creates the final artwork out of the pattern

**Generated lineart**: each row represents a coefficient for a vector function or an IFS that creates fractal images



### multi generation nfts

To make the whole thing much more fun, lets consider everything above to happen on the first epoch of the contract.

At some point in time a second "epoch" begins, e.g. after a month or a sufficient amount of "nice" NFTs have been minted

From here on one can mint 2-gen NFTs. These are minted by using 4 1-gen NFTs and are a combination of those. Effectively a 2-gen NFT has a square border length of 16 (2 1-get NFTs horizontally and vertically)

That instantly adds a whole dimension to the display part: the 2-gen feature bits can create a totally new "world" of how to display the 4 seed NFTs with much more complex algorithms, creating much more complex generative art



#### multi generation with sound

on epoch 1 the NFTs are representing the input features for a sound generator, e.g. defining tune, pitch, distortion etc. of a single constant "sound" (e.g. a vibrating tune or a guitar sound or a kick snare)

on epoch 2 those "sound" NFTs are combined to a harmony / set of sounds, e.g. a basic drum line or a chord or a melody

on epoch 3 those building blocks are assembled to a verses and chorus lines

on epoch 4 these lines are assembled to songs

on epoch 5 thse songs are assembled to a disco night.



## high level development tasks

gas-optimized bit shift operations on solidity

business rules on solidity (e.g. add / distribute minting charges, burn, airdrop etc.)

these are NFTs without an "URL" input. To display them on marketplaces, the resulting images / sounds should be pregenerated client side so they can be displayed after minting

display features: "play" / "show" NFT representations

frontend simulations: find all existing nfts on chain and simulate what happens when you assemble them locally. If the result looks nice, ask their owners to buy them to produce the simulated result on chain

frontend "dreaming" simulation: paint an NFT freely until you find one you're wishing for, check first simulator how close you come to that result by using existing NFTs, find the NFT that you "need" to create your "dream" and repeat until you find a path that would lead to your "idea". Publish that path so others can mint the missing pieces



