import * as React from "react";
import styles from './ModernAudio.module.scss';
import * as strings from 'ControlStrings';
import { IModernAudioProps } from "./IModernAudioProps";
import { IconButton } from "@fluentui/react";
import { ModernAudioLabelPosition } from './ModernAudioLabelPosition';

export const ModernAudio: React.FC<IModernAudioProps> = (props: IModernAudioProps): JSX.Element => {
    const audioComp = React.useRef<HTMLAudioElement>(new Audio(props.audioUrl));
    const [muted, setMuted] = React.useState<boolean>(false);
    const [playing, setPlaying] = React.useState<boolean>(false);

    React.useEffect(() => {
        audioComp.current.onended = () => { setPlaying(false); };
    }, []);

    const playAudio = (): void => {
        setPlaying(true);
        audioComp.current.play().then(() => { /* no-op */ }).catch(() => { /* no-op */ });
    };
    const pauseAudio = (): void => {
        setPlaying(false);
        audioComp.current.pause();
    };
    const incVolume = (): void => {
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
    const decVolume = (): void => {
        audioComp.current.volume -= 0.1;
        if (audioComp.current.volume < 0.1) {
            audioComp.current.volume = 0;
            audioComp.current.muted = true;
            setMuted(true);
        }
    };
    const muteAudio = (): void => {
        audioComp.current.muted = !muted;
        setMuted(!muted);
    };
    return (
        <div className={styles.modernAudio}>
            {props.labelPosition === ModernAudioLabelPosition.TopLeft &&
            props.label !== "" &&
            <div><label>{props.label}</label></div>}
            {props.labelPosition === ModernAudioLabelPosition.TopCenter &&
            props.label !== "" &&
            <div style={{textAlign: "center"}}><label>{props.label}</label></div>}
            <div className={styles.audioPanel}>
                {props.audioUrl !== "" && <audio ref={audioComp} src={props.audioUrl} />}
                <IconButton iconProps={{ iconName: 'Play' }} className={styles.audioIcon} title={strings.ModernAudioPlay} disabled={playing} onClick={playAudio} />
                <IconButton iconProps={{ iconName: 'Pause' }} className={styles.audioIcon} title={strings.ModernAudioPause} disabled={!playing} onClick={pauseAudio} />
                <IconButton iconProps={{ iconName: 'Volume2' }} className={styles.audioIcon} title={strings.ModernAudioIncVol} onClick={incVolume} />
                <IconButton iconProps={{ iconName: 'Volume0' }} className={styles.audioIcon} title={strings.ModernAudioDecVol} disabled={muted} onClick={decVolume} />
                <IconButton iconProps={{ iconName: 'VolumeDisabled' }} className={styles.audioIcon} title={strings.ModernAudioMute} disabled={muted} onClick={muteAudio} />
            </div>
            {props.labelPosition === ModernAudioLabelPosition.BottomLeft &&
            props.label !== "" &&
            <div><label>{props.label}</label></div>}
            {props.labelPosition === ModernAudioLabelPosition.BottomCenter &&
            props.label !== "" &&
            <div style={{textAlign: "center"}}><label>{props.label}</label></div>}
        </div>
    );
};

ModernAudio.defaultProps = {
    label: "",
    labelPosition: ModernAudioLabelPosition.TopLeft
};
