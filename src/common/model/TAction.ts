export type TAction = {
    title: string;
    iconName?: string;
    multi?: boolean;
    __internal_callback__?: string;
};

export type TActions = {
    [actionKey: string]: TAction;
};