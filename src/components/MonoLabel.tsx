import { Txt, type TxtProps } from "@motion-canvas/2d";

export interface MonoLabelProps extends TxtProps {}

export class MonoLabel extends Txt {
    public constructor(props?: MonoLabelProps) {
        super({
            fontFamily: "monospace",
            fill: "#ffffff",
            ...props,
        });
    }
}
