---
layout: post
title: "NumPy Fundamentals for Technical Interviews"
description: "A compact review of array memory, broadcasting, indexing, shape manipulation, einsum, and performance pitfalls."
date: 2026-08-20
math: true
tags: [numpy, python, interviews]
---

These are the NumPy mechanisms and patterns I wanted at my fingertips while preparing for technical interviews. The goal is not to catalog the entire API, but to build enough intuition to reason about shapes, memory, and performance without trial and error.

## Arrays, memory, and strides

A multidimensional NumPy array consists of two main pieces:

1. a one-dimensional block of data; and
2. metadata describing how that data should be interpreted.

The most important metadata for understanding layout is the array's **strides**. A stride records how many bytes NumPy moves in memory when an index advances by one along a given axis.

For example, a C-contiguous array with shape `(3, 4)` and dtype `int64` has strides `(32, 8)`:

- advancing one row jumps (4 \times 8 = 32) bytes;
- advancing one column jumps (8) bytes.

Slicing and transposing often change only this metadata. NumPy can point a new array object at the same memory while assigning it a different shape, offset, or set of strides.[^views]

[^views]: This is why changing a slice can sometimes modify its source array. Use `.copy()` when the result must own independent data.

## Why vectorization is fast

Vectorized NumPy code usually benefits from three things:

- **Cache efficiency.** Contiguous data makes good use of the adjacent memory fetched into CPU caches.
- **Less Python overhead.** Operations and loops run in compiled code over typed data instead of repeatedly dispatching dynamically typed Python objects.
- **SIMD instructions.** NumPy's compiled backend can use vector registers to apply one instruction to several values at once.

Vectorization is not magic, however. A concise expression can still allocate an enormous intermediate array.

## Broadcasting

NumPy compares operand shapes from right to left. Two dimensions are compatible when they are equal or when either one is `1`. Missing dimensions on the left are treated as dimensions of size `1`.

Some representative shape calculations are:

```text
(A, B, C) + (A, B, C) -> (A, B, C)
(A, 1, C) + (1, B, C) -> (A, B, C)
(A, B, C) +    (B, 1) -> (A, B, C)
```

