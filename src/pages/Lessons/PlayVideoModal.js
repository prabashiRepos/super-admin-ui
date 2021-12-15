import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Modal, ModalHeader, ModalBody } from "reactstrap"
import { GetASpecificVideo } from "helpers/vimeo"
// function getVimeoId(url) {
//   // Look for a string with 'vimeo', then whatever, then a
//   // forward slash and a group of digits.
//   var match = /videos.*\/(\d+)/i.exec(url)

//   // If the match isn't null (i.e. it matched)
//   if (match) {
//     // The grouped/matched digits from the regex
//     return match[1]
//   }
// }

function PlayVideoModal({ visible, onClose, videoData }) {
  
  

  const [progress, setProgress] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [video, setVideo] = useState({});

  const successCallBack = (data) => {
    setVideo(data)
    setProgress(false)
    setCompleted(true)
  }
  
  function createMarkup() {
    return {__html: videoData?.embed?.html || ""};
  }

  useEffect(() => {
    setProgress(true)
    GetASpecificVideo(videoData.uri,successCallBack)
  },[])

  return (
    <Modal isOpen={visible} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose} tag="h4">
        {videoData.name || "Video"}
      </ModalHeader>
      <ModalBody>
        {/* {progress && (
          <div>Progress</div>
        )} */}
        {/* {completed && ( */}
          <div className="text-center" dangerouslySetInnerHTML={createMarkup()} />
        {/* )} */}
      </ModalBody>
    </Modal>
  )
}

// const videos = [
//   { id: 589901968, name: "Jambinai - Connection" },
//   { id: 162959050, name: "Jambinai - They Keep Silence" },
//   { id: 169408731, name: "Hoody - Like You" },
// ]

// class PlayVideoModal extends React.Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       videoIndex: 0,
//       volume: 1,
//       paused: false,
//     }

//     this.handlePause = this.handlePause.bind(this)
//     this.handlePlayerPause = this.handlePlayerPause.bind(this)
//     this.handlePlayerPlay = this.handlePlayerPlay.bind(this)
//     this.handleVolume = this.handleVolume.bind(this)
//   }

//   handlePause(event) {
//     this.setState({
//       paused: event.target.checked,
//     })
//   }

//   handlePlayerPause() {
//     this.setState({ paused: true })
//   }

//   handlePlayerPlay() {
//     this.setState({ paused: false })
//   }

//   handleVolume(event) {
//     this.setState({
//       volume: parseFloat(event.target.value),
//     })
//   }

//   selectVideo(index) {
//     this.setState({ videoIndex: index })
//   }

//   render() {
//     const { videoIndex, paused, volume } = this.state
//     const { visible, onClose, videoData} = this.props

//     const video = videos[videoIndex]

//     return (
//       <Modal isOpen={visible} toggle={onClose} size="lg">
//         <ModalHeader toggle={onClose} tag="h4">
//           {videoData.name || "Video"}
//         </ModalHeader>
//         <ModalBody>
//           <div className="row">
//             <div className="col s4">
//               <h5>Video</h5>
//               <div className="collection">
//                 {videos.map((choice, index) => (
//                   <a
//                     href={`#!/video/${index}`}
//                     className={`collection-item ${
//                       video === choice ? "active" : ""
//                     }`}
//                     onClick={() => this.selectVideo(index)}
//                   >
//                     {choice.name}
//                   </a>
//                 ))}
//               </div>
//               <h5>Paused</h5>
//               <p>
//                 <label htmlFor="paused">
//                   <input
//                     type="checkbox"
//                     id="paused"
//                     checked={paused}
//                     onChange={this.handlePause}
//                   />
//                   <span>Paused</span>
//                 </label>
//               </p>
//               <h5>Volume</h5>
//               <input
//                 type="range"
//                 value={volume}
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 onChange={this.handleVolume}
//               />
//             </div>
//             <div className="col s8 center-align">
//               <Vimeo
//                 video={video.id}
//                 width={640}
//                 height={480}
//                 // autoplay
//                 volume={volume}
//                 paused={paused}
//                 onPause={this.handlePlayerPause}
//                 onPlay={this.handlePlayerPlay}
//               />
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>
//     )
//   }
// }

PlayVideoModal.propTypes = {}

export default PlayVideoModal
