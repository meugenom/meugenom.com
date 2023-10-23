---
date: 2023-10-22
title: 'How to optimize images size on MacOS'
template: post
thumbnail: '../thumbnails/optimisation-process.jpg'
slug: how-to-optimize-images-size-macos
categories: optimize images homebrew
tags: apps images optimization homebrew
---

### Problem with images size

When you need to optimize images size in your project, you can use this simple way. 
It's very easy and fast. No need to use any online services or other apps.

- [optipng](https://optipng.sourceforge.net) is a PNG optimizer that recompresses image files to a smaller size, without losing any information.
- [jpegoptim](https://github.com/tjko/jpegoptim) is a utility for optimizing JPEG files. It provides lossless optimization (based on optimizing the Huffman tables) and "lossy" optimization based on setting a maximum quality factor.

### Huffman coding

Huffman coding is a technique used for lossless data compression, which means it allows us to reduce the size of data without losing any information. It was developed by David A. Huffman in 1952.

Here's how it works:

1. **Frequency Analysis:** Huffman coding begins by analyzing the frequency of each symbol in the data to be compressed. Symbols can be individual characters, numbers, or any other units of data.

2. **Building a Tree:** It then builds a binary tree based on these frequencies. The more frequent a symbol is, the closer it is to the root of the tree. This ensures that more common symbols are represented with shorter codes, while rarer symbols are assigned longer codes.

3. **Assigning Codes:** As the tree is constructed, each branch to the left is labeled with a 0, and each branch to the right is labeled with a 1. The codes for the symbols are determined by the path from the root to each symbol.

4. **Compression:** After the tree is constructed and the codes are assigned, the original data is then encoded using these generated binary codes. The resulting binary sequence is more compact than the original data, allowing for efficient storage and transmission.

5. **Decompression:** To decompress the data, the same Huffman tree is used to decode the binary sequence back into the original symbols.

Huffman coding is widely used in various applications where data compression is crucial, such as file compression (like in ZIP files), image compression (in formats like JPEG), and in various communication protocols to save bandwidth and speed up data transmission.

 [See Wiki](https://en.wikipedia.org/wiki/Huffman_coding)

### How to use it on MacOS

1. Open terminal and install apps for optimize images size:

```bash
    # For JPEG
    brew install jpegoptim

    # For PNG
    brew install optipng
```

2. Optimize images:

```bash
    // For JPEG
    jpegoptim -m80 -o -p --strip-all your_image

    // For PNG
    optipng -o7 your_image
``` 


