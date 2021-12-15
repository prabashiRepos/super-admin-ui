import React, { useState, useEffect  } from "react"
import PropTypes from "prop-types"
import {
  Modal,
  Alert,
  Button,
  ModalHeader,
    ModalBody,
  Progress
} from "reactstrap"
import Dropzone from "react-dropzone"
import * as tus from "tus-js-client";

import {uploadToVimeo} from "helpers/vimeo"

import {
  getList as onGetLessons,
  getAccessToken as onGetAccessToken,
  createVideo as onCreateVideo,
  VerifyVideo as onVerifyVideo
} from "store/subject-management/lessons/actions"
import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"
import { useSelector, useDispatch } from "react-redux"

function UploadVideo({ visible, onClose, lessonData }) {
    const dispatch = useDispatch()
    
    const [selectedFiles, setselectedFiles] = useState(null)
    const [percentage, setPercentage] = useState(0)
    const [uploadingFailed, setUploadingFailed] = useState(false)
    
    const {
        access_token,
        video_info,
        form_errors,
        loading,
        failed,
        success,
        create_loading,
        create_success,
        create_failed,
        verify_failed ,
        verify_success
    } = useSelector(state => ({
        access_token: state.lessons.access_token,
        video_info: state.lessons.video_info,
        form_errors: state.lessons.form_errors,
        loading: pending(state, "GET_ACCESS_TOKEN"),
        failed: rejected(state, "GET_ACCESS_TOKEN"),
        success: fulfilled(state, "GET_ACCESS_TOKEN"),
        create_loading: pending(state, "CREATE_VIDEO"),
        create_failed: rejected(state, "CREATE_VIDEO"),
        create_success: fulfilled(state, "CREATE_VIDEO"),
        verify_loading: pending(state, "VERIFY_VIDEO"),
        verify_failed: rejected(state, "VERIFY_VIDEO"),
        verify_success: fulfilled(state, "VERIFY_VIDEO"),
    }))
  
   useEffect(() => {
      if (visible) {
        dispatch(clean("CREATE_VIDEO"))
        dispatch(clean("VERIFY_VIDEO"))
        setselectedFiles(null)
        setPercentage(0)
        setUploadingFailed(false)
      }
    }, [visible])
   
    useEffect(() => {
      if (verify_success) {
        dispatch(onGetLessons())
      }
    }, [verify_success])

    const handleAcceptedFiles = files => {
      setselectedFiles(files[0])
    }
    
    const onUploadVideo = () => {
        // dispatch(onGetAccessToken())
      const data = {
        name: lessonData.name,
        description: lessonData.name,
        lesson_id: lessonData.id,
        size:selectedFiles.size
      }
      dispatch(onCreateVideo(data))
    }
    useEffect(() => {
      if (create_success) {
          uploadToVimeo(selectedFiles, onProgressCallback,onCompleteCallback,onFailedCallback, video_info)
      }
    }, [create_success, create_failed])
  
    const onProgressCallback = (percentage) => {
          setPercentage(percentage)
  }
  
  const onCompleteCallback = () => {
      const { upload: { upload_link } } = video_info
      const data = {
        upload_link,
        size:selectedFiles.size
      }
      console.log("size: ",selectedFiles.size)
      dispatch(onVerifyVideo(data))
    }
  const onFailedCallback = () => {
    setUploadingFailed(true)
  }
    
    
  return (
    <Modal isOpen={visible} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose} tag="h4">
        Upload Video
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          {!selectedFiles && (
            <Dropzone
              onDrop={acceptedFiles => {
                handleAcceptedFiles(acceptedFiles)
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div className="dropzone">
                  <div
                    className="dz-message needsclick mt-2"
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <div className="mb-3">
                      <i className="display-4 text-muted bx bxs-cloud-upload" />
                    </div>
                    <h4>Drop video here or click to upload.</h4>
                  </div>
                </div>
              )}
            </Dropzone>
          )}

          {(!verify_success && selectedFiles!==null) && (
              <>
                <div>File Selected</div>
                <Progress striped animated color="primary" value={percentage} />
              </>
          )}
          {verify_success && (
            <div>
              <Alert color="success" role="alert">
                Upload Success.
              </Alert>
              <Alert color="info" role="alert">
                Video Provider takes 1 - 3 Minutes to render the video. You can do your other activities.
              </Alert>
              {/* <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: video_info.embed.html
              }}/> 
              */}
            </div>  
              
          )}
          {verify_failed  && (
            <Alert color="danger" rolw="alert">
              Video Failed to upload
            </Alert>
          )}

          {uploadingFailed && (

            <div>
                <Alert color="danger" rolw="alert">
                  Video Failed to upload. Please try again
                </Alert>
            </div>
          )}
          {(!verify_success && !uploadingFailed) && (

            <div>
              {selectedFiles &&
                <Button className="mt-3" onClick={onUploadVideo}>Upload</Button>
              }
            </div>
          )}
          
        </div>
      </ModalBody>
    </Modal>
  )
}

UploadVideo.propTypes = {}

export default UploadVideo
