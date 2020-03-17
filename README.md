## a mini-react 

### 放弃使用parcel的原因 
它对ts支持有问题，打包出来的东西不对头:https://github.com/parcel-bundler/parcel/issues/1095

### tsconfig
```
  "compilerOptions": {
    "jsx": "preserve"
  }
```
保留jsx交给babel操作

