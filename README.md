![Falling Demo](./assets/apricotblossom.gif)
![Falling Demo](./assets/peachblossom.gif)

# Falling

[![npm](https://img.shields.io/npm/v/falling.svg)](https://www.npmjs.com/package/falling)
[![GitHub stars](https://img.shields.io/github/stars/cahilfoley/falling.svg)](https://github.com/trinhminhhieu/falling)

# Falling

A customizable falling animation

## Installation

```bash
npm install falling
```

### Include install

```bash
npm install three
```

## Usage

```jsx
import Falling from "falling";

function App() {
  return (
    <div>
      <Falling
        flowerCount={50}
        flowerImage="/custom-flower.png"
        fallSpeed={-3}
        spreadWidth={2000}
        spreadHeight={2000}
        colors={["#FF0000", "#00FF00", "#0000FF"]}
      />
    </div>
  );
}
```

## Props

| Prop         | Type     | Default                         | Description                    |
| ------------ | -------- | ------------------------------- | ------------------------------ |
| flowerCount  | number   | 30                              | Number of flowers to render    |
| flowerImage  | string   | '/flow.png'                     | Path to flower image           |
| fallSpeed    | number   | -5                              | Vertical fall speed of flowers |
| spreadWidth  | number   | 2000                            | Horizontal spread of flowers   |
| spreadHeight | number   | 2000                            | Vertical spread of flowers     |
| colors       | string[] | ['#FFB6C1','#FF69B4','#FFC0CB'] | Flower color palette           |

## License

MIT © [trinhminhhieu](https://github.com/trinhminhhieu)
