# Drawing

Create and share drawings like codes.

## Deployed page addresss

https://dwg.jjdd.site

## Screen-recording

https://drive.google.com/file/d/1U_peWMq4pMI6GO8alMKRZXWSvEulSeAv/view?usp=sharing

## Requirements

- nodejs ^16
- yarn

## Directory structure
```sh
./
├── README.md # Project descriptions and instructions
├── README_previous.md # First schetching and scaffolding
│
├── assignments # Final project required docs.
│   ├── avoiding_common_attacks.md
│   ├── deployed_address.txt
│   ├── design_pattern_decisions.md
│   └── finalprojectchecklist.txt
│
├── client # Contains Frontend source codes.
│   ├── README.md
│   ├── firebase.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.test.tsx
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── DarkModeButton.tsx
│   │   │   ├── LoginMessage.tsx
│   │   │   ├── Map.tsx
│   │   │   ├── MyDwgsModal.tsx
│   │   │   ├── contracts.ts
│   │   │   ├── mapConfig.ts
│   │   │   └── mapUtils.tsx
│   │   ├── fbConfig.ts
│   │   ├── index.css
│   │   ├── index.tsx
│   │   ├── logo.svg
│   │   ├── memo.ts
│   │   ├── react-app-env.d.ts
│   │   ├── reportWebVitals.ts
│   │   └── setupTests.ts
│   └── tsconfig.json
│
├── contracts # Contains solidity smart contract source codes.
│   ├── Drawing.sol
│   └── DrawingUpgradeTest.sol
│
├── hardhat.config.ts
├── package.json
│
├── scripts # Contains contract deploying scripts.
│   ├── check_base_fns.ts
│   ├── deploy.ts
│   ├── deploy_greeter.ts
│   ├── upgrade.ts
│   └── util.ts
│
├── test # Contains unit test script.
│   └── index.ts
│
└── tsconfig.json
```

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

## Tests
```sh
yarn test
```

## eth account for certificate(hopefully)

```
0xC0c0e7E7f9ef2500207B29078C96E0f47FB199Eb
```