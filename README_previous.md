# blockchain-developer-bootcamp-final-project

## first idea

It sounds like that the blockchain is kind of a distributed database. It may guarantee data not corrupt but looks not easy and expensive to modify the data.

This might not be a big problem, if the data only deals with transactions about countable asset, otherwise the feature that the original data can't be modified is (in my opinion) way too much.

I think it is the only necessary key features that the data can be modified only by authorized participants of the data and every modification can be tracked by anyone in the network.

Also, shoudn't there be verified storage for last state of dataset? I don't know about all blockchain networks different features and as I learned up to now, we shoud trace all the blocks to check how many assets a participant owns at one moment.

Maybe these kind of questions will be disappear as I go more on the course, and I'm not sure that it's possible to resolve the problems only with a DAPP not with the new chain system.

## Final Project's Solidity Scaffolding

This app makes users can draw plans inside of a selected lots in Seoul, Korea.
And users can publish their plans on blockchain.
Users can fork plans other users drew and develop or upgrade and publish the plan.
Users can configure price of forking(=rights to use) when they publish a plan.

```javascript or solidity
function publish_drawing(address _user, string data_url, uint price) {
    // gets user address, data_url(might be ipfs address?) and then register the drawing data is owned by the user on chain.
}
```

```javascript or solidity
function fork_drawing(address _user, string data_url) {
    // gets user addresss, data_url and then give them rights to use the drawing for any purpose.
}
```

```javascript or solidity
modifier check_drawing_duplicates(string data_url, string? hash) {
    // checks a user trying to publish exacly same drawing.
    _
}
```

```javascript or solidity
function get_existing_drawings(string pnu) view {
    // pnu is id of a lot in Seoul, Korea.
    // when user wants to see existing drawings of a lot, they can get informations of drawings(data, how many user forked ...).
}
```

```javascript or solidity
function exclaim_fraud(address _user, string data_url) {
    // users can like or dislike drawings. these kinds of activities are allowed without coin. But users can exclaim that a drawing and its information doesnt match and looks like fraud with using their coin.
}
```
