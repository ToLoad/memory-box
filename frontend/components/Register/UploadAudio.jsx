import React, { useCallback, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  HiOutlineMinusCircle,
  HiOutlinePlay,
  HiOutlineStop,
} from 'react-icons/hi';
import { Button } from '../../styles/variables';
import { AudioButton, RecordWrapper } from './Register.style';
import AWSs3Upload from './AWSs3Upload';
import { BASE_URL } from '../../utils/contants';
import { ButtonWrapper } from '../Main/Main.style';
import { v4 as uuidv4 } from 'uuid';
// import ffmpeg from 'ffmpeg';

export default function UploadAudio(props) {
  // const blobToMp3 = files => {
  //   try {
  //     let process = new ffmpeg(files);
  //     process.then(
  //       function (audio) {
  //         audio.fnExtractSoundToMP3('newfile/file.mp3', function (error, file) {
  //           if (!error) {
  //             console.log('Audio file: ' + file);
  //           }
  //         });
  //       },
  //       function (err) {
  //         console.log('Error: ' + err);
  //       },
  //     );
  //   } catch (e) {
  //     console.log(e.code);
  //     console.log(e.msg);
  //   }
  // };
  const [streams, setStreams] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [endRec, setEndRec] = useState(false);
  const [checkRec, setCheckRec] = useState(false);
  const [sources, setSources] = useState();
  const [analysers, setAnalysers] = useState();
  const [audioUrl, setAudioUrl] = useState('');
  const [audioFile, setAudioFile] = useState();
  const [uuid, setUuid] = useState();

  const [audioProgress, setAudioProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const resetAudio = () => {
    // 녹음 초기화
    setAudioFile();
    setAudioUrl();
    setEndRec(false);
    setCheckRec(false);
    setUuid();
    props.setCheckedAudio(false);
    props.setStopAudio(false);
  };

  const onRecAudio = () => {
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalysers(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSources(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStreams(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = e => {
        // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
        if (e.playbackTime > 180) {
          stream.getAudioTracks().forEach(track => {
            track.stop();
          });
          mediaRecorder.stop();
          // 메서드가 호출 된 노드 연결 해제
          analyser.disconnect();
          audioCtx.createMediaStreamSource(stream).disconnect();

          mediaRecorder.ondataavailable = event => {
            setAudioUrl(event.data);
            setOnRec(true);
          };
        } else {
          setOnRec(false);
        }
      };
    });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = e => {
      setAudioUrl(e.data);
      setOnRec(true);
      setEndRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    streams.getAudioTracks().forEach(track => {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analysers.disconnect();
    sources.disconnect();
    props.setStopAudio(true);
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      const url = URL.createObjectURL(audioUrl); // 출력된 링크에서 녹음된 오디오 확인 가능
      setAudioUrl(`${url}`);
      setCheckRec(true);
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], 'soundBlob', {
      lastModified: new Date().getTime(),
      type: 'audio/mp3',
    });
    console.log(sound, 'blob?');
    setAudioFile(sound);
    setSelectedFile(sound);
    const audioUUID = uuidv4();
    setUuid(`${audioUUID}`);
    props.setParentsRecord(`${BASE_URL}${props.id}/audio/${audioUUID}`);
    props.setCheckedAudio(true);
  }, [audioUrl]);

  return (
    <>
      <div className="voice">
        <div>
          <HiOutlinePlay />
          음성으로 된 기억 추가하기
        </div>

        <div className="subIcons">
          {endRec ? (
            checkRec ? (
              <>
                <div className="resetAudio">
                  <HiOutlineMinusCircle
                    style={{ color: 'red' }}
                    onClick={resetAudio}
                  />
                </div>
              </>
            ) : (
              <AudioButton onClick={onSubmitAudioFile}>확인</AudioButton>
            )
          ) : onRec ? (
            <div className="icons">
              <AiOutlinePlusCircle
                onClick={onRecAudio}
                style={{ color: 'black' }}
              />
            </div>
          ) : (
            <div className="icons">
              <HiOutlineStop onClick={offRecAudio} />
            </div>
          )}
        </div>
      </div>
      <RecordWrapper>
        {checkRec && <audio src={audioUrl} controls />}
      </RecordWrapper>
      {selectedFile && (
        <AWSs3Upload
          type="audio"
          file={selectedFile}
          putButton={props.putButton}
          id={props.id}
          uuid={uuid}
        />
      )}
    </>
  );
}
