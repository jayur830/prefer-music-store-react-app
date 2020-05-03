import $ from "jquery";

class AudioSetup {
    private audio: HTMLAudioElement | null = null;
    private isPlaying: boolean = false;

    public play(id: string): void {
        if (this.audio === null) {
            this.audio = ($("#m" + id)[0] as HTMLAudioElement);
            this.audio.play();
            this.isPlaying = true;
        } else if (this.isPlaying) {
            this.audio.pause();
            if (this.audio.id !== "m" + id) {
                this.audio = ($("#m" + id)[0] as HTMLAudioElement);
                this.audio.play();
            } else this.isPlaying = false;
        } else if (!this.isPlaying) {
            if (this.audio.id !== "m" + id)
                this.audio = ($("#m" + id)[0] as HTMLAudioElement);
            this.audio.play();
            this.isPlaying = true;
        }
    }
}

export default new AudioSetup();