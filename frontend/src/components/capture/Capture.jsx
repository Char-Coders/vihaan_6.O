import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./capture.css"


export default function Capture() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);

        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = useCallback(() => {
        if (recordedChunks.length) {
            console.log("downloading");
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            let formData = new FormData();
            formData.append("file", blob);
            formData.append("name", location.state.name);
            axios.post('/api/video/capture', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    return (
        <div className="container">
            <div className="form-box">

                <div className="Container">
                    <Webcam
                        height={400}
                        width={400}
                        audio={false}
                        mirrored={true}
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                    />



                    {capturing ? (
                        <div className="btn-field">
                            <button onClick={handleStopCaptureClick}>Stop Capture</button>
                        </div>
                    ) : (
                        <div className="btn-field">
                            <button onClick={handleStartCaptureClick}>Start Capture</button>
                        </div>
                    )}
                    {recordedChunks.length > 0 && (
                        <div className="btn-field">
                            <button onClick={handleDownload}>Download</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}