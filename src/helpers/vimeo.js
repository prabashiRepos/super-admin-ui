import * as tus from 'tus-js-client'

var VIMEO_CREATE_VIDEO="https://api.vimeo.com/me/videos"
var VIMEO_TOKEN="330834f344ed047c502f88184083b59b"
// var VIMEO_TOKEN="507759c3424c23ba325d8f44a29e99f5"

const vimeoHeaders = () => {
    return {
      // "Authorization": `Bearer ${VIMEO_ACCESS_TOKEN}`,
      // "Accept": 'application/vnd.vimeo.*+json;version=3.4',
      "Tus-Resumable": "1.0.0",
      "Upload-Offset": 0,
      "Content-Type": "application/offset+octet-stream",
      "Accept":"application/vnd.vimeo.*+json;version=3.4"
    }
}

// const createVimeoVideo = async (file, url, token) => {
//   const body = {
//     name: file.name,
//     upload: {
//       approach: 'tus',
//       size: file.size
//     }
//   }

//   const response = await fetch(url, {
//     method: 'POST',
//     mode: 'cors',
//     cache: 'no-cache',
//     credentials: 'same-origin',
//     headers: {
//       Authorization: `bearer ${token}`,
//       'Content-Type': 'application/json',
//       Accept: 'application/vnd.vimeo.*+json;version=3.4'
//     },
//     redirect: 'follow',
//     referrerPolicy: 'no-referrer',
//     body: JSON.stringify(body)
//   })

//   return response.json()
// }

export async function uploadToVimeo(file, onProgress,onCompleteCallback, onFailedCallback,video_info) {
  // const video = await createVimeoVideo(file, VIMEO_CREATE_VIDEO, VIMEO_TOKEN)
  
  
  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      uploadUrl: video_info?.upload?.upload_link || "",
      headers: vimeoHeaders,
      retryDelays: [0, 1000, 3000, 5000, 10000, 20000],
      metadata: {
        filename: file?.name,
        filetype: file?.type
      },
      uploadSize: file?.size,
      chunkSize: 5000000,
      onProgress: (loaded, total) => {
        onProgress(Math.round((loaded / total) * 100))
      },
      onError: err => {
        onFailedCallback(err)
        reject(err)
      },
      onSuccess: () => {
        onCompleteCallback()
        resolve()
      }
    })
    upload.start()
  })
}

export async function GetASpecificVideo(video_uri,successCallBack) {
    const response = await fetch(`https://api.vimeo.com${video_uri}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        // Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/vnd.vimeo.*+json;version=3.4'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    successCallBack(response.json())
    return 
}