import { getContext, connect } from 'tone';

// "inspired by" (read: ripped off) https://github.com/tambien/StartAudioContext/blob/master/StartAudioContext.js
const startAudioContext = () => {
  const context = getContext();
  if (context.state && context.state !== 'running') {
    // this accomplishes the iOS specific requirement
    const buffer = context.createBuffer(1, 1, context.sampleRate);
    const source = context.createBufferSource();
    source.buffer = buffer;
    connect(source, context.destination);
    source.start(0);

    // resume the audio context
    if (context.resume) {
      context.resume();
    }
  }
};

export default startAudioContext;
