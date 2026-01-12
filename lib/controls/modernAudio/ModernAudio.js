import * as React from "react";
import styles from './ModernAudio.module.scss';
import * as strings from 'ControlStrings';
import { IconButton } from "@fluentui/react";
import { ModernAudioLabelPosition } from './ModernAudioLabelPosition';
export var ModernAudio = function (props) {
    var audioComp = React.useRef(new Audio(props.audioUrl));
    var _a = React.useState(false), muted = _a[0], setMuted = _a[1];
    var _b = React.useState(false), playing = _b[0], setPlaying = _b[1];
    React.useEffect(function () {
        audioComp.current.onended = function () { setPlaying(false); };
    }, []);
    var playAudio = function () {
        setPlaying(true);
        audioComp.current.play().then(function () { }).catch(function () { });
    };
    var pauseAudio = function () {
        setPlaying(false);
        audioComp.current.pause();
    };
    var incVolume = function () {
        if (audioComp.current.volume <= 0.9) {
            audioComp.current.volume += 0.1;
        }
        else {
            audioComp.current.volume = 1;
        }
        if (audioComp.current.muted) {
            audioComp.current.muted = false;
            setMuted(false);
        }
    };
    var decVolume = function () {
        audioComp.current.volume -= 0.1;
        if (audioComp.current.volume < 0.1) {
            audioComp.current.volume = 0;
            audioComp.current.muted = true;
            setMuted(true);
        }
    };
    var muteAudio = function () {
        audioComp.current.muted = !muted;
        setMuted(!muted);
    };
    return (React.createElement("div", { className: styles.modernAudio },
        props.labelPosition === ModernAudioLabelPosition.TopLeft &&
            props.label !== "" &&
            React.createElement("div", null,
                React.createElement("label", null, props.label)),
        props.labelPosition === ModernAudioLabelPosition.TopCenter &&
            props.label !== "" &&
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("label", null, props.label)),
        React.createElement("div", { className: styles.audioPanel },
            props.audioUrl !== "" && React.createElement("audio", { ref: audioComp, src: props.audioUrl }),
            React.createElement(IconButton, { iconProps: { iconName: 'Play' }, className: styles.audioIcon, title: strings.ModernAudioPlay, disabled: playing, onClick: playAudio }),
            React.createElement(IconButton, { iconProps: { iconName: 'Pause' }, className: styles.audioIcon, title: strings.ModernAudioPause, disabled: !playing, onClick: pauseAudio }),
            React.createElement(IconButton, { iconProps: { iconName: 'Volume2' }, className: styles.audioIcon, title: strings.ModernAudioIncVol, onClick: incVolume }),
            React.createElement(IconButton, { iconProps: { iconName: 'Volume0' }, className: styles.audioIcon, title: strings.ModernAudioDecVol, disabled: muted, onClick: decVolume }),
            React.createElement(IconButton, { iconProps: { iconName: 'VolumeDisabled' }, className: styles.audioIcon, title: strings.ModernAudioMute, disabled: muted, onClick: muteAudio })),
        props.labelPosition === ModernAudioLabelPosition.BottomLeft &&
            props.label !== "" &&
            React.createElement("div", null,
                React.createElement("label", null, props.label)),
        props.labelPosition === ModernAudioLabelPosition.BottomCenter &&
            props.label !== "" &&
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("label", null, props.label))));
};
ModernAudio.defaultProps = {
    label: "",
    labelPosition: ModernAudioLabelPosition.TopLeft
};
//# sourceMappingURL=ModernAudio.js.map