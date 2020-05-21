# a mini-react

## Todo

[X] 函数渲染
[] 调度器和 fiber
[] class 渲染

## 放弃使用 parcel 的原因

它对 ts 支持有问题，打包出来的东西不对头:https://github.com/parcel-bundler/parcel/issues/1095

## tsconfig

```
  "compilerOptions": {
    "jsx": "preserve"
  }
```

保留 jsx 交给 babel 操作
