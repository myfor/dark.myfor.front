# preview-image 简单图片预览组件
现只支持单图片上传

## 使用
```html
<preview-image></preview-image>
```

## 可选指令
initPath: 初始化图片
maxWidth: 设置预览图片最大宽度, 默认 25rem
maxHeight: 设置预览图片最大高度, 默认 15rem
accept: 设置允许的图片格式, 默认 .png,.jpg,.jpeg,.gif,.bmp
```html
<preview-image maxWidth="300px" maxHeight="400px" accept=".png"></preview-image>
```

multiple: 可预览多个图片, 默认 false
```html
<preview-image multiple="true"></preview-image>
```

## 事件
fileChangeEvent: 当预览图改变时发射触发, 发射改变后的图片, 格式为 any, 只使用单张图片
any 为图片本身, 可以直接在 form 表单中提交. 
multipleFilesChangeEvent: 若 multiple="true" 返回的图片格式为 any[], 为多张图片

单张图片
```html
<preview-image (fileChangeEvent)="fileChange($event)"></preview-image>
```
多张图片
```html
<preview-image (fileChangeEvent)="multipleFilesChangeEvent($event)"></preview-image>
```
