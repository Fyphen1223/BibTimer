const start = window.document.getElementById('start');
const stop = window.document.getElementById('stop');
const reset = window.document.getElementById('reset');
const record = window.document.getElementById('recordCheckbox');
const recordList = window.document.getElementById('recordList');
const transcribe = window.document.getElementById('transcribeCheckbox');
const transcribeList = window.document.getElementById('transcribeList');
const deleteRecord = window.document.getElementById('delete');
const warning = window.document.getElementById('warning');
const statusText = window.document.getElementById('statusText');
const discussion = window.document.getElementById('discussionBool');
const discussionTime = window.document.getElementById('discussionTime');

const timer = window.document.getElementById('timerText');

let time = 300;
let timerStatus = 'stopped';
let interval = null;
let mic = null;
let mediaRecorder;
let recordedChunks = [];
let inDiscussion = false;
// eslint-disable-next-line no-undef
const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let recognition = null;

record.addEventListener('click', async () => {
	if (timerStatus === 'started') {
		record.checked = false;
		warning.innerHTML = 'タイマーを止めてからレコーディングを開始してください。';
		setTimeout(() => {
			warning.innerHTML = '';
		}, 3000);
		return;
	}
	if (record.checked) {
		try {
			mic = await navigator.mediaDevices.getUserMedia({ audio: true });
		} catch (e) {
			warning.innerHTML = 'マイクへのアクセスを許可しないとレコーディングはできません。';
			record.checked = false;
			setTimeout(() => {
				warning.innerHTML = '';
			}, 3000);
			return;
		}
	}
});
start.addEventListener('click', () => {
	if (timerStatus === 'stopped') {
		timerStatus = 'started';
		if (inDiscussion) {
			statusText.innerHTML = 'ディスカッション中';
		} else {
			statusText.innerHTML = 'ビブリオ中';
		}
		interval = setInterval(() => {
			time--;
			timer.innerText = convertSecondsToMMSS(time);
			if (time <= 0) {
				clearInterval(interval);
				if (!discussion.checked) {
					statusText.innerHTML = 'ビブリオ終了';
					timerStatus = 'stopped';
					if (record.checked) {
						stopRecording();
					}
				} else {
					if (discussionTime.checked) {
						time = 120;
						timer.innerText = convertSecondsToMMSS(time);
						statusText.innerHTML = 'ディスカッション中';
						timerStatus = 'discussion';
						inDiscussion = true;
						interval = setInterval(() => {
							time--;
							timer.innerText = convertSecondsToMMSS(time);
							if (time <= 0) {
								clearInterval(interval);
								inDiscussion = false;
								timerStatus = 'stopped';
								statusText.innerHTML = 'ディスカッション終了';
								if (record.checked) {
									stopRecording();
								}
							}
						}, 1000);
					} else {
						time = 180;
						timerStatus = 'discussion';
						inDiscussion = true;
						timer.innerText = convertSecondsToMMSS(time);
						statusText.innerHTML = 'ディスカッション中';
						interval = setInterval(() => {
							time--;
							timer.innerText = convertSecondsToMMSS(time);
							if (time <= 0) {
								clearInterval(interval);
								inDiscussion = false;
								timerStatus = 'stopped';
								statusText.innerHTML = 'ディスカッション終了';
								if (record.checked) {
									stopRecording();
								}
							}
						}, 1000);
					}
				}
			}
		}, 1000);
		if (record.checked) {
			mediaRecorder = new MediaRecorder(mic);
			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					recordedChunks.push(event.data);
				}
			};
			startRecording();
		}
	}
	if (transcribe.checked) {
		recognition.start();
		recognition.continuous = true;
		recognition.interimResults = false;
		recognition.onresult = function (event) {
			let resultIndex = event.resultIndex;
			let transcript = event.results[resultIndex][0].transcript;
			console.log(transcript);
		};
		recognition.onstop = function () {
			recognition.start();
		};
	}
	return;
});
transcribe.addEventListener('click', () => {
	if (timerStatus === 'started' && transcribe.checked) {
		transcribe.checked = false;
		warning.innerHTML = 'タイマーを止めてから音声認識を開始してください。';
		setTimeout(() => {
			warning.innerHTML = '';
		}, 3000);
		return;
	} else if (transcribe.checked) {
		recognition = new SpeechRecognition();
	} else if (!transcribe.checked) {
		recognition.stop();
		recognition = null;
	}
	return;
});

stop.addEventListener('click', () => {
	if (timerStatus === 'started' || timerStatus === 'discussion') {
		timerStatus = 'stopped';
		statusText.innerHTML = '停止中';
		clearInterval(interval);
		if (record.checked) {
			stopRecording();
		}
	}
	return;
});
reset.addEventListener('click', () => {
	if (timerStatus === 'started') {
		clearInterval(interval);
	}
	inDiscussion = false;
	statusText.innerHTML = 'スタートを押して開始';
	time = 300;
	timerStatus = 'stopped';
	timer.innerText = convertSecondsToMMSS(time);
	return;
});
deleteRecord.addEventListener('click', () => {
	recordList.innerHTML = '';
	transcribeList.innerHTML = '';
});

function startRecording() {
	mediaRecorder = new MediaRecorder(mic);
	mediaRecorder.start();
	mediaRecorder.ondataavailable = (e) => {
		recordedChunks.push(e.data);
	};
}
function stopRecording() {
	mediaRecorder.stop();
	mediaRecorder.onstop = () => {
		const blob = new Blob(recordedChunks, { type: 'audio/webm' });
		const audioURL = URL.createObjectURL(blob);
		const audioElement = document.createElement('audio');
		audioElement.src = audioURL;
		audioElement.controls = true;
		recordList.appendChild(audioElement);
	};
}

function convertSecondsToMMSS(seconds) {
	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = seconds % 60;
	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(remainingSeconds).padStart(2, '0');
	return `${formattedMinutes}:${formattedSeconds}`;
}
