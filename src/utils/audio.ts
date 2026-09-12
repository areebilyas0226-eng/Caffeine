// Web Audio API ambient café hum generator
class AmbientAudioController {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getState(): boolean {
    return this.isPlaying;
  }

  public start() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(420, this.ctx.currentTime);

      // Low harmonic warm drone (F and C chords)
      const freqs = [87.31, 130.81, 174.61, 261.63];
      freqs.forEach(freq => {
        if (!this.ctx || !this.gainNode) return;
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        const oscGain = this.ctx.createGain();
        oscGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        this.oscillators.push(osc);
      });

      // Warm vinyl/cafe air noise
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 1.8;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(320, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(filter);
      this.noiseNode.start();

      filter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);

      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop() {
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
        setTimeout(() => {
          this.oscillators.forEach(osc => {
            try { osc.stop(); } catch { /* ignore */ }
          });
          this.oscillators = [];
          if (this.noiseNode) {
            try { this.noiseNode.stop(); } catch { /* ignore */ }
            this.noiseNode = null;
          }
          if (this.ctx && this.ctx.state !== 'closed') {
            this.ctx.close();
          }
          this.ctx = null;
        }, 1300);
      } catch {
        this.ctx = null;
      }
    }
    this.isPlaying = false;
  }
}

export const ambientAudio = new AmbientAudioController();
