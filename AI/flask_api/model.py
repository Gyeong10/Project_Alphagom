import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import numpy as np
import librosa
import tensorflow as tf
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
import ffmpeg
import warnings
import speech_recognition as sr
warnings.filterwarnings('ignore')
r=sr.Recognizer()

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

# 리턴값 딕셔너리
checkDict = { 0 : "응",
            1 : "아니",
            }

wordDict = { 0 : "냠냠",
            1 : "드르륵",
            2 : "보글보글",
            3 : "사각사각",
            4 : "송송",
            5 : "탁탁",
            6 : "툭툭",
            7 : "탁탁",
            8 : "팔팔",
            9 : "풀풀",
            10 : "휘휘" }

birdDict = { 0 : "까마귀", 
            1 : "꿩", 
            2 : "뱁새", 
            3 : "오리", 
            4 : "참새", 
            5 : "황새" }

@app.route('/api/ai/check', methods=["POST"])
@cross_origin()
def check():
    # 저장된(학습된) 모델 가져오기
    model = tf.keras.models.load_model('../check_determine_model220927.h5')

    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'

    wav, sr= librosa.load(path, sr=16000)

    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(응 : 0, 아니 : 1)
    for key, val in checkDict.items():
        if key == np.argmax(result) :
            return jsonify(answer = val)


@app.route('/api/ai/swamp/word', methods=["POST"])
@cross_origin()
def swamp_word():
    
    model = tf.keras.models.load_model('../word_determine_model221001.h5')
     # 받아온 오디오 데이터

    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'

    wav, sr= librosa.load(path, sr=16000)

    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(냠냠 : 0, 드르륵 : 1, 보글보글 : 2, 사각사각 : 3, 송송 : 4, 주르륵 : 5, 탁탁 : 6, 툭툭 : 7, 팔팔 : 8, 풀풀 : 9, 휘휘 : 10)
    for key, val in wordDict.items():
        if key == np.argmax(result) :
            return jsonify(answer = val)

@app.route('/api/ai/sky/bird', methods=["POST"])
@cross_origin()
def sky_bird():
    model = tf.keras.models.load_model('../bird_determine_model220928.h5')
    # 받아온 오디오 데이터
    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=1)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'
    
    wav, sr = librosa.load(path, sr=16000)
    
    mfcc = librosa.feature.mfcc(wav, sr=16000, n_mfcc=100, n_fft=400, hop_length=160)
    # mfcc = sklearn.preprocessing.scale(mfcc, axis=1)
    pad2d = lambda a, i: a[:, 0:i] if a.shape[1] > i else np.hstack((a, np.zeros((a.shape[0], i-a.shape[1]))))
    padded_mfcc = pad2d(mfcc, 110)
    padded_mfcc = np.expand_dims(padded_mfcc, 0)

    result = model.predict(padded_mfcc)

    # 판별 완료된 음성 파일 삭제
    os.remove('./audio.wav')
    os.remove('./audio_output.wav')

    # 어떤 결과를 리턴시켜야 하나(까마귀 : 0, 꿩 : 1, 뱁새 : 2, 오리 : 3, 참새 : 4, 황새 : 5)
    for key, val in birdDict.items():
        if key == np.argmax(result) :
            return jsonify(answer = val)

@app.route("/api/ai/stt", methods=["POST"])
def sttcheck():
    r = sr.Recognizer()
    file = request.files['audio_data']
    path='./audio.wav'
    file.save(path)

    audio_input = ffmpeg.input('./audio.wav')
    audio_cut = audio_input.audio.filter('atrim', duration=5)
    audio_output = ffmpeg.output(audio_cut, './audio_output.wav')
    ffmpeg.run(audio_output)

    path='./audio_output.wav'
    
    try:
        transcript = ''
        while not transcript:
            with sr.AudioFile(path) as source:
                audio = r.record(source)
                transcript=r.recognize_google(audio, language="ko-KR")
    
        os.remove('./audio.wav')
        os.remove('./audio_output.wav')

        return jsonify(answer=transcript)

    except:
        os.remove('./audio.wav')
        os.remove('./audio_output.wav')

        return jsonify(answer='failed')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5678",  debug=True)
