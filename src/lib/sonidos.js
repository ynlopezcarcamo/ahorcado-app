import { createAudioPlayer } from 'expo-audio';

const acierto = createAudioPlayer(require('../../assets/sonidos/acierto.mp3'));
const error = createAudioPlayer(require('../../assets/sonidos/error.mp3'));
const victoria = createAudioPlayer(require('../../assets/sonidos/victoria.mp3'));
const derrota = createAudioPlayer(require('../../assets/sonidos/derrota.mp3'));

const PLAYERS = { acierto, error, victoria, derrota };

export function reproducir(tipo) {
  const player = PLAYERS[tipo];
  if (!player) return;
  player.pause();
  player.seekTo(0);
  player.play();
}
