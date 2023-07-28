# PeercoinSim

A simulation of peercoins reward per year with variable parameters of peercoin's system.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
### Notes and definitions (for now)

| definitions  |remarks   |default   |
|---|---|---|
|IncubationDays  |a.k.s No_Ramp-Days, days to wait after a tx before mints are allowed   |  30|
|RampUpDays | days after IncubationTime before coindays are capped   |60   |
|StaticRewardRate|effects the total stake reward when mint|0.0025 = 0.25%|
|StaticReward| (0.0025 * MoneySupply / YearlyBlocks)  | ~1.34 in mid 2023     |
|DaysInYear|(365 * 33 + 8) / 33|365.242424|
|AnnualRewardRate|Annual reward rate where Total reward =  (0.03 * coindays / year) + StaticReward|0.03 = 3%|
|mint probability|a mint occures when hash < coins * dayweight * target. target is   (2^224 / ‘difficulty’). A hash is a value between 0 and 2^256  |(coins * dayweight) / (difficulty * 2^32)|