I collected the exercises I used to practice these patterns in my [vectorization interview-practice repository](https://github.com/FJYang96/interview/tree/main/vectorization).

### Pairwise squared distances

Given `X` with shape `(B, D)` and `Y` with shape `(C, D)`, form every pairwise difference and reduce along the feature dimension:

```python
dist_sq = np.sum((X[:, None, :] - Y[None, :, :]) ** 2, axis=-1)
# shape: (B, C)
```

The inserted axes turn the operands into `(B, 1, D)` and `(1, C, D)`, which broadcast to `(B, C, D)`.[^pairwise]

[^pairwise]: This expression materializes an array of shape `(B, C, D)`. For very large inputs, a blocked algorithm or a specialized distance routine can use much less memory.

### Batched matrix-vector products

Given `X` with shape `(B, M, N)` and `y` with shape `(B, N)`:

```python
result = np.sum(X * y[:, None, :], axis=-1)
# shape: (B, M)
```

### Constructing a mask from lengths

Given sequence lengths `lengths` with shape `(B,)`, construct a mask with shape `(B, S)`:

```python
mask = np.arange(S)[None, :] >= lengths[:, None]
```

Here `mask[b, s]` is true when position `s` lies at or beyond the valid length of item `b`. Use `>` instead of `>=` if the boundary convention includes `lengths[b]` itself.

## Indexing and masking

Suppose `arr` has shape `(B, M, N)`. Basic slicing usually returns a view, while advanced indexing with boolean or integer arrays returns a copy because the selected elements need not be adjacent in memory.

### Boolean masks

A full mask has the same shape as the array:

```python
selected = arr[mask]  # mask: (B, M, N), result: (K,)
```

The selected values are flattened into a one-dimensional result.

A prefix mask can select complete feature vectors:

```python
selected = arr[mask]  # mask: (B, M), result: (K, N)
```

A one-dimensional mask can filter one axis:

```python
arr[batch_mask, :, :]  # batch_mask: (B,), result: (K, M, N)
arr[:, row_mask, :]    # row_mask: (M,), result: (B, K, N)
```

### Integer-array indexing

Multiple index arrays select coordinates together. The index arrays must be broadcastable to a common shape.

```python
# idx1 and idx2 both have shape (K,)
out = arr[idx1, idx2, :]
# out[k, n] == arr[idx1[k], idx2[k], n]
# shape: (K, N)
```

Broadcasting the indices creates a grid of selections:

```python
# idx1: (P, 1), idx2: (1, Q)
out = arr[idx1, idx2, :]
# out[p, q, n] == arr[idx1[p, 0], idx2[0, q], n]
# shape: (P, Q, N)
```

A single integer index array replaces the indexed axis with the index array's shape:

```python
arr[idx].shape  # idx: (K,)    -> (K, M, N)
arr[idx].shape  # idx: (K, J) -> (K, J, M, N)
```

## Shape manipulation

### Reshape and singleton dimensions

- `reshape` returns a view when the requested layout is compatible with the underlying memory; otherwise it may return a copy.
- `np.expand_dims(a, axis)` inserts one or more singleton dimensions.
- `np.squeeze(a, axis=None)` removes singleton dimensions.
- `keepdims=True` preserves reduced axes with size `1`, which often makes later broadcasting easier.

### Permuting axes

- `np.transpose(a, axes)` specifies the complete axis order. Without `axes`, it reverses the axes.
- `np.swapaxes(a, axis1, axis2)` exchanges two axes.

The terminology differs slightly in PyTorch:

```text
torch.transpose  <-> np.swapaxes
torch.permute    <-> np.transpose
```

### Combining arrays

`concatenate` joins arrays along an existing axis, so every other dimension must match:

```python
np.concatenate((a, b), axis=0)
```

`stack` inserts a new axis, so all input shapes must match:

```python
np.stack((a, b), axis=0)
```

## Reductions

The reductions I use most often are:

```python
np.sum(a, axis=axis)
np.mean(a, axis=axis)
np.max(a, axis=axis)
np.argmax(a, axis=axis)
np.any(a, axis=axis)
np.all(a, axis=axis)
np.cumsum(a, axis=axis)
```

The `axis` argument specifies which dimension disappears. With `keepdims=True`, that dimension remains with length `1`.

## Einsum

`np.einsum` describes tensor operations by naming axes. In an expression such as

```text
"str1,str2->str3"
```

the output axes are exactly those on the right-hand side. An axis that appears on the left but not the right is summed over. An empty right-hand side produces a scalar.

```python
# Batched matrix multiplication
np.einsum("bmk,bkn->bmn", A, B)

# A @ B.T
np.einsum("mn,pn->mp", A, B)

# trace(A)
np.einsum("ii->", A)

# x.T @ P @ y
np.einsum("i,ij,j->", x, P, y)

# Pairwise query-key scores for self-attention
np.einsum("bid,bjd->bij", Q, K)
```

For an interview, I find it useful to write down each operand's shape, label every axis, and then identify which labels survive in the output.

## Performance intuition

Vectorization becomes problematic when it creates large temporary arrays. Pairwise operations are a common example: broadcasting may avoid Python loops while still requiring (O(BCD)) memory for an intermediate result.

`np.where(cond, a, b)` can also be wasteful when computing `a` and `b` is expensive. Both branches are generally evaluated before `where` selects between them, so masked assignment or indexing may be preferable when only a small subset is needed.

## Useful operations

```python
# Preserve reduced dimensions for later broadcasting
total = x.sum(axis=-1, keepdims=True)

# Accumulate weights into integer-indexed bins
totals = np.bincount(bin_indices, weights=weights)

# Elementwise conditional selection
result = np.where(condition, value_if_true, value_if_false)
```

The recurring theme is simple: track shapes explicitly, know when an operation creates a view or a copy, and estimate the size of broadcasted intermediates before relying on vectorization.
