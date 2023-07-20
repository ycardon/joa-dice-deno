# JoA Dice Deno

a library and a CLI for dice rolls in [Time of Legends: Joan of Arc](https://www.mythicgames.net/en/time-of-legends-joan-of-arc/)

Adaptation from the [Node/Typescript](https://github.com/ycardon/joa-dices) original project

I'm also using that project as a use-case for exploring other languages, check the [joa-dices-rewrite](https://github.com/topics/joa-dices-rewrite) flag.

## build

```
deno task compile
```

## usage

```
./target/joa-dice-deno <attack dices> [: <defense dices>]
```

where `<attack dices>` and `<defence dices>` are
- `nN` n black combat dices
- `nR` n red combat dices
- `nJ` n yellow combat dices
- `nB` n white combat dices
- `nG` n gigantic combat dices
- `nD` n doom dices

for example:

- `joa-dice-deno 2R` is 2 red dices in attack

- `joa-dice-deno 2R 1J : 2N` is 2 red and 1 yellow dices in attack vs 2 black dices in defence, in that case the CLI is also calculating the net attack score by substracting defence shields
