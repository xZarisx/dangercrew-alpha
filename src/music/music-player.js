import {Howl} from 'howler'



var MusicPlayer = {

    currentTrack: null,

    tracks: {
        "battle": {
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/player-vs-computer.mp3",
            volume: 0.25
        },
        "battle-intro": {
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/player-vs-computer-intro.mp3",
            volume: 0.25,
            callback: function() {
                MusicPlayer.playTrack("battle");
            }
        },
        "coffeeShop": {
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/fibonacci5.ogg",
            volume: 0.3
        },
        "walkingOutside": {
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/walking-outside2.ogg",
            volume: 0.2
        },
        "dangerWaltz" : {
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/163669/DangerWaltz8.ogg",
            volume: 0.3
        }
    },

    stopTrack: function() {
        if (this.currentTrack) {
            this.currentTrack.stop();
        }
    },

    playTrack: function(key="") {

        /* Stop current track */
        this.stopTrack();

        /* Set new track. Bail if the track is not listed in this.tracks */
        const track = this.tracks[key];
        if (!track) {
            console.warn('Track key not found in music player', key);
            return false;
        }

        /* Play the new track */
        this.currentTrack = new Howl({
            urls: [track.url],
            volume: track.volume || 1,
            loop: track.callback ? false : true,
            onend: function() {
                if (track.callback) {
                    track.callback();
                }
            }
        });
        this.currentTrack.play();
    }
};

export default MusicPlayer;