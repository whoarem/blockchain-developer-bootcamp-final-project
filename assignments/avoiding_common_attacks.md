## Using Specific Compiler Pragma(SWC-103)

Locked pragma version(0.8.4) to to ensure that contracts do not accidentally get deployed using.

<br/>

## Using Recent Compiler Version(SWC-102)

Using an outdated compiler version can be problematic especially if there are publicly disclosed bugs and issues that affect the current compiler version.

<br/>

## Pull Over Push

Before creating DWG token, gets account's tokens cids and checks if same ipfs cid on same account address exists. If true, token wouldn't be created.

<br/>

## No Unencrypted Private Data On-Chain(SWC-136)

Only stores cid(drawing's data location) on chain.

