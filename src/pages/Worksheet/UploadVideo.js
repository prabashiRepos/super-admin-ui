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

import { uploadToVimeo } from "helpers/vimeo"

import {
  addNewItem as onCreateVideo,
  verifyVideo as onVerifyVideo
} from "store/video/actions"

import {
  getList as onGetLessons,
  getAccessToken as onGetAccessToken,
  // createVideo as onCreateVideo,
  // VerifyVideo as onVerifyVideo
} from "store/subject-management/lessons/actions"
import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"
import { useSelector, useDispatch } from "react-redux"

function UploadVideo({ visible, onClose, worksheetData, editData = null, onVideoUpload}) {
    const dispatch = useDispatch()
    
    const [selectedFiles, setselectedFiles] = useState(null)
    const [percentage, setPercentage] = useState(0)
    const [uploadingFailed, setUploadingFailed] = useState(false)
    
    const [isEdit, setIsEdit] = useState(false)
    const [editVideoInfo, setEditVideoInfo] = useState({})
  
    const {
        // access_token,
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
        // access_token: state.lessons.access_token,
        video_info: state.video.createdVideo,
        form_errors: state.video.form_errors,
        loading: pending(state, "GET_ACCESS_TOKEN"),
        failed: rejected(state, "GET_ACCESS_TOKEN"),
        success: fulfilled(state, "GET_ACCESS_TOKEN"),
        create_loading: pending(state, "ADD_VIDEOS"),
        create_failed: rejected(state, "ADD_VIDEOS"),
        create_success: fulfilled(state, "ADD_VIDEOS"),
        verify_loading: pending(state, "VERIFY_NEW_VIDEOS"),
        verify_failed: rejected(state, "VERIFY_NEW_VIDEOS"),
        verify_success: fulfilled(state, "VERIFY_NEW_VIDEOS"),
    }))
  
   useEffect(() => {
      if (visible) {
        dispatch(clean("ADD_VIDEOS"))
        dispatch(clean("VERIFY_NEW_VIDEOS"))
        setselectedFiles(null)
        setPercentage(0)
        setUploadingFailed(false)
      }
  }, [visible])
   
  useEffect(() => {
    if (editData?.uri) {
      setIsEdit(true)
      setEditVideoInfo(editData)
      onVideoUpload({isEdit:false,data:editData})
    }
  }, [])
  
    useEffect(() => {
      if (verify_success) {
        onVideoUpload({isEdit:true,data:video_info})
      }
    }, [verify_success])

    const handleAcceptedFiles = files => {
      setselectedFiles(files[0])
    }
    
  const onCancelVideo = () => {
    setselectedFiles(null)
    setIsEdit(false)
    setEditVideoInfo({})
  }
  const onUploadVideo = () => {
        // dispatch(onGetAccessToken())
      const data = {
        name: worksheetData.name,
        description: worksheetData.name,
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
        <div className="mb-3">
          {(!selectedFiles && !isEdit) && (
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
      {isEdit && (
        <>
          <div dangerouslySetInnerHTML={{ __html: editData?.embed?.html }} />
          <Button className="btn-danger" onClick={onCancelVideo}>Remove Video</Button>
        </>
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
              {/* <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: video_info.embed.html
              }}/> */}
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
            <>
                <Button className="mt-3 me-1 btn-info" onClick={onUploadVideo}>Upload</Button>
                <Button className="mt-3" onClick={onCancelVideo}>Cancel</Button>
            </>
              }
            </div>
          )}
          
        </div>
  )
}

UploadVideo.propTypes = {}

export default UploadVideo
