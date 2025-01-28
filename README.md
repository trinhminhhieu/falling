# Falling

[![npm](https://img.shields.io/npm/v/falling.svg)](https://www.npmjs.com/package/falling)
[![GitHub stars](https://img.shields.io/github/stars/trinhminhhieu/falling.svg)](https://github.com/trinhminhhieu/falling)

![Falling Demo](https://raw.githubusercontent.com/trinhminhhieu/falling/master/assets/apricotblossom.gif)
![Falling Demo](https://raw.githubusercontent.com/trinhminhhieu/falling/master/assets/peachblossom.gif)

A customizable falling animation

- [Demo](https://falling-demo-2lhb.vercel.app/)

## Installation

```bash
npm install falling
```

```bash
yarn add falling
```

## Usage

```jsx
<Falling
  flowerCount={50}
  flowerImage="/custom-flower.png"
  fallSpeed={-3}
  spreadWidth={2000}
  spreadHeight={2000}
  colors={["#FF0000", "#00FF00", "#0000FF"]}
/>
```

## Example

```jsx
//Nextjs - pages/index.js

"use client";
import React from "react";
import Falling from "falling";

const FallingDemo = () => {
  return (
    <div
      className="bg-purple-100"
      style={{
        backgroundColor: "#000",
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Falling flowerCount={50} flowerImage="/flow.png" fallSpeed={-3} />
    </div>
  );
};

export default FallingDemo;
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
