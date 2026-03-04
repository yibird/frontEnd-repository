## 截取视频帧为 image

在各大视频应用中大部分支持上传视频根据帧自定义封面,视频截取帧通常分为客户端和服务端两种实现方式,服务端可以借助 ffmpeg 等工具实现视频帧的截取,这种方式会消耗大量服务器资源,在并发场景下会严重影响吞吐量,通常适用于对安全性较高等场景。为了降低服务器压力,客户端可以通过 canvas 对上传视频根据指定帧截取并转为图片,大致原理如下:

- 创建一个 video 元素,根据帧时间设置 video currentTime 属性表示当前播放视频时间,并设置 autoplay 开启自动播放,最后通过 URL.createObjectURL()将上传视频转换为一个临时的 URL 并显示。
- 监听 video 播放事件,根据 video 通过 canvas drawImage()绘制为 image,最后使用 canvas toBlob()获取帧文件及帧图片 URL。

```ts
/**
 * 绘制video
 * @param video video元素
 * @returns 返回一个Promise,Promise的值为一个对象,对象包含blob(帧文件)、url(帧图片)
 */
function drawVideo(video: HTMLVideoElement) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 设置canvas的宽高为video元素的宽高
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    // 绘制内容
    ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((blob) => {
      resolve({
        blob,
        url: URL.createObjectURL(blob!),
      })
    })
  })
}

/**
 *
 * @param videoFile 视频文件对象
 * @param time 截取帧时间
 * @returns 返回一个Promise,Promise的值为一个对象,对象包含blob(帧文件)、url(帧图片)
 */
function captureFrame(videoFile: File, time: number = 0) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    // 定格时间
    video.currentTime = time
    // 开启自动播放
    video.autoplay = true
    // 监听video播放事件,根据video通过canvas绘制为image
    video.oncanplay = async () => {
      const frame = await drawVideo(video)
      resolve(frame)
    }
    // URL.createObjectURL()可以将文件或媒体数据(如图片、视频等)转换为一个临时的 URL,通常用于实时预览上传的图片或视频
    video.src = URL.createObjectURL(videoFile)
  })
}
```
