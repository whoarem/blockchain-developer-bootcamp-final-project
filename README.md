# Drawing

Create and share drawings like codes.

## Requirements

- nodejs ^16
- yarn

## Setting Up

### 1. Clone this repo.
```sh
mkdir whoarem && cd whoarem

git clone https://github.com/whoarem/blockchain-developer-bootcamp-final-project.git

cd blockchain-developer-bootcamp-final-project

```

### 2. Install dependencies(Contracts and Frontend).
```sh
# from project root
yarn install

cd client
# from client dir
yarn install

cd ..

```

## Local deploying and running.

### 1. Run hardhat local eth node.
```sh
# from project root
yarn run_test_node

```

### 2. Switch to another terminal and deploy contracts to local network.
```sh
# from project root
yarn deploy:local

```

### 3. Check contracts basic functions and put test data.
```sh
# from project root
yarn hardhat run --network localhost scripts/check_base_fns.ts

```

### 4. Change working dir to "client" and run frontend.
```sh
cd client

# from client dir
yarn start

```
