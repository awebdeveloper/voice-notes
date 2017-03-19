(function () {

    let is_listening = false;
    let final_transcript= '';
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = onVoice;

    function onVoice(event) {
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += convertPuntuations(event.results[i][0].transcript);
                console.log(final_transcript);
            }
        }
    };

    function convertPuntuations(str) {
        var punc = {
            "comma" : ',',
            "full stop": ".",
            "fulls stop": ".",
            "exclamation mark": "!",
            "exclamation": "!",
            "question mark": "?",
        }
        for (x in punc) {
            str = str.replace(x, punc[x]);
        }
        return str;

    }

    window.toggleVoiceRec = function () {
        if (is_listening == false) {
            recognition.start();
            is_listening = true;
        } else {
            recognition.stop();
            is_listening = false;
        }
    }

})();